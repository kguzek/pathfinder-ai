class Population {
  dots = [];
  numIdleDots;
  numSuccessfulDots;
  generation;
  stepThreshold = Settings.BRAIN_STEPS_MAX;

  constructor(size) {
    this.dots = new Array(size).fill(null);
    this.numIdleDots = 0;
    this.numSuccessfulDots = 0;
    this.generation = 1;
    for (let i = 0; i < size; i++) {
      this.dots[i] = new Dot();
    }
  }

  draw() {
    for (const dot of this.dots) {
      let becameIdle = dot.move();
      dot.draw();
      if (dot.brain.step > this.stepThreshold) {
        dot.dead = true;
        dot.diedByObstacle = true;
        becameIdle = true;
      }
      if (becameIdle) {
        this.numIdleDots++;
        if (dot.reachedGoal) numSuccessfulDots++;
      }
    }
  }

  calculateFitness() {
    for (const dot of this.dots) {
      dot.calculateFitness();
    }
  }

  isIdle() {
    return this.numIdleDots == this.dots.length;
  }

  performNaturalSelection() {
    const newDots = new Array(this.dots.length).fill(null);
    newDots[this.dots.length - 1] = this.getBestDot();
    newDots[this.dots.length - 1].isBest = true;
    for (let i = 0; i < this.dots.length - 1; i++) {
      const parent = this.selectParent();
      newDots[i] = parent.clone();
    }
    this.dots = newDots;
    this.numIdleDots = 0;
    this.numSuccessfulDots = 0;
    this.generation++;
  }

  getBestDot() {
    let bestDot = this.dots[0];
    for (const dot of this.dots) {
      if (dot.fitness > bestDot.fitness) {
        bestDot = dot;
      }
    }
    if (bestDot.reachedGoal && bestDot.brain.step < this.stepThreshold) {
      this.stepThreshold = bestDot.brain.step;
    }
    return bestDot.clone();
  }

  selectParent() {
    let totalFitness = 0;
    for (const dot of this.dots) {
      totalFitness += dot.fitness;
    }
    const randomFitness = random(totalFitness);
    let currentFitness = 0;
    for (const dot of this.dots) {
      currentFitness += dot.fitness;
      if (currentFitness >= randomFitness) {
        return dot;
      }
    }
    return null;
  }

  mutate() {
    for (let i = 0; i < this.dots.length - 1; i++) {
      const dot = this.dots[i];
      dot.brain.mutate();
    }
  }
}

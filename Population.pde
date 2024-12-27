class Population {
  Dot[] dots;
  int numIdleDots;
  int numSuccessfulDots;
  int generation;
  int stepThreshold = Settings.BRAIN_STEPS_MAX;
  
  Population(int size) {
    dots = new Dot[size];
    numIdleDots = 0;
    numSuccessfulDots = 0;
    generation = 1;
    for (int i = 0; i < size; i++) {
      dots[i] = new Dot();
    }
  }
  
  void draw() {
    for (Dot dot : dots) {
      boolean becameIdle = dot.move();
      dot.draw();
      if (dot.brain.step > stepThreshold) {
        dot.dead = true;
        dot.diedByObstacle = true;
        becameIdle = true;
      }
      if (becameIdle) {
        numIdleDots++;
        if (dot.reachedGoal) numSuccessfulDots++;
      }
    }
  }
  
  void calculateFitness() {
    for (Dot dot : dots) {
      dot.calculateFitness();
    }
  }
  
  boolean isIdle() {
    return numIdleDots == dots.length;
  }
  
  void performNaturalSelection() {
    Dot[] newDots = new Dot[dots.length];
    newDots[dots.length - 1] = getBestDot();
    newDots[dots.length - 1].isBest = true;
    for (int i = 0; i < dots.length - 1; i++) {
      Dot parent = selectParent();
      newDots[i] = parent.clone();
    }
    dots = newDots;
    numIdleDots = 0;
    numSuccessfulDots = 0;
    generation++;
  }
  
  Dot getBestDot() {
    Dot bestDot = dots[0];
    for (Dot dot : dots) {
      if (dot.fitness > bestDot.fitness) {
        bestDot = dot;
      }
    }
    if (bestDot.reachedGoal && bestDot.brain.step < stepThreshold) {
      stepThreshold = bestDot.brain.step;
    }
    return bestDot.clone();
  }
  
  Dot selectParent() {
    float totalFitness = 0;
    for (Dot dot : dots) {
      totalFitness += dot.fitness;
    }
    float randomFitness = random(totalFitness);
    float currentFitness = 0;
    for (Dot dot : dots) {
      currentFitness += dot.fitness;
      if (currentFitness >= randomFitness) {
        return dot;
      }
    }
    return null;
  }
  
  void mutate() {
    for (int i = 0; i < dots.length - 1; i++) {
      Dot dot = dots[i];
      dot.brain.mutate();
    }
  }
}

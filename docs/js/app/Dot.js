class Dot {
  position;
  velocity;
  acceleration;
  fitness = 0;
  brain;
  dead = false;
  diedByObstacle = false;
  reachedGoal = false;
  isBest = false;

  constructor() {
    this.brain = new Brain(0);
    this.position = new p5.Vector(width / 2, (height * 7) / 8);
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
  }

  clone() {
    const cloned = new Dot();
    cloned.brain = this.brain.clone();
    return cloned;
  }

  draw() {
    const radius = Settings.DOT_RADIUS;
    noStroke();
    if (this.isBest) {
      fill(0, 0, 255);
      const radiusThick = radius * Settings.DOT_BEST_THICKNESS;
      ellipse(this.position.x, this.position.y, radiusThick, radiusThick);
    }
    fill(0);
    ellipse(this.position.x, this.position.y, radius, radius);
  }

  // Returns a boolean indicating if the dot just became idle.
  move() {
    if (this.dead || this.reachedGoal) return false;
    if (goal.isReachedBy(this.position)) {
      this.reachedGoal = true;
      this.fitness = 1 + 1 / (this.brain.step * this.brain.step);
      return true;
    }
    if (this.brain.step < this.brain.directions.length) {
      this.acceleration = this.brain.directions[this.brain.step++];
    } else {
      this.dead = true;
      return true;
    }
    this.velocity.add(this.acceleration);
    this.velocity.limit(Settings.MAXIMUM_DOT_VELOCITY);
    this.position.add(this.velocity);
    if (!this.isInBounds()) {
      this.diedByObstacle = true;
      this.dead = true;
      return true;
    }
    return false;
  }

  isInBounds() {
    if (
      this.position.x < 0 ||
      this.position.x > width ||
      this.position.y < 0 ||
      this.position.y > height
    ) {
      return false;
    }
    for (const obstacle of obstacles) {
      if (obstacle.collidesWith(this.position)) {
        return false;
      }
    }
    return true;
  }

  calculateFitness() {
    if (this.reachedGoal) return;
    const distance = goal.distanceTo(this.position);
    this.fitness = 1.0 / (distance * distance);
    if (this.diedByObstacle) {
      this.fitness /= Settings.DOT_OBSTACLE_PENALTY;
    }
  }
}

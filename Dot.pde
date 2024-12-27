class Dot {
  PVector position;
  PVector velocity;
  PVector acceleration;
  float fitness = 0;
  Brain brain;
  boolean dead = false;
  boolean diedByObstacle = false;
  boolean reachedGoal = false;
  boolean isBest = false;
  
  Dot() {
    brain = new Brain(0);
    position = new PVector(width / 2, height * 7 / 8);
    velocity = new PVector(0, 0);
    acceleration = new PVector(0, 0);
  }
  
  Dot clone() {
    Dot clone = new Dot();
    clone.brain = brain.clone();
    return clone;
  }
  
  void draw() {
    float radius = Settings.DOT_RADIUS;
    noStroke();
    if (isBest) {
      fill(0, 0, 255);
      float radiusThick = radius * Settings.DOT_BEST_THICKNESS;
      ellipse(position.x, position.y, radiusThick, radiusThick);
    }
    fill(0);
    ellipse(position.x, position.y, radius, radius);
  }
  
  // Returns a boolean indicating if the dot just became idle.
  boolean move() {
    if (dead || reachedGoal) return false;
    if (goal.isReachedBy(position)) {
      reachedGoal = true;
      fitness = 1 + 1 / (brain.step * brain.step);
      return true;
    }
    if (brain.step < brain.directions.length) {
      acceleration = brain.directions[brain.step++];
    } else{
      dead = true;
      return true;
    }
    velocity.add(acceleration);
    velocity.limit(Settings.MAXIMUM_DOT_VELOCITY);
    position.add(velocity);
    if (!isInBounds()) {
      dead = true;
      diedByObstacle = true;
      return true;
    }
    return false;
  }
  
  boolean isInBounds() {
    if (position.x < 0 || position.x > width || position.y < 0 || position.y > height) {
      return false;
    }
    for (Obstacle obstacle : obstacles) {
      if (obstacle.collidesWith(position)) {
        return false;
      }
    }
    return true;
  }
  
  void calculateFitness() {
    if (reachedGoal) return;
    float distance = goal.distanceTo(position);
    fitness = 1.0 / (distance * distance);
    if (diedByObstacle) {
      fitness /= Settings.DOT_OBSTACLE_PENALTY;
    }
  }
}

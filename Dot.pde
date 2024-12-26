class Dot {
  PVector position;
  PVector velocity;
  PVector acceleration;
  float fitness = 0;
  Brain brain;
  boolean dead = false;
  boolean reachedGoal = false;
  
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
    fill(0);
    ellipse(position.x, position.y, Settings.DOT_RADIUS, Settings.DOT_RADIUS);
  }
  
  // Returns a boolean indicating if the dot just became idle.
  boolean move() {
    if (dead || reachedGoal) return false;
    if (goal.isReachedBy(position)) {
      reachedGoal = true;
      fitness = 1;
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
    if (position.x < 0 || position.x > width || position.y < 0 || position.y > height) {
      dead = true;
      return true;
    }
    return false;
  }
  
  void calculateFitness() {
    if (dead || reachedGoal) return;
    float distance = goal.distanceTo(position);
    fitness = 1.0 / (distance * distance);
  }
}

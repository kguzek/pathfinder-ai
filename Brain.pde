class Brain {
  PVector[] directions;
  int step = 0;
  
  Brain(int size) {
    if (size == 0) {
      size = floor(random(Settings.BRAIN_STEPS_MIN, Settings.BRAIN_STEPS_MAX));
    }
    directions = new PVector[size];
    randomize();
  }
  
  Brain clone() {
    Brain clone = new Brain(directions.length);
    for (int i = 0; i < directions.length; i++) {
      clone.directions[i] = directions[i].copy();
    }
    return clone;
  }
  
  void mutate() {
    for (int i = 0; i < directions.length; i++) {
      if (random(1) < Settings.BRAIN_MUTATION_PROBABILITY) {
        float angle = random(TWO_PI);
        directions[i] = PVector.fromAngle(angle);
      }
    }
  }
  
  void randomize() {
    for (int i = 0; i < directions.length; i++) {
      float angle = random(TWO_PI);
      directions[i] = PVector.fromAngle(angle);
    }
  }
}
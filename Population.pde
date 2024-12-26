class Population {
  Dot[] dots;
  int numIdleDots;
  int generation;
  
  Population(int size) {
    dots = new Dot[size];
    numIdleDots = 0;
    generation = 1;
    for (int i = 0; i < size; i++) {
      dots[i] = new Dot();
    }
  }
  
  void draw() {
    for (Dot dot : dots) {
      boolean becameIdle = dot.move();
      dot.draw();
      if (becameIdle) numIdleDots++;
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
    for (int i = 0; i < dots.length; i++) {
      Dot parent = selectParent();
      newDots[i] = parent.clone();
    }
    dots = newDots;
    numIdleDots = 0;
    generation++;
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
    for (int i = 1; i < dots.length; i++) {
      Dot dot = dots[i];
      dot.brain.mutate();
    }
  }
}

Population population;
Goal goal;

void settings() {
  size(Settings.WIDTH, Settings.HEIGHT);
}

void setup() {
  population = new Population(Settings.POPULATION_SIZE);
  goal = new Goal();
}

void draw() {
  background(216);
  if (population.isIdle()) {
    population.calculateFitness();
    population.performNaturalSelection();
    population.mutate();
  } else {
    population.draw();
    goal.draw();
  }
  textSize(30);
  fill(16);
  textAlign(LEFT, TOP);
  text("Generation: " + population.generation, 10, 10);
}
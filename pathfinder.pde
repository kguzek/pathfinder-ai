Population population;
Goal goal;
Obstacle[] obstacles;

void settings() {
  size(Settings.WIDTH, Settings.HEIGHT);
}

void setup() {
  population = new Population(Settings.POPULATION_SIZE);
  goal = new Goal();
  int obstacleWidth = width * 4 / 5;
  obstacles = new Obstacle[] {
    new Obstacle(0, height * 2 / 5, obstacleWidth, 10),
      new Obstacle(width - obstacleWidth, height * 3 / 5, obstacleWidth, 10)
    };
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
  for (Obstacle obstacle : obstacles) {
    obstacle.draw();
  }
  textSize(30);
  fill(16);
  textAlign(LEFT, TOP);
  text("Generation: " + population.generation, 10, 10);
  textAlign(RIGHT, TOP);
  text("Dead dots: " + (population.numIdleDots - population.numSuccessfulDots), width - 10, 10);
  text("Successful dots: " + (population.numSuccessfulDots), width - 10, 10 + textAscent() + textDescent());
}
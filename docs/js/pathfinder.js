let population;
let goal;
let obstacles = [];

function setup() {
  createCanvas(Settings.WIDTH, Settings.HEIGHT);
  population = new Population(Settings.POPULATION_SIZE);
  restoreEvolutionState();
  goal = new Goal();
  const obstacleWidth = (width * 4) / 5;
  obstacles = [
    new Obstacle(0, (height * 2) / 5, obstacleWidth, 10),
    new Obstacle(width - obstacleWidth, (height * 3) / 5, obstacleWidth, 10),
  ];
}

function draw() {
  background(232);
  for (const obstacle of obstacles) {
    obstacle.draw();
  }
  if (population.isIdle()) {
    population.calculateFitness();
    saveEvolutionState();
    population.performNaturalSelection();
    population.mutate();
  } else {
    population.draw();
    goal.draw();
  }
  textSize(Settings.FONT_SIZE);
  fill(16);
  textAlign(LEFT, TOP);
  text("Generation: " + population.generation, 10, 10);
  textAlign(RIGHT, TOP);
  text(
    "Dead dots: " + (population.numIdleDots - population.numSuccessfulDots),
    width - 10,
    10
  );
  text(
    "Successful dots: " + population.numSuccessfulDots,
    width - 10,
    10 + textAscent() + textDescent()
  );
}

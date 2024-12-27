/** A script which saves the evolution state in the browser LocalStorage. */

const BRAINS_TO_SAVE = 200;

function updateTitle() {
  document.title = `Pathfinder | Generation ${population.generation}`;
}

function saveEvolutionState() {
  if (!population) return;
  updateTitle();
  const { dots, ...state } = population;
  const directionArrays = dots
    .sort((a, b) => b.fitness - a.fitness)
    .slice(0, BRAINS_TO_SAVE)
    .map((dot) =>
      dot.brain.directions.map((direction) => ({
        x: direction.x,
        y: direction.y,
      }))
    );
  const stringified = JSON.stringify({ ...state, directionArrays });
  localStorage.setItem("evolution", stringified);
}

function restoreEvolutionState() {
  if (!population) return;
  const evolution = localStorage.getItem("evolution");
  if (!evolution) return;
  let parsed;
  try {
    parsed = JSON.parse(evolution);
  } catch (e) {
    console.error("Failed to parse evolution state", e);
    return;
  }
  if (!parsed) return;
  const { directionArrays, ...state } = parsed;
  Object.assign(population, state);
  // Replicate the entire population based on the top brains saved
  for (let i = 0; i < Settings.POPULATION_SIZE; i++) {
    const directions = directionArrays[i % BRAINS_TO_SAVE];
    const previousBrainSteps = population.dots[i].brain.directions.length;
    // Ensure the dot's brain has the correct number of steps
    if (previousBrainSteps < directions.length) {
      population.dots[i].brain.directions.push(
        ...Array.from(
          { length: directions.length - previousBrainSteps },
          () => new p5.Vector()
        )
      );
    } else {
      population.dots[i].brain.directions.length = directions.length;
    }
    for (let j = 0; j < directions.length; j++) {
      Object.assign(population.dots[i].brain.directions[j], directions[j]);
    }
  }
  updateTitle();
  population.performNaturalSelection();
  population.mutate();
}

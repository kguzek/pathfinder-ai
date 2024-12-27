/** A script which saves the evolution state in the browser LocalStorage. */

// Ballpark amount of brains to save in the LocalStorage, obtained using trial and error
let BRAINS_TO_SAVE = 550;

function updateTitle() {
  document.title = `Pathfinder | Generation ${population.generation}`;
}

function saveEvolutionState() {
  if (!population) return;
  updateTitle();
  const { dots, ...state } = population;
  let angles = dots
    .sort((a, b) => b.fitness - a.fitness)
    .slice(0, BRAINS_TO_SAVE)
    .map((dot) =>
      dot.brain.directions.map((direction) =>
        Math.atan2(direction.y, direction.x)
      )
    );
  // Try to save the evolution state, downgrading the amount of saved brains if necessary
  // This is done to prevent the LocalStorage from running out of space
  while (BRAINS_TO_SAVE > 0) {
    const stringified = JSON.stringify({ ...state, angles });
    try {
      localStorage.setItem("evolution", stringified);
    } catch {
      console.warn(
        "Downgrading the amount of saved brains from",
        BRAINS_TO_SAVE--,
        "to",
        BRAINS_TO_SAVE
      );
      angles.pop();
      continue;
    }
    break;
  }
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
  const { angles, ...state } = parsed;
  Object.assign(population, state);
  // Replicate the entire population based on the top brains saved
  for (let i = 0; i < Settings.POPULATION_SIZE; i++) {
    population.dots[i].brain.directions = angles[i % angles.length].map(
      (angle) => p5.Vector.fromAngle(angle)
    );
  }
  updateTitle();
  population.performNaturalSelection();
  population.mutate();
}

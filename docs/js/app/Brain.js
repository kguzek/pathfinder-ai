class Brain {
  directions = [];
  step = 0;

  constructor(size) {
    if (size === 0) {
      size = floor(random(Settings.BRAIN_STEPS_MIN, Settings.BRAIN_STEPS_MAX));
    }
    this.directions = new Array(size).fill(null);
    this.randomize();
  }

  clone() {
    const cloned = new Brain(this.directions.length);
    for (let i = 0; i < this.directions.length; i++) {
      cloned.directions[i] = this.directions[i].copy();
    }
    return cloned;
  }

  mutate() {
    for (let i = 0; i < this.directions.length; i++) {
      if (random(1) < Settings.BRAIN_MUTATION_PROBABILITY) {
        this.setRandomAngle(i);
      }
    }
  }

  setRandomAngle(i) {
    const angle = random(TWO_PI);
    this.directions[i] = p5.Vector.fromAngle(angle);
  }

  randomize() {
    for (let i = 0; i < this.directions.length; i++) {
      this.setRandomAngle(i);
    }
  }
}

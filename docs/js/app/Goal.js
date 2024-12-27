class Goal {
  position = new p5.Vector(Settings.GOAL_X, Settings.GOAL_Y);
  radius = Settings.GOAL_RADIUS;
  diameter = 2 * this.radius;

  constructor() {}

  distanceTo(point) {
    return dist(this.position.x, this.position.y, point.x, point.y);
  }

  isReachedBy(point) {
    return this.distanceTo(point) < this.radius + Settings.GOAL_TOLERANCE;
  }

  draw() {
    fill(0, 255, 0);
    ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
  }
}

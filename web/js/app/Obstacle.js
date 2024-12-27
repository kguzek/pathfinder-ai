class Obstacle {
  x;
  y;
  width;
  height;
  r;
  g;
  b;

  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.randomizeColor();
  }

  randomizeColor() {
    this.r = floor(random(192));
    this.g = floor(random(128));
    this.b = floor(random(192));
  }

  draw() {
    fill(this.r, this.g, this.b);
    rect(this.x, this.y, this.width, this.height);
  }

  collidesWith(point) {
    return (
      point.x >= this.x &&
      point.x <= this.x + this.width &&
      point.y >= this.y &&
      point.y <= this.y + this.height
    );
  }
}

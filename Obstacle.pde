class Obstacle {
  int x;
  int y;
  int width;
  int height;
  int r;
  int g;
  int b;
  
  Obstacle(int x, int y, int width, int height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    randomizeColor();
  }
  
  void randomizeColor() {
    r = floor(random(256));
    g = floor(random(256));
    b = floor(random(256));
  }
  
  void draw() {
    fill(r, g, b);
    rect(x, y, width, height);
  }
  
  boolean collidesWith(PVector point) {
    return point.x >= x && point.x <= x + width && point.y >= y && point.y <= y + height;
  }
}
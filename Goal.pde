class Goal {
  PVector position = new PVector(Settings.GOAL_X, Settings.GOAL_Y);
  float radius = Settings.GOAL_RADIUS;
  float diameter = 2 * radius;
  
  Goal() {}
  
  float distanceTo(PVector point) {
    return dist(position.x, position.y, point.x, point.y);
  }
  
  boolean isReachedBy(PVector point) {
    return distanceTo(point) < radius + Settings.GOAL_TOLERANCE;
  }
  
  void draw() {
    fill(0, 255, 0);
    ellipse(position.x, position.y, diameter, diameter);
  }
}
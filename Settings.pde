static class Settings {
  static int WIDTH = 800;
  static int HEIGHT = 800;
  static int FONT_SIZE = 24;
  
  static int DOT_RADIUS = 4;
  static int MAXIMUM_DOT_VELOCITY = 5;
  static int BRAIN_STEPS_MIN = 300;
  static int BRAIN_STEPS_MAX = 500;
  static float BRAIN_MUTATION_PROBABILITY = 0.01; // 1%
  static int POPULATION_SIZE = 1000;
  static float DOT_OBSTACLE_PENALTY = 1.5;
  static float DOT_BEST_THICKNESS = 2.0;
  
  static int GOAL_X = WIDTH / 2;
  static int GOAL_Y = 50;
  static int GOAL_RADIUS = 5;
  static int GOAL_TOLERANCE = 5;
}
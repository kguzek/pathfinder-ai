function applyResponsiveLayout() {
  const screenWidth = document.documentElement.clientWidth;
  if (screenWidth > 800) return;
  // scale ranges from 1 to 8, where 8 is full scale
  const scale = Math.max(1, Math.floor(screenWidth / 100));
  Settings.WIDTH = screenWidth;
  Settings.GOAL_X = Settings.WIDTH / 2;
  Settings.GOAL_RADIUS = scale;
  Settings.DOT_RADIUS = Math.ceil(scale / 2);
  Settings.FONT_SIZE = Math.max(10, 3 * scale);
}

applyResponsiveLayout();

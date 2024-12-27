let started = true;
const toggleButton = document.getElementById("toggleLoop");
const saveIntervalSelect = document.getElementById("saveInterval");
const saveIntervalS = document.getElementById("s");

function toggleLoop() {
  if (started) {
    noLoop();
  } else {
    loop();
  }
  started = !started;
  toggleButton.textContent = started ? "Pause" : "Resume";
}

function reset() {
  localStorage.clear();
  window.location.reload(true);
}

function setSaveInterval(interval) {
  const intervalInt = +interval;
  Settings.PROGRESS_SAVE_INTERVAL = intervalInt;
  localStorage.setItem("saveInterval", interval);
  saveIntervalS.textContent =
    intervalInt === 1 ? "" : intervalInt === 0 ? "s (disable)" : "s";
}

function restoreSavedSettings() {
  const saveInterval = localStorage.getItem("saveInterval");
  if (saveInterval == null || saveInterval === "") return;
  saveIntervalSelect.value = localStorage.getItem("saveInterval");
  Settings.PROGRESS_SAVE_INTERVAL = +saveInterval;
  setSaveInterval(saveInterval);
}

restoreSavedSettings();

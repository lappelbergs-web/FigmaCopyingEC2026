(() => {
  const toggle = document.querySelector("#dark-mode-toggle");
  const root = document.documentElement;
  const storageKey = "theme";

  if (!toggle) {
    return;
  }

  const getSavedTheme = () => {
    try {
      const savedTheme = window.localStorage.getItem(storageKey);
      return savedTheme === "dark" || savedTheme === "light" ? savedTheme : null;
    } catch {
      return null;
    }
  };

  const applyTheme = (theme, shouldSave = false) => {
    root.dataset.theme = theme;
    toggle.checked = theme === "dark";

    if (shouldSave) {
      try {
        window.localStorage.setItem(storageKey, theme);
      } catch {
        return;
      }
    }
  };

  const savedTheme = getSavedTheme();
  const systemPrefersDark = window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
    : false;

  applyTheme(savedTheme || (systemPrefersDark ? "dark" : "light"));
  toggle.addEventListener("change", () => {
    applyTheme(toggle.checked ? "dark" : "light", true);
  });
})();

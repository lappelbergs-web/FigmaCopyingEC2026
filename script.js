(() => {
  const toggle = document.querySelector("#dark-mode-toggle");
  const root = document.documentElement;
  const storageKey = "theme";

  if (!toggle) return;

  const getSavedTheme = () => {
    try {
      const savedTheme = window.localStorage.getItem(storageKey);
      return savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : null;
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

(() => {
  const navToggleBtn = document.getElementById("navToggleBtn");
  const navbarMenu = document.getElementById("navbarMenu");
  const tablet = window.matchMedia(
    "(min-width: 768px) and (max-width: 1048px)"
  );

  if (!navToggleBtn || !navbarMenu) return;

  function isMenuOpen() {
    return navbarMenu.classList.contains("is-open");
  }

  function openMenu() {
    if (!tablet.matches) return;
    navbarMenu.classList.add("is-open");
    navToggleBtn.classList.add("is-open");
    navToggleBtn.setAttribute("aria-expanded", "true");
    navToggleBtn.setAttribute("aria-label", "Close menu");
  }

  function closeMenu() {
    navbarMenu.classList.remove("is-open");
    navToggleBtn.classList.remove("is-open");
    navToggleBtn.setAttribute("aria-expanded", "false");
    navToggleBtn.setAttribute("aria-label", "Open menu");
  }

  navToggleBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    isMenuOpen() ? closeMenu() : openMenu();
  });

  document.addEventListener("click", (event) => {
    if (!isMenuOpen()) return;
    const clickedInside =
      navbarMenu.contains(event.target) ||
      navToggleBtn.contains(event.target);
    if (!clickedInside) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMenuOpen()) {
      closeMenu();
      navToggleBtn.focus();
    }
  });

  tablet.addEventListener("change", () => {
    if (!tablet.matches) closeMenu();
  });

  closeMenu();

})();

(() => {
  const faqItems = Array.from(document.querySelectorAll(".faq-list details"));
  const tablet = window.matchMedia(
    "(min-width: 768px) and (max-width: 1048px)"
  );

  if (faqItems.length < 3) return;

  function setOpenFaq() {
    const openIndex = tablet.matches ? 2 : 0;
    faqItems.forEach((item, index) => {
      item.open = index === openIndex;
    });
  }

  tablet.addEventListener("change", setOpenFaq);
  setOpenFaq();
})();

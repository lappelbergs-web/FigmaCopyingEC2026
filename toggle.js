// toggle.js — Dark/Light mode-växlingen
//
// GEMENSAM KODDEL: grundstrukturen (JS-driven knapp, ordningsoberoende)
// LEOS KODDEL: minnesfunktionen (localStorage) + systemets färgtema
//   (prefers-color-scheme) vid första besöket — adapterad från Leos
//   script.js till vår knapp-baserade markup (han använde en checkbox).

const body = document.body;
const themeToggleBtn = document.getElementById('themeToggle');
const googlePlayBadge = document.getElementById('googlePlayBadge');
const storageKey = 'theme';

function getSavedTheme() {
  try {
    const saved = window.localStorage.getItem(storageKey);
    return saved === 'dark' || saved === 'light' ? saved : null;
  } catch {
    return null;
  }
}

function applyTheme(theme, shouldSave = false) {
  googlePlayBadge.src = theme === 'dark'
    ? 'images/googleplay-dark.png'
    : 'images/googleplay-light.png';
  body.setAttribute('data-theme', theme);
  themeToggleBtn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');

  if (shouldSave) {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch {
      // localStorage otillgängligt (t.ex. privat läge) — växlingen funkar ändå denna session
    }
  }
}

// Vid sidladdning: använd sparat val om det finns, annars systemets färgtema
const savedTheme = getSavedTheme();
const systemPrefersDark = window.matchMedia
  ? window.matchMedia('(prefers-color-scheme: dark)').matches
  : false;

applyTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));

themeToggleBtn.addEventListener('click', () => {
  const current = body.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next, true);
});

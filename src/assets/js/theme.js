// Largely inspired by https://github.com/maxboeck/mxb/blob/master/src/assets/scripts/modules/themepicker.js

const SELECTORS = {
  picker: ".js-themepicker",
  toggleBtn: ".js-themepicker-toggle",
  themeSelectBtn: ".js-themepicker-themeselect",
  closeBtn: ".js-themepicker-close",
  navToggleBtn: ".js-nav-toggle",
};
const CLASSES = {
  open: "is-open",
  active: "is-active",
};
const THEME_STORAGE_KEY = "theme";

class ThemePicker {
  constructor() {
    this.activeTheme = "light";
    this.hasLocalStorage = typeof Storage !== "undefined";
    this.hasThemeColorMeta =
      !!document.querySelector('meta[name="theme-color"]') && window.metaColors;

    this.themeSelectButtons = document.querySelectorAll(
      "input[name='theme-selector']"
    );

    this.init();
  }

  init() {
    const systemPreference = this.getSystemPreference();
    const storedPreference = this.getStoredPreference();

    if (storedPreference) {
      this.activeTheme = storedPreference;
      this.selectDefaultTheme();
    } else if (systemPreference) {
      this.activeTheme = systemPreference;
      document
        .querySelector("input[name='theme-selector'][value='auto']")
        .setAttribute("checked", "checked");
    }

    this.bindEvents();
  }

  bindEvents() {
    this.themeSelectButtons.forEach((btn) => {
      const id = btn.value;

      if (id) {
        btn.addEventListener("change", () => this.setTheme(id));
      }
    });
  }

  getSystemPreference() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return false;
  }

  getStoredPreference() {
    if (this.hasLocalStorage) {
      return localStorage.getItem(THEME_STORAGE_KEY);
    }
    return false;
  }

  selectDefaultTheme() {
    this.themeSelectButtons.forEach((btn) => {
      if (btn.value === this.activeTheme) {
        btn.setAttribute("checked", "checked");
      }
    });
  }

  setTheme(id) {
    document.documentElement.setAttribute("data-theme", id);

    if (this.hasLocalStorage) {
      localStorage.setItem(THEME_STORAGE_KEY, id);
    }
    if (this.hasThemeColorMeta) {
      const metaColor = window.metaColors[id];
      const metaTag = document.querySelector('meta[name="theme-color"]');
      metaTag.setAttribute("content", metaColor);
    }
  }
}

if (window.CSS && CSS.supports("color", "var(--fake-var)")) {
  new ThemePicker();
}

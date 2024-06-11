document.addEventListener('DOMContentLoaded', () => {





/**
 * Utility function to calculate the current theme setting.
 * Look for a local storage value.
 * Fall back to system setting.
 * Fall back to light mode.
 */
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}

/**
 * Utility function to update the theme setting on the html tag
 */
function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}

/**
 * On page load:
 */

/**
 * 1. Grab what we need from the DOM and system settings on page load
 */
const button = document.getElementById("theme-toggle-button");

// const localStorageTheme = localStorage.getItem("theme");
const localStorageTheme = getLocalStorageItem("theme");

const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");



/**
 * 2. Work out the current site settings
 */
let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

/**
 * 3. Update the theme setting and button text according to current settings
 */
updateThemeOnHtmlEl({ theme: currentThemeSetting });

/**
 * 4. Add an event listener to toggle the theme
 */
button.addEventListener("click", (event) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  // localStorage.setItem("theme", newTheme);
  setLocalStorageItem("theme", newTheme);
  updateThemeOnHtmlEl({ theme: newTheme });

  // Toggle the 'active' class on the button for animation
  button.classList.toggle('active');

  currentThemeSetting = newTheme;
});










/**
 * local storage utility functions
 */
function setLocalStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Handle errors, such as exceeding storage quota
    console.error('Error setting item in localStorage:', error);
  }
}

function getLocalStorageItem(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    // Handle errors, such as JSON parsing errors
    console.error('Error getting item from localStorage:', error);
    return null;
  }
}






});

/**
 * init.ts
 *
 * Initialization script for the application.
 */



import PromiseDom from '../rsrc/42/PromiseDom.js';
// import FetchPartial from '../42/FetchPartial.js';

async function start() {
    // Instantiate PromiseDom
    const domReady = new PromiseDom();
    try {
        await domReady.ready;
        console.log('app.start | DOM is fully loaded and parsed');

        // html message
        // Create an instance of FetchPartial
        // const fetchPartial = new FetchPartial();
        // Fetch and process all partial HTML content
        // await fetchPartial.fetchAll();
        // console.log('app.start | All partial HTML content fetched and processed');

      setup();

    }
    catch (error) {
        console.error('app.start | Error during initialization:', error);
    }
}

// Start the script
start();




function setup() {





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
 * 4. Toggle the 'active' class on the button if needed
 */
if (currentThemeSetting === "dark") {
  button.classList.add('active');
}


/**
 * 5. Add an event listener to toggle the theme
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
 * utility functions
 */
/**
 * to update the theme setting on the html tag
 */
function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}

/**
 * set local storage
 */
function setLocalStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Handle errors, such as exceeding storage quota
    console.error('Error setting item in localStorage:', error);
  }
}

/**
 * get local storage
 */
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






}






///////////////////
(function(global) {
  'use strict';

  const logLines = [];

  function formatMessage(message) {
      const timestamp = new Date().toISOString();
      let formattedMessage;

      if (typeof message === 'object') {
          try {
              formattedMessage = JSON.stringify(message, null, 2);
          } catch (error) {
              formattedMessage = '[Unable to stringify object]';
          }
      } else {
          formattedMessage = message;
      }

      return `${timestamp} - ${formattedMessage}`;
  }

  function logMessage(message) {
      const logEntry = formatMessage(message);
      logLines.push(logEntry);

      if (typeof message === 'object') {
          console.dir(message);
      } else {
          console.log(logEntry);
      }
  }

  function getCombinedLogs() {
      return logLines.join('\n');
  }

  global.myLogger = {
      log: logMessage,
      getLogs: getCombinedLogs
  };
})(window);

// Usage example
myLogger.log('This is a test log message.');
myLogger.log({ name: 'Sarah', country: 'US', age: 35, treehouseStudent: true, skills: ['JavaScript', 'HTML', 'CSS'] });
myLogger.log([1, 2, 3, { nested: 'object' }]);
console.log('Combined Logs:\n' + myLogger.getLogs());


console.log('----------------------------------------');




document.addEventListener('DOMContentLoaded', () => {


// Function to toggle the theme
function toggleTheme() {
    // Select the <html> element
    var htmlElement = document.documentElement;
    // Get the current value of the 'data-theme' attribute
    var currentTheme = htmlElement.getAttribute('data-theme');
  
    // Check the current theme and toggle it
    if (currentTheme === "dark") {
      htmlElement.setAttribute("data-theme", "light");
    } else if (currentTheme === "light") {
      htmlElement.setAttribute("data-theme", "dark");
    } else {
      // Determine the user's system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // If system preference is dark, set the initial theme to light
        htmlElement.setAttribute("data-theme", "light");
      } else {
        // If system preference is light, set the initial theme to dark
        htmlElement.setAttribute("data-theme", "dark");
      }
    }
    
    // Toggle the active class on the button
    var button = document.getElementById('theme-toggle-button');
    button.classList.toggle('active');
    
    // Save the selected theme in localStorage
    localStorage.setItem("theme", htmlElement.getAttribute('data-theme'));
  }
  



  // Function to apply saved theme from localStorage
  function applySavedTheme() {
    var savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      var button = document.getElementById('theme-toggle-button');
      button.classList.toggle('active');
    }
  }
  



  // Add event listener to the button
  document.getElementById('theme-toggle-button').addEventListener('click', toggleTheme);
  
  // Apply saved theme when the page loads
  window.addEventListener('load', applySavedTheme);
  






/**
 * Utility function to update the theme setting on the html tag
 */
function updateThemeOnHtmlEl({ theme }) {
    document.querySelector("html").setAttribute("data-theme", theme);
}






});

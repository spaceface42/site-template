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
        htmlElement.setAttribute("data-theme", "dark");
      } else {
        // If system preference is light, set the initial theme to dark
        htmlElement.setAttribute("data-theme", "light");
      }
    }

// Toggle the active class on the button
var button = document.getElementById('theme-toggle-button');
button.classList.toggle('off');
button.classList.toggle('on');

// Save the selected theme in a cookie
document.cookie = "theme=" + htmlElement.getAttribute('data-theme') + ";expires=Fri, 31 Dec 9999 23:59:59 GMT";
}

// Add event listener to the button
document.getElementById('theme-toggle-button').addEventListener('click', toggleTheme);

// Initial call to set the initial theme based on system preference
toggleTheme();





});

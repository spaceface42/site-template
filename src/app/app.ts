/**
 * init.ts
 * 
 * Initialization script for the application.
 */

// import .js file when working directly with modules in the browser
// import PromiseDom from '../42/PromiseDom.js';
// import FetchPartial from '../42/FetchPartial.js';

import PromiseDom from '../42/PromiseDom.js';
import FetchPartial from '../42/FetchPartial.js';



async function initializeApp() {

    const domReady = new PromiseDom();

    try {
        await domReady.ready;
        console.log('DOM is now ready!');
        
        // Manipulate DOM: Add welcome message
        const consoleElement = document.getElementById('console');
        if (consoleElement) {
            const h3 = document.createElement('h3');
            h3.textContent = 'Welcome to spaceface / spacesuit / version 1.0.1';
            consoleElement.appendChild(h3);
        } else {
            console.warn('initializeApp | Element with id "console" not found');
        }
        
        // Fetch and process all partial HTML content
        const htmlPartial = new FetchPartial();
        await htmlPartial.fetchAllPartials();
        console.log('initializeApp | All HTML partials fetched and processed');

        // Additional initialization tasks can be added here

        console.log('App fully initialized');
    } catch (error) {
        console.error('An error occurred during initialization:', error);
    }
}

// Call the async function to start the application
initializeApp();

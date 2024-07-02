/**
 * init.ts
 * 
 * Initialization script for the application.
 */

console.log('app.js starting...');

import PromiseDom from '../42/PromiseDom.js';
import PartialContentInjector from '../42/PartialContentInjector.js';



/*
 *
 * 1. check for domreadyness
 * 2. then fetch and inject partials into the dom
 * 
 **/
async function initializeApp() {

    const domReady = new PromiseDom();
    const injector = new PartialContentInjector(['raw.githubusercontent.com']);

    console.log('initializeApp...');

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

        await injector.injectAllPartials();
        console.log('All partials injected successfully');

    } catch (error) {
        console.error('An error occurred during initialization:', error);
    }
}

// Call the async function to start the application
initializeApp();

console.log('bye...');
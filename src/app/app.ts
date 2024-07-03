/**
 * init.ts
 * 
 * Initialization script for the application.
 */
import AsyncDomHandler from '../42/AsyncDomHandler.js';
import PartialContentInjector from '../42/PartialContentInjector.js';

/*
 * settings
 **/
const APP_VERSION = '1.1.1';
const ALLOWED_DOMAINS = ['raw.githubusercontent.com', 'blackhole.spaceface.org'];

/*
 * initializeApp
 **/
async function initializeApp() {
    console.log('Initializing application...');

    const domReady = new AsyncDomHandler();
    const injector = new PartialContentInjector(ALLOWED_DOMAINS);

    try {
        await domReady.ready;
        console.log('DOM is now ready!');

        await demoAwait();

        await injectPartials(injector);

        console.log('Application initialized successfully');
    } catch (error) {
        console.error('An error occurred during initialization:', error instanceof Error ? error.message : String(error));
    }
}

async function demoAwait() {
    setTimeout(function() {
        await addWelcomeMessage();
        console.log("demoAwait demoAwait demoAwait");
      }, 5000);
}

/*
 * demo function to inject text from js code
 **/
async function addWelcomeMessage() {
    const consoleElement = document.getElementById('console');
    if (consoleElement) {
        const h3 = document.createElement('h3');
        h3.textContent = `Welcome to spaceface / spacesuit / version ${APP_VERSION}`;
        consoleElement.appendChild(h3);
    } else {
        console.warn('Element with id "console" not found');
    }
}

/*
 * injectPartials
 **/
async function injectPartials(injector: PartialContentInjector) {
    await injector.injectAllPartials();
    console.log('All partials injected successfully');
}

/*
 * Call the async function to start the application
 **/
initializeApp().catch(error => {
    console.log('__________________ ERROR ___');
    console.error('Fatal error during application initialization:', error instanceof Error ? error.message : String(error));
});
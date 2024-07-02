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
/*
async function initialization() {
    // Instantiate PromiseDom
    const domReady = new PromiseDom();
    
    try {
        // Wait for DOM to be fully loaded and parsed
        await domReady.ready;
        console.log('app.start | DOM is fully loaded and parsed, continuing...');

        // Manipulate DOM: Add welcome message
        const appElement = document.getElementById('console');

        if (appElement) {
            const h3 = document.createElement("h3");
            h3.textContent = 'Welcome to spaceface / spacesuit / version 1.0.1';
            appElement.appendChild(h3);
        } else {
            console.warn('app.start | Element with id "console" not found');
        }

        // Fetch and process all partial HTML content
        const htmlPartial = new FetchPartial();
        await htmlPartial.fetchAllPartials();
        console.log('app.start | All HTML partials fetched and processed');

    } catch (error) {
        console.error('app.start | Error during initialization:', error);
    }
}
*/
// Call the start function to initiate the process
// initialization();
// Create an instance of PromiseDom
const domReady = new PromiseDom();
// You can also use async/await syntax
async function runWhenReady() {
    try {
        await domReady.ready;
        console.log('DOM is ready (async)');
        // Manipulate DOM: Add welcome message
        const appElement = document.getElementById('console');
        if (appElement) {
            const h3 = document.createElement("h3");
            h3.textContent = 'Welcome to spaceface / spacesuit / version 1.0.1';
            appElement.appendChild(h3);
        }
        else {
            console.warn('app.start | Element with id "console" not found');
        }
        // Perform DOM operations or app initialization here
        // Fetch and process all partial HTML content
        const htmlPartial = new FetchPartial();
        await htmlPartial.fetchAllPartials();
        console.log('app.start | All HTML partials fetched and processed');
    }
    catch (error) {
        console.error('An error occurred (async):', error);
    }
}
runWhenReady();
//# sourceMappingURL=app.js.map
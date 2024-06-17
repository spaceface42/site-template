/**
 * init.ts
 *
 * Initialization script for the application.
 */
import PromiseDom from '../42/PromiseDom.js';
import SimpleRouter from '../42/SimpleRouter.js';
import FetchPartial from '../42/FetchPartial.js';
async function start() {
    // Instantiate PromiseDom
    const domReady = new PromiseDom();
    try {
        // Wait for DOM to be fully loaded and parsed
        await domReady.ready;
        console.log('app.start | DOM is fully loaded and parsed, continuing...');
        // Manipulate DOM: Add welcome message
        const appElement = document.getElementById('console42');
        if (appElement) {
            const h3 = document.createElement("h3");
            h3.textContent = 'Welcome to version 1.0.0';
            appElement.appendChild(h3);
        }
        // Initialize the SimpleRouter
        const router = new SimpleRouter('#main-content');
        console.log('app.start | SimpleRouter initialized');
        // Fetch and process all partial HTML content
        const htmlPartial = new FetchPartial();
        await htmlPartial.fetchAllPartials();
        console.log('app.start | All HTML partials fetched and processed');
    }
    catch (error) {
        console.error('app.start | Error during initialization:', error);
    }
}
// Start the script
start();
//# sourceMappingURL=app.js.map
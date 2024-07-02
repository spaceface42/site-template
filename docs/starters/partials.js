/**
 * init.ts
 *
 * Initialization script for the application.
 */
import PromiseDom from '../rsrc/42/PromiseDom.js';

import FetchPartial from '../rsrc/42/FetchPartial.js';

async function start() {
    // Instantiate PromiseDom
    const domReady = new PromiseDom();
    try {
        await domReady.ready;
        console.log('app.start | DOM is fully loaded and parsed');
        // html message
        const appElement = document.getElementById('app');
        if (appElement) {
            appElement.innerHTML = '<h3>Welcome to version 1.0.0</h3>';
        }
        // html message
        // Create an instance of FetchPartial
        const htmlPartial = new FetchPartial();
        // Fetch and process all partial HTML content
        await htmlPartial.fetchAllPartials();
        console.log('app.start | All partial HTML content fetched and processed');
    }
    catch (error) {
        console.error('app.start | Error during initialization:', error);
    }
}
// Start the script
start();
//# sourceMappingURL=app.js.map
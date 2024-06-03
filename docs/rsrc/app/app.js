/**
 * init.ts
 *
 * Initialization script for the application.
 */
import PromiseDom from '../42/PromiseDom.js';
import FetchPartial from '../42/FetchPartial.js';
async function start() {
    // Instantiate PromiseDom
    const domReady = new PromiseDom();
    try {
        await domReady.ready;
        console.log('_app | DOM is fully loaded and parsed');
        // html message
        const appElement = document.getElementById('app');
        if (appElement) {
            appElement.innerHTML = '<h3>Welcome to the Application</h3>';
        }
        // html message
        // Create an instance of FetchPartial
        const fetchPartial = new FetchPartial();
        // Fetch and process all partial HTML content
        await fetchPartial.fetchAll();
        console.log('_app | All partial HTML content fetched and processed');
    }
    catch (error) {
        console.error('_app | Error during initialization:', error);
    }
}
// Start the script
start();
//# sourceMappingURL=app.js.map
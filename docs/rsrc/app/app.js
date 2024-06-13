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
        console.log('app.start | DOM is fully loaded and parsed');
        // html message
        const appElement = document.getElementById('console42');
        if (appElement) {
            // appElement.innerHTML = '<h3>Welcome to version 1.0.0</h3>';
            const h3 = document.createElement("h3");
            h3.textContent = 'Welcome to version 1.0.0';
            appElement === null || appElement === void 0 ? void 0 : appElement.appendChild(h3);
        }
        // html message
        // Create an instance of FetchPartial
        const fetchPartial = new FetchPartial();
        // Fetch and process all partial HTML content
        await fetchPartial.fetchAll();
        console.log('app.start | All partial HTML content fetched and processed');
    }
    catch (error) {
        console.error('app.start | Error during initialization:', error);
    }
}
// Start the script
start();
//# sourceMappingURL=app.js.map
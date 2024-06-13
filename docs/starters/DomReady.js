/**
 * init.ts
 *
 * Initialization script for the application.
 */
import PromiseDom from '../42/PromiseDom.js';
// import FetchPartial from '../42/FetchPartial.js';

async function start() {
    // Instantiate PromiseDom
    const domReady = new PromiseDom();
    try {
        await domReady.ready;
        console.log('app.start | DOM is fully loaded and parsed');

        // Create an instance of FetchPartial
        // const fetchPartial = new FetchPartial();
        // Fetch and process all partial HTML content
        // await fetchPartial.fetchAll();
        // console.log('app.start | All partial HTML content fetched and processed');
    }
    catch (error) {
        console.error('app.start | Error during initialization:', error);
    }
}
// Start the script
start();
//# sourceMappingURL=app.js.map
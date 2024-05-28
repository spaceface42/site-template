/**
 * startup
 */
import PromiseDom from '../42/PromiseDom.js';
import FetchPartial from '../42/FetchPartial.js';
// Instantiate FetchPartial
const fetchPartial = new FetchPartial();
// Instantiate PromiseDom
const promiseDom = new PromiseDom();
// Use PromiseDom to wait for DOM ready state
promiseDom.ready.then(() => {
    /**
     * Once the DOM is ready, perform fetch operations
     *
     * fetchOne or fetchAll
     */
    // Example usage of fetchOne
    /* const linkElement = document.querySelector('link[rel="manualhtml"]');
    if (linkElement && linkElement instanceof HTMLLinkElement) {
        fetchPartial.fetchOne(undefined, linkElement)
            .then(() => console.log('FetchOne completed'))
            .catch(error => console.error('Error during fetching partial / fetchOne:', error));
    } */
    // fetchAll html partials
    fetchPartial.fetchAll()
        .then(() => console.log('FetchAll completed'))
        .catch(error => console.error('Error during fetching partial / fetchAll:', error));
    // call startup function
    startup();
});
/**
 * this function is responsible to set up ux
 */
function startup() {
    console.log('hellow orld');
}
//# sourceMappingURL=app.js.map
class DocumentReadyHandler {
    /**
     * Initializes DocumentReadyHandler instance.
     * @param document The document object to use. Default is window.document.
     */
    constructor(document = window.document) {
        this.ready = this.initPromise(document);
    }
    /**
     * Initializes the promise that resolves when the DOM is ready.
     * @param document The document object to use.
     * @returns A promise that resolves when the DOM is ready.
     */
    initPromise(document) {
        return new Promise((resolve) => {
            if (this.isDomReady(document.readyState)) {
                // DOM is already ready
                resolve();
            }
            else {
                // Wait for DOMContentLoaded event
                const onDOMContentLoaded = () => {
                    resolve();
                    this.cleanupListeners(document, onDOMContentLoaded);
                };
                document.addEventListener('DOMContentLoaded', onDOMContentLoaded, { once: true });
            }
        });
    }
    /**
     * Checks if the DOM is ready based on the readyState.
     * @param state The current readyState of the document.
     * @returns True if the DOM is ready, false otherwise.
     */
    isDomReady(state) {
        return state === 'interactive' || state === 'complete';
    }
    /**
     * Cleans up event listeners.
     * @param document The document object.
     * @param listener The event listener function to remove.
     */
    cleanupListeners(document, listener) {
        document.removeEventListener('DOMContentLoaded', listener);
    }
}
DocumentReadyHandler.VERSION = '1.2.0.fix';
export default DocumentReadyHandler;
//# sourceMappingURL=DocumentReadyHandler.js.map
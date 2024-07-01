class PromiseDom {
    /**
     * Initializes PromiseDom instance.
     * @param document The document object to use. Default is window.document.
     */
    constructor(document = window.document) {
        this.document = document;
        this.ready = this.initPromise();
    }
    /**
     * Initializes the promise that resolves when the DOM is ready.
     * @returns A promise that resolves when the DOM is ready.
     */
    initPromise() {
        return new Promise((resolve, reject) => {
            const state = this.document.readyState;
            if (state === 'interactive' || state === 'complete') {
                // DOM is already ready
                resolve();
            }
            else {
                // Wait for DOMContentLoaded event
                const onDOMContentLoaded = () => {
                    resolve();
                    this.cleanupListeners(onDOMContentLoaded);
                };
                try {
                    this.document.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);
                }
                catch (error) {
                    console.error('Error adding DOMContentLoaded listener:', error);
                    reject(error);
                }
            }
        });
    }
    /**
     * Cleans up event listeners.
     * @param listener The event listener function to remove.
     */
    cleanupListeners(listener) {
        try {
            this.document.removeEventListener('DOMContentLoaded', listener);
        }
        catch (error) {
            console.error('Error removing DOMContentLoaded listener:', error);
        }
    }
}
export default PromiseDom;
//# sourceMappingURL=PromiseDom.js.map
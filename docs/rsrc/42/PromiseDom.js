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
            const onDOMContentLoaded = () => {
                resolve();
            };
            try {
                const state = this.document.readyState;
                if (state === 'interactive' || state === 'complete') {
                    // DOM is already ready
                    resolve();
                }
                else {
                    // Wait for DOMContentLoaded event
                    this.document.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);
                }
            }
            catch (error) {
                console.error('Error initializing PromiseDom:', error);
                reject(error);
            }
            finally {
                // Ensure the event listener is always removed
                // this.document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
                this.cleanupListeners(onDOMContentLoaded);
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
            console.error('Error cleaning up listeners:', error);
        }
    }
}
export default PromiseDom;
//# sourceMappingURL=PromiseDom.js.map
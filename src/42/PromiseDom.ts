/**
 * PromiseDom v1.1.0
 * 
 * PromiseDom class provides a promise that resolves when the DOM is ready.
 */
type DocumentReadyState = 'loading' | 'interactive' | 'complete';

class PromiseDom {
    ready: Promise<void>;

    /**
     * Initializes PromiseDom instance.
     * @param document The document object to use. Default is window.document.
     */
    constructor(private document: Document = window.document) {
        this.ready = this.initPromise();
    }

    /**
     * Initializes the promise that resolves when the DOM is ready.
     * @returns A promise that resolves when the DOM is ready.
     */
    private initPromise(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const onDOMContentLoaded = () => {
                resolve();
            };

            try {
                const state: DocumentReadyState = this.document.readyState as DocumentReadyState;
                if (state === 'interactive' || state === 'complete') {
                    // DOM is already ready
                    resolve();
                } else {
                    // Wait for DOMContentLoaded event
                    this.document.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);
                }
            } catch (error) {
                console.error('Error initializing PromiseDom:', error);
                reject(error);
            } finally {
                // Ensure the event listener is always removed
                this.document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
            }
        });
    }
}

export default PromiseDom;

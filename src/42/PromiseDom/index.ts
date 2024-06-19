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
     * Ensure (with finally) the event listener is always removed
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
                this.cleanupListeners(onDOMContentLoaded);
            }
        });
    }

    /**
     * Cleans up event listeners.
     * @param listener The event listener function to remove.
     */
    private cleanupListeners(listener: EventListener): void {
        try {
            this.document.removeEventListener('DOMContentLoaded', listener);
        } catch (error) {
            console.error('Error cleaning up listeners:', error);
        }
    }

}

export default PromiseDom;

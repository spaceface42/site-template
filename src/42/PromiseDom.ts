/**
 * PromiseDom v1.1.2
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
            const state: DocumentReadyState = this.document.readyState as DocumentReadyState;
            
            if (state === 'interactive' || state === 'complete') {
                // DOM is already ready
                resolve();
            } else {
                // Wait for DOMContentLoaded event
                const onDOMContentLoaded = () => {
                    resolve();
                    this.cleanupListeners(onDOMContentLoaded);
                };
                try {
                    this.document.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);
                } catch (error) {
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
    private cleanupListeners(listener: EventListenerOrEventListenerObject): void {
        try {
            this.document.removeEventListener('DOMContentLoaded', listener);
        } catch (error) {
            console.error('Error removing DOMContentLoaded listener:', error);
        }
    }
}

export default PromiseDom;

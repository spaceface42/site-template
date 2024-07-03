/**
 * PromiseDom v1.1.3
 * 
 * PromiseDom class provides a promise that resolves when the DOM is ready.
 */
type DocumentReadyState = 'loading' | 'interactive' | 'complete';

class AsyncDomHandler {
    readonly ready: Promise<void>;
    readonly VERSION = '1.2.0';
    
    /**
     * Initializes PromiseDom instance.
     * @param document The document object to use. Default is window.document.
     */
    constructor(document: Document = window.document) {
        console.log('___AsyncDomHandler ', this.VERSION);
        this.ready = this.initPromise(document);
    }

    /**
     * Initializes the promise that resolves when the DOM is ready.
     * @param document The document object to use.
     * @returns A promise that resolves when the DOM is ready.
     */
    private initPromise(document: Document): Promise<void> {
        return new Promise<void>((resolve) => {
            if (this.isDomReady(document.readyState)) {
                // DOM is already ready
                resolve();
            } else {
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
    private isDomReady(state: string): state is 'interactive' | 'complete' {
        return state === 'interactive' || state === 'complete';
    }

    /**
     * Cleans up event listeners.
     * @param document The document object.
     * @param listener The event listener function to remove.
     */
    private cleanupListeners(document: Document, listener: EventListenerOrEventListenerObject): void {
        document.removeEventListener('DOMContentLoaded', listener);
    }
}

export default AsyncDomHandler;
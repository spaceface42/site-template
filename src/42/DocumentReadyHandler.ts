/**
 * DocumentReadyHandler v1.2.0
 * 
 * DocumentReadyHandler class provides a promise that resolves when the DOM is ready.
 */
type DocumentReadyState = 'loading' | 'interactive' | 'complete';

class DocumentReadyHandler {
    static readonly VERSION = '1.2.0.fix';
    readonly ready: Promise<void>;
    
    /**
     * Initializes DocumentReadyHandler instance.
     * @param document The document object to use. Default is window.document.
     */
    constructor(document: Document = window.document) {
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
    private isDomReady(state: DocumentReadyState): boolean {
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

export default DocumentReadyHandler;
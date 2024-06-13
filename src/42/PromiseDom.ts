/**
 * FetchPartial v1.0.1
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
        // console.info('PromiseDom v1.0.0 initialized');
        this.ready = new Promise<void>((resolve, reject) => {
            try {
                const state: DocumentReadyState = this.document.readyState as DocumentReadyState;
                if (state === 'interactive' || state === 'complete') {
                    // DOM is already ready
                    resolve();
                } else {
                    // Wait for DOMContentLoaded event
                    const onDOMContentLoaded = () => {
                        resolve();
                        this.document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
                    };
                    this.document.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);
                }
            } catch (error) {
                console.error('Error initializing PromiseDom:', error);
                reject(error);
            }
        });
    }
}

export default PromiseDom;

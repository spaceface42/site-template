declare class PromiseDom {
    private document;
    ready: Promise<void>;
    /**
     * Initializes PromiseDom instance.
     * @param document The document object to use. Default is window.document.
     */
    constructor(document?: Document);
    /**
     * Initializes the promise that resolves when the DOM is ready.
     * @returns A promise that resolves when the DOM is ready.
     */
    private initPromise;
}
export default PromiseDom;

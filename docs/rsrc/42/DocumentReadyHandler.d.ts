declare class DocumentReadyHandler {
    static readonly VERSION = "1.2.0.fix";
    readonly ready: Promise<void>;
    /**
     * Initializes DocumentReadyHandler instance.
     * @param document The document object to use. Default is window.document.
     */
    constructor(document?: Document);
    /**
     * Initializes the promise that resolves when the DOM is ready.
     * @param document The document object to use.
     * @returns A promise that resolves when the DOM is ready.
     */
    private initPromise;
    /**
     * Checks if the DOM is ready based on the readyState.
     * @param state The current readyState of the document.
     * @returns True if the DOM is ready, false otherwise.
     */
    private isDomReady;
    /**
     * Cleans up event listeners.
     * @param document The document object.
     * @param listener The event listener function to remove.
     */
    private cleanupListeners;
}
export default DocumentReadyHandler;

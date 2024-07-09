declare class DocumentReadyHandler {
    static readonly VERSION = "1.2.2";
    readonly ready: Promise<void>;
    private timeoutId;
    constructor(document?: Document, timeout?: number);
    private initPromise;
    private isDomReady;
    private cleanup;
    cancel(): void;
}
export default DocumentReadyHandler;

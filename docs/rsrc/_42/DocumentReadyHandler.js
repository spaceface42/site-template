class DocumentReadyHandler {
    constructor(document = window.document, timeout = 10000) {
        this.timeoutId = null;
        this.ready = this.initPromise(document, timeout);
    }
    initPromise(document, timeout) {
        return new Promise((resolve, reject) => {
            if (this.isDomReady(document.readyState)) {
                resolve();
            }
            else {
                const onReady = () => {
                    this.cleanup(document, onReady);
                    resolve();
                };
                document.addEventListener('DOMContentLoaded', onReady);
                this.timeoutId = window.setTimeout(() => {
                    this.cleanup(document, onReady);
                    reject(new Error('DOM ready timeout'));
                }, timeout);
            }
        });
    }
    isDomReady(state) {
        return state === 'interactive' || state === 'complete';
    }
    cleanup(document, listener) {
        if (this.timeoutId !== null) {
            window.clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        document.removeEventListener('DOMContentLoaded', listener);
    }
    cancel() {
        if (this.timeoutId !== null) {
            window.clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }
}
DocumentReadyHandler.VERSION = '1.2.2';
export default DocumentReadyHandler;
//# sourceMappingURL=DocumentReadyHandler.js.map
export class FetchError extends Error {
    constructor(message, url) {
        super(message);
        this.url = url;
        this.name = 'FetchError';
    }
}
export class HTTPError extends FetchError {
    constructor(message, url, status) {
        super(message, url);
        this.status = status;
        this.name = 'HTTPError';
    }
}
export class ContentTypeError extends FetchError {
    constructor(message, url, contentType) {
        super(message, url);
        this.contentType = contentType;
        this.name = 'ContentTypeError';
    }
}
//# sourceMappingURL=customErrors.js.map
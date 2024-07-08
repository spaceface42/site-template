class FetchError extends Error {
    constructor(message: string, public readonly url: string) {
        super(message);
        this.name = 'FetchError';
    }
}

class HTTPError extends FetchError {
    constructor(message: string, url: string, public readonly status: number) {
        super(message, url);
        this.name = 'HTTPError';
    }
}

class ContentTypeError extends FetchError {
    constructor(message: string, url: string, public readonly contentType: string | null) {
        super(message, url);
        this.name = 'ContentTypeError';
    }
}
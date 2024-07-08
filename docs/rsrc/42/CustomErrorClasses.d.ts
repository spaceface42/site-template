declare class FetchError extends Error {
    readonly url: string;
    constructor(message: string, url: string);
}
declare class HTTPError extends FetchError {
    readonly status: number;
    constructor(message: string, url: string, status: number);
}
declare class ContentTypeError extends FetchError {
    readonly contentType: string | null;
    constructor(message: string, url: string, contentType: string | null);
}

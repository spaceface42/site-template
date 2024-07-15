/**
 * custom errors v1.0.0
 *
 */
export declare class FetchError extends Error {
    readonly url: string;
    constructor(message: string, url: string);
}
export declare class HTTPError extends FetchError {
    readonly status: number;
    constructor(message: string, url: string, status: number);
}
export declare class ContentTypeError extends FetchError {
    readonly contentType: string | null;
    constructor(message: string, url: string, contentType: string | null);
}

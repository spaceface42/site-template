declare class DocumentReadyHandler {
    static readonly VERSION = "1.2.0";
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
declare class EventEmitter {
    private listeners;
    on(event: string, callback: Function): void;
    emit(event: string, data?: any): void;
}
export default EventEmitter;
/**
 * PartialContentFetcher v1.1.0
 *
 * fetch html partials
 */
declare class PartialContentFetcher {
    static readonly VERSION = "1.1.0";
    private readonly originUrl;
    constructor(baseUrl?: string);
    /**
     * Accept content only if it is text/html or text/plain
     **/
    fetchContent(url: string, options?: RequestInit): Promise<string>;
    isSameOrigin(url: string): boolean;
    private isValidContentType;
}
export default PartialContentFetcher;
/**
 * PartialContentInjector v1.0.2
 *
 * PartialContentInjector class injects partial HTML content into the DOM,
 * maintaining the original sequence of the partials.
 */
import PartialContentFetcher from './PartialContentFetcher.js';
declare class PartialContentInjector {
    static readonly VERSION = "1.0.2";
    private partialContentFetcher;
    private allowedCrossOriginDomains;
    constructor(allowedCrossOriginDomains: string[], baseUrl?: string);
    injectAllPartials(selector?: string): Promise<void>;
    injectSinglePartial(url: string, targetSelector: string): Promise<void>;
    private injectPartial;
    private isAllowedCrossOrigin;
    private insertContent;
}
export default PartialContentInjector;
/**
 * init.ts
 *
 * Initialization script for the application.
 */
import DocumentReadyHandler from '../42/DocumentReadyHandler.js';
import PartialContentInjector from '../42/PartialContentInjector.js';
export declare const APP_VERSION = "1.3.0";
import EventEmitter from '../42/EventEmitter.js';

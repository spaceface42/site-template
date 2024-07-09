/**
 * PartialContentInjector v1.0.2
 * 
 * PartialContentInjector class injects partial HTML content into the DOM,
 * maintaining the original sequence of the partials.
 */
import { FetchError, HTTPError, ContentTypeError } from './customErrors.js';
import PartialContentFetcher from './PartialContentFetcher.js';

class PartialContentInjector {
    static readonly VERSION = '1.1.0.fix';
    private partialContentFetcher: PartialContentFetcher;
    private allowedCrossOriginDomains: string[];
    
    constructor(allowedCrossOriginDomains: string[], baseUrl?: string) {
        if (!allowedCrossOriginDomains || allowedCrossOriginDomains.length === 0) {
            throw new Error('ALLOWED_DOMAINS is undefined or empty. Please configure allowed domains.');
        }

        this.partialContentFetcher = new PartialContentFetcher(baseUrl);
        this.allowedCrossOriginDomains = allowedCrossOriginDomains;
    }
    
    async injectAllPartials(selector: string = 'link[rel="html"]'): Promise<void> {
        const partials = document.querySelectorAll(selector);
        await Promise.all(Array.from(partials).map(async (partial) => {
            const url = partial.getAttribute('href');
            if (!url) {
                throw new Error(`injectAllPartials: No URL provided for element: ${partial.outerHTML}`);
            }
            await this.injectPartial(url, partial);
        }));
    }
    
    async injectSinglePartial(url: string, targetSelector: string): Promise<void> {
        const targetElement = document.querySelector(targetSelector);
        if (!targetElement) {
            throw new Error(`Target element not found for selector: ${targetSelector}`);
        }
        await this.injectPartial(url, targetElement);
    }
    
    private async injectPartial(url: string, element: Element): Promise<void> {
        try {
            let content: string;
            if (this.partialContentFetcher.isSameOrigin(url)) {
                content = await this.partialContentFetcher.fetchContent(url);
            } else if (this.isAllowedCrossOrigin(url)) {
                content = await this.partialContentFetcher.fetchContent(url, {
                    mode: 'cors',
                    credentials: 'omit'
                });
            } else {
                throw new Error(`Cross-origin request not allowed for: ${url}`);
            }
            this.insertContent(content, element);
        } catch (error) {
            console.error(`Error injecting partial from ${url}:`, error instanceof Error ? error.message : String(error));
            throw error;
        }
    }
    
    private isAllowedCrossOrigin(url: string): boolean {
        try {
            const urlObject = new URL(url);
            return this.allowedCrossOriginDomains.includes(urlObject.hostname);
        } catch (error) {
            console.warn(`Invalid URL: ${url}`);
            return false;
        }
    }
    
    private insertContent(content: string, element: Element): void {
        try {
            element.insertAdjacentHTML('beforebegin', content.trim());
            element.remove();
        } catch (error) {
            console.error('insertContent: Error inserting HTML:', error instanceof Error ? error.message : String(error));
            throw error;
        }
    }
}

export default PartialContentInjector;
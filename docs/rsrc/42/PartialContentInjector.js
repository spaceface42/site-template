/**
 * PartialContentInjector v1.0.2
 *
 * PartialContentInjector class injects partial HTML content into the DOM,
 * maintaining the original sequence of the partials.
 */
// import { FetchError, HTTPError, ContentTypeError } from './customErrors.js';
import PartialContentFetcher from './PartialContentFetcher.js';
class PartialContentInjector {
    constructor(allowedCrossOriginDomains, baseUrl) {
        if (!allowedCrossOriginDomains || allowedCrossOriginDomains.length === 0) {
            throw new Error('ALLOWED_DOMAINS is undefined or empty. Please configure allowed domains.');
        }
        this.partialContentFetcher = new PartialContentFetcher(baseUrl);
        this.allowedCrossOriginDomains = allowedCrossOriginDomains;
    }
    async injectAllPartials(selector = 'link[rel="html"]') {
        const partials = document.querySelectorAll(selector);
        await Promise.all(Array.from(partials).map(async (partial) => {
            const url = partial.getAttribute('href');
            if (!url) {
                throw new Error(`injectAllPartials: No URL provided for element: ${partial.outerHTML}`);
            }
            await this.injectPartial(url, partial);
        }));
    }
    async injectAllPartialsOBSOLETE(selector = 'link[rel="html"]') {
        const partials = document.querySelectorAll(selector + ':not([data-partial-loaded])');
        await Promise.all(Array.from(partials).map(async (partial) => {
            const url = partial.getAttribute('href');
            if (!url) {
                throw new Error(`injectAllPartials: No URL provided for element: ${partial.outerHTML}`);
            }
            await this.injectPartial(url, partial);
        }));
    }
    async injectSinglePartial(url, targetSelector) {
        const targetElement = document.querySelector(targetSelector);
        if (!targetElement) {
            throw new Error(`Target element not found for selector: ${targetSelector}`);
        }
        await this.injectPartial(url, targetElement);
    }
    async injectPartial(url, element) {
        try {
            let content;
            if (this.partialContentFetcher.isSameOrigin(url)) {
                content = await this.partialContentFetcher.fetchContent(url);
            }
            else if (this.isAllowedCrossOrigin(url)) {
                content = await this.partialContentFetcher.fetchContent(url, {
                    mode: 'cors',
                    credentials: 'omit'
                });
            }
            else {
                throw new Error(`Cross-origin request not allowed for: ${url}`);
            }
            this.insertContent(content, element);
        }
        catch (error) {
            console.error(`Error injecting partial from ${url}:`, error instanceof Error ? error.message : String(error));
            throw error;
        }
    }
    isAllowedCrossOrigin(url) {
        try {
            const urlObject = new URL(url);
            return this.allowedCrossOriginDomains.includes(urlObject.hostname);
        }
        catch (error) {
            console.warn(`Invalid URL: ${url}`);
            return false;
        }
    }
    insertContent(content, element) {
        try {
            element.insertAdjacentHTML('beforebegin', content.trim());
            element.remove();
        }
        catch (error) {
            console.error('insertContent: Error inserting HTML:', error instanceof Error ? error.message : String(error));
            throw error;
        }
    }
    insertContentXX(content, element) {
        console.log('Attempting to insert content:', content.substring(0, 100) + '...');
        console.log('Target element:', element);
        try {
            element.insertAdjacentHTML('beforebegin', content.trim());
            element.remove();
        }
        catch (error) {
            console.error('insertContent: Error inserting HTML:', error);
            console.error('Element:', element);
            console.error('Content:', content);
            throw error;
        }
    }
    insertContentDebug(content, element) {
        var _a;
        try {
            // Create a new div to hold the content
            const contentContainer = document.createElement('div');
            contentContainer.innerHTML = content.trim();
            // Insert the new content before the link element
            (_a = element.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(contentContainer, element);
            // Optionally, you can hide the original link element
            element.style.display = 'none';
            // Add a data attribute to mark this link as processed
            element.setAttribute('data-partial-loaded', 'true');
        }
        catch (error) {
            console.error('insertContent: Error inserting HTML:', error);
            console.error('Element:', element);
            console.error('Content:', content);
            throw error;
        }
    }
}
PartialContentInjector.VERSION = '1.2.1';
export default PartialContentInjector;
//# sourceMappingURL=PartialContentInjector.js.map
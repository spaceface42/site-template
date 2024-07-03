/**
 * PartialContentInjector v1.0.1
 * 
 * PromiseDom class provides a promise that resolves when the DOM is ready.
 */
import PartialContentFetcher from './PartialContentFetcher.js';

class PartialContentInjector {
    static readonly VERSION = '1.0.1';
    private partialContentFetcher: PartialContentFetcher;
    private allowedCrossOriginDomains: string[];

    constructor(allowedCrossOriginDomains: string[] = ['raw.githubusercontent.com'], baseUrl?: string) {
        console.log('___PartialContentInjector ', PartialContentInjector.VERSION);
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

    private async injectPartial(url: string, element: Element): Promise<void> {
        try {
            if (this.partialContentFetcher.isSameOrigin(url)) {
                await this.injectSameOriginPartial(url, element);
            } else if (this.isAllowedCrossOrigin(url)) {
                await this.injectCrossOriginPartial(url, element);
            } else {
                throw new Error(`Cross-origin request not allowed for: ${url}`);
            }
        } catch (error) {
            console.error(`Error injecting partial from ${url}:`, error instanceof Error ? error.message : String(error));
        }
    }

    private async injectSameOriginPartial(url: string, element: Element): Promise<void> {
        const content = await this.partialContentFetcher.fetchContent(url);
        this.insertContent(content, element);
    }

    private async injectCrossOriginPartial(url: string, element: Element): Promise<void> {
        // You might want to add additional security measures here
        // For example, adding specific headers for cross-origin requests
        const content = await this.partialContentFetcher.fetchContent(url, {
            mode: 'cors',
            credentials: 'omit'
        });
        this.insertContent(content, element);
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
        }
    }
}

export default PartialContentInjector;
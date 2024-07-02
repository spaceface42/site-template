// PartialContentInjector.ts
import FetchPartial from './FetchPartial.js';

class PartialContentInjector {
    private fetchPartial: FetchPartial;
    private allowedCrossOriginDomains: string[];

    constructor(allowedCrossOriginDomains: string[] = ['raw.githubusercontent.com']) {
        this.fetchPartial = new FetchPartial();
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
            if (this.fetchPartial.isSameOrigin(url)) {
                await this.injectSameOriginPartial(url, element);
                return; // Return early after handling same-origin case
            }
        
            if (this.isAllowedCrossOrigin(url)) {
                await this.injectCrossOriginPartial(url, element);
                return; // Return early after handling allowed cross-origin case
            }
        
            // If neither condition is met, throw an error
            throw new Error(`Cross-origin request not allowed for: ${url}`);
        } catch (error) {
            console.error(`Error injecting partial from ${url}:`, error);
        }
        
    }

    private async injectSameOriginPartial(url: string, element: Element): Promise<void> {
        const content = await this.fetchPartial.fetchContent(url);
        this.insertContent(content, element);
    }

    private async injectCrossOriginPartial(url: string, element: Element): Promise<void> {
        const content = await this.fetchPartial.fetchContent(url);
        // You might want to add additional security measures here
        // For example, sanitizing the content before inserting it
        this.insertContent(content, element);
    }

    private isAllowedCrossOrigin(url: string): boolean {
        const urlObject = new URL(url);
        return this.allowedCrossOriginDomains.includes(urlObject.hostname);
    }


    private insertContentX(content: string, element: Element): void {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content.trim();
        
        while (tempDiv.firstChild) {
            element.parentNode?.insertBefore(tempDiv.firstChild, element);
        }
        element.remove();
    }

    /**
     * Inserts the response HTML into the provided element using insertAdjacentHTML.
     * @param response The response HTML.
     * @param element The element to update with the response HTML.
     */
    private insertContent(response: string, element: Element): void {
        try {
            element.insertAdjacentHTML('beforebegin', response.trim());
            element.remove();
        } catch (error) {
            console.error('insertPartial: Error inserting HTML:', error);
        }
    }





}

export default PartialContentInjector;
/**
 * FetchPartial v1.4.1
 * 
 * The FetchPartial class provides methods to fetch and process partial HTML content.
 * This class can fetch content from URLs and update the DOM elements with the fetched content.
 * It includes methods for fetching a single partial, fetching all partials matching a selector,
 * and handling the fetched content appropriately based on its origin.
 */
class FetchPartial {
    private readonly defaultSelector: string;

    /**
     * Initializes a new instance of the FetchPartial class.
     * @param defaultSelector - The default CSS selector used to find elements with partial HTML content. Defaults to 'link[rel="html"]'.
     */
    constructor(defaultSelector: string = 'link[rel="html"]') {
        this.defaultSelector = defaultSelector;
    }

    /**
     * Fetches a single partial HTML content and updates the provided element with the response.
     * @param url The URL of the partial HTML content.
     * @param element The element to update with the fetched content.
     */
    async fetchPartial(url?: string, element?: Element): Promise<void> {
        if (!element) {
            console.error('fetchPartial: No element provided');
            return;
        }

        try {
            url = this.getUrl(url, element);
            if (!url) {
                console.error(`fetchPartial: No URL provided for element:`, element);
                return;
            }
            await this.fetchAndProcessPartial(url, element);
        } catch (error) {
            console.error(`fetchPartial: Error fetching partial for element:`, element, error);
        }
    }

    /**
     * Fetches all partial HTML content matching the provided selector and updates each element with the response.
     * @param selector The CSS selector to query for partial HTML content elements.
     */
    async fetchAllPartials(selector: string = this.defaultSelector): Promise<void> {
        try {
            const partials = document.querySelectorAll(selector);

            await Promise.allSettled(Array.from(partials).map(async (partial) => {
                const url = this.getUrl(undefined, partial);
                if (!url) {
                    console.error('fetchPartials: No URL provided for element:', partial);
                    return;
                }
                await this.fetchAndProcessPartial(url, partial);
            }));
        } catch (error) {
            console.error('fetchPartials: Error fetching all partials:', error);
        }
    }

    /**
     * Extracts URL from the provided argument or element's attribute.
     * @param url The URL passed as argument.
     * @param element The element from which to extract the URL.
     * @returns The extracted URL or undefined.
     */
    private getUrl(url?: string, element?: Element): string | undefined {
        return url ?? element?.getAttribute('href') ?? undefined;
    }

    /**
     * Makes a fetch request to the provided URL and returns the response text.
     * @param url The URL to fetch.
     * @returns A promise that resolves with the response text.
     */
    private async makeFetchRequest(url: string): Promise<string> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`makeFetchRequest: Failed to fetch partial from ${url} - ${response.statusText}`);
        }
        return response.text();
    }

    /**
     * Checks if the given URL is of the same origin as the current document.
     * @param url The URL to check.
     * @returns True if the URL is same-origin, false otherwise.
     */
    private isSameOrigin(url: string): boolean {
        const locationOrigin = window.location.origin;
        const urlOrigin = new URL(url, locationOrigin).origin;
        return locationOrigin === urlOrigin;
    }

    /**
     * Processes the fetched response and updates the provided element with the response HTML.
     * @param response The response HTML.
     * @param element The element to update with the response HTML.
     * @param url The URL from which the content was fetched.
     */
    private async processFetchedContent(response: string, element: Element, url: string): Promise<void> {
        try {
            if (this.isSameOrigin(url)) {
                this.insertPartial(response, element);
            } else {
                this.processPartial(response, element);
            }
        } catch (error) {
            console.error('processFetchedContent: Error inserting fetched content:', error);
        }
    }

    /**
     * Inserts the response HTML into the provided element using insertAdjacentHTML.
     * @param response The response HTML.
     * @param element The element to update with the response HTML.
     */
    private insertPartial(response: string, element: Element): void {
        try {
            element.insertAdjacentHTML('beforebegin', response.trim());
            element.remove();
        } catch (error) {
            console.error('insertPartial: Error inserting HTML:', error);
        }
    }

    /**
     * Processes the response HTML using a template element and updates the provided element.
     * @param response The response HTML.
     * @param element The element to update with the response HTML.
     */
    private processPartial(response: string, element: Element): void {
        try {
            const template = document.createElement('template');
            template.innerHTML = response.trim();
            const htmlPartial = template.content.cloneNode(true) as DocumentFragment;
            if (htmlPartial && htmlPartial.childElementCount > 0) {
                element.replaceWith(htmlPartial);
            } else {
                console.error('processPartial: Fetched content is empty or invalid for element:', element);
            }
        } catch (error) {
            console.error('processPartial: Error processing HTML:', error);
        }
    }

    /**
     * Fetches partial HTML content from the provided URL and updates the provided element with the response.
     * @param url The URL of the partial HTML content.
     * @param element The element to update with the fetched content.
     */
    private async fetchAndProcessPartial(url: string, element: Element): Promise<void> {
        try {
            const response = await this.makeFetchRequest(url);
            await this.processFetchedContent(response, element, url);
        } catch (error) {
            console.error(`fetchAndProcessPartial: Error fetching partial for element:`, element, error);
        }
    }
}

export default FetchPartial;

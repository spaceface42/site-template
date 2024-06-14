/**
 * FetchPartial v1.1.0
 * 
 * FetchPartial class provides methods to fetch and process partial HTML content.
 */
class FetchPartial {
    private readonly defaultSelector: string;

    constructor(defaultSelector: string = 'link[rel="html"]') {
        this.defaultSelector = defaultSelector;
    }

    /**
     * Fetches a single partial HTML content and updates the provided element with the response.
     * @param url The URL of the partial HTML content.
     * @param element The element to update with the fetched content.
     */
    async fetchOne(url?: string, element?: Element): Promise<void> {
        if (!element) {
            console.error('fetchOne: No element provided');
            return;
        }

        try {
            url = this.getUrl(url, element);
            if (!url) {
                console.error(`fetchOne: No URL provided for element:`, element);
                return;
            }
            await this.fetch(url, element);
        } catch (error) {
            console.error(`fetchOne: Error fetching partial for element:`, element, error);
        }
    }

    /**
     * Fetches all partial HTML content matching the provided selector and updates each element with the response.
     * @param selector The CSS selector to query for partial HTML content elements.
     */
    async fetchAll(selector: string = this.defaultSelector): Promise<void> {
        try {
            const partials = document.querySelectorAll(selector);

            await Promise.allSettled(Array.from(partials).map(async (partial) => {
                const url = this.getUrl(undefined, partial);
                if (!url) {
                    console.error('fetchAll: No URL provided for element:', partial);
                    return;
                }
                await this.fetch(url, partial);
            }));
        } catch (error) {
            console.error('fetchAll: Error fetching all partials:', error);
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
    private async makeRequest(url: string): Promise<string> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`makeRequest: Failed to fetch partial from ${url} - ${response.statusText}`);
        }
        return response.text();
    }

    /**
     * Processes the fetched response and updates the provided element with the response HTML.
     * @param response The response HTML.
     * @param element The element to update with the response HTML.
     */
    private async processRequest(response: string, element: Element): Promise<void> {
        const template = document.createElement('template');
        template.innerHTML = response.trim();
        const htmlPartial = template.content.cloneNode(true) as DocumentFragment;
        if (htmlPartial && htmlPartial.childElementCount > 0) {
            element.replaceWith(htmlPartial);
        } else {
            console.error('processRequest: Fetched content is empty or invalid for element:', element);
        }
    }

    /**
     * Fetches partial HTML content from the provided URL and updates the provided element with the response.
     * @param url The URL of the partial HTML content.
     * @param element The element to update with the fetched content.
     */
    private async fetch(url: string, element: Element): Promise<void> {
        try {
            const response = await this.makeRequest(url);
            await this.processRequest(response, element);
        } catch (error) {
            console.error(`fetch: Error fetching partial for element:`, element, error);
        }
    }
}

export default FetchPartial;

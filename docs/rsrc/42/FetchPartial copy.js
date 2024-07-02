/**
 * FetchPartial v1.5.0
 *
 * The FetchPartial class provides methods to fetch and process partial HTML content.
 * This class can fetch content from URLs and update the DOM elements with the fetched content.
 */
class FetchPartial {
    /**
     * Initializes a new instance of the FetchPartial class.
     */
    constructor() {
        this.originUrl = new URL(window.location.href);
    }
    /**
     * Fetches a single partial HTML content and updates the provided element with the response.
     * @param url The URL of the partial HTML content.
     * @param element The element to update with the fetched content.
     * @throws Error if no URL or element is provided, or if fetching fails.
     */
    async fetchPartial(url, element) {
        if (!url) {
            throw new Error('fetchPartial: No URL provided');
        }
        if (!element) {
            throw new Error('fetchPartial: No element provided');
        }
        await this.fetchAndProcessPartial(url, element);
    }
    /**
     * Fetches all partial HTML content matching the provided selector and updates each element with the response.
     * @param selector The CSS selector to query for partial HTML content elements.
     * @throws Error if fetching any partial fails.
     */
    async fetchAllPartials(selector = 'link[rel="html"]') {
        const partials = document.querySelectorAll(selector);
        const results = await Promise.all(Array.from(partials).map(async (partial) => {
            const url = this.getUrl(partial);
            if (!url) {
                throw new Error(`fetchAllPartials: No URL provided for element: ${partial.outerHTML}`);
            }
            return this.fetchAndProcessPartial(url, partial);
        }));
        // Check if any of the fetches failed
        const errors = results.filter(result => result instanceof Error);
        if (errors.length > 0) {
            throw new Error(`fetchAllPartials: ${errors.length} partials failed to load`);
        }
    }
    /**
     * Extracts URL from the element's attribute.
     * @param element The element from which to extract the URL.
     * @returns The extracted URL or undefined.
     */
    getUrl(element) {
        var _a;
        return (_a = element.getAttribute('href')) !== null && _a !== void 0 ? _a : undefined;
    }
    /**
     * Makes a fetch request to the provided URL and returns the response text.
     * @param url The URL to fetch.
     * @returns A promise that resolves with the response text.
     * @throws Error if the fetch request fails.
     */
    async makeFetchRequest(url) {
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
    isSameOrigin(url) {
        const urlOrigin = new URL(url, this.originUrl).origin;
        return this.originUrl.origin === urlOrigin;
    }
    /**
     * Processes the fetched response and updates the provided element with the response HTML.
     * @param response The response HTML.
     * @param element The element to update with the response HTML.
     * @param url The URL from which the content was fetched.
     */
    processFetchedContent(response, element, url) {
        if (this.isSameOrigin(url)) {
            this.insertPartial(response, element);
        }
        else {
            this.processPartial(response, element);
        }
    }
    /**
     * Inserts the response HTML into the provided element using insertAdjacentHTML.
     * @param response The response HTML.
     * @param element The element to update with the response HTML.
     */
    insertPartial(response, element) {
        element.insertAdjacentHTML('beforebegin', response.trim());
        element.remove();
    }
    /**
     * Processes the response HTML using a template element and updates the provided element.
     * @param response The response HTML.
     * @param element The element to update with the response HTML.
     */
    processPartial(response, element) {
        const template = document.createElement('template');
        template.innerHTML = response.trim();
        const htmlPartial = template.content.cloneNode(true);
        if (htmlPartial && htmlPartial.childElementCount > 0) {
            element.replaceWith(htmlPartial);
        }
        else {
            throw new Error(`processPartial: Fetched content is empty or invalid for element: ${element.outerHTML}`);
        }
    }
    /**
     * Fetches partial HTML content from the provided URL and updates the provided element with the response.
     * @param url The URL of the partial HTML content.
     * @param element The element to update with the fetched content.
     * @throws Error if fetching or processing fails.
     */
    async fetchAndProcessPartial(url, element) {
        try {
            const response = await this.makeFetchRequest(url);
            this.processFetchedContent(response, element, url);
        }
        catch (error) {
            return error instanceof Error ? error : new Error(String(error));
        }
    }
}
export default FetchPartial;
//# sourceMappingURL=FetchPartial%20copy.js.map
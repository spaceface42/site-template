/**
 * FetchPartial v1.4.2
 *
 * The FetchPartial class provides methods to fetch and process partial HTML content.
 * This class can fetch content from URLs and update the DOM elements with the fetched content.
 * It includes methods for fetching a single partial, fetching all partials matching a selector,
 * and handling the fetched content appropriately based on its origin.
 */
declare class FetchPartial {
    private readonly defaultSelector;
    /**
     * Initializes a new instance of the FetchPartial class.
     * @param defaultSelector - The default CSS selector used to find elements with partial HTML content. Defaults to 'link[rel="html"]'.
     */
    constructor(defaultSelector?: string);
    /**
     * Fetches a single partial HTML content and updates the provided element with the response.
     * @param url The URL of the partial HTML content.
     * @param element The element to update with the fetched content.
     */
    fetchPartial(url?: string, element?: Element): Promise<void>;
    /**
     * Fetches all partial HTML content matching the provided selector and updates each element with the response.
     * @param selector The CSS selector to query for partial HTML content elements.
     */
    fetchAllPartials(selector?: string): Promise<void>;
    /**
     * Extracts URL from the provided argument or element's attribute.
     * @param url The URL passed as argument.
     * @param element The element from which to extract the URL.
     * @returns The extracted URL or undefined.
     */
    private getUrl;
    /**
     * Makes a fetch request to the provided URL and returns the response text.
     * @param url The URL to fetch.
     * @returns A promise that resolves with the response text.
     */
    private makeFetchRequest;
    /**
     * Checks if the given URL is of the same origin as the current document.
     * @param url The URL to check.
     * @returns True if the URL is same-origin, false otherwise.
     */
    private isSameOrigin;
    /**
     * Processes the fetched response and updates the provided element with the response HTML.
     * @param response The response HTML.
     * @param element The element to update with the response HTML.
     * @param url The URL from which the content was fetched.
     */
    private processFetchedContent;
    /**
     * Inserts the response HTML into the provided element using insertAdjacentHTML.
     * @param response The response HTML.
     * @param element The element to update with the response HTML.
     */
    private insertPartial;
    /**
     * Processes the response HTML using a template element and updates the provided element.
     * @param response The response HTML.
     * @param element The element to update with the response HTML.
     */
    private processPartial;
    /**
     * Fetches partial HTML content from the provided URL and updates the provided element with the response.
     * @param url The URL of the partial HTML content.
     * @param element The element to update with the fetched content.
     */
    private fetchAndProcessPartial;
}
export default FetchPartial;

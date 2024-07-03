declare class FetchPartial {
    private readonly originUrl;
    constructor();
    /**
     * Fetches content from a given URL.
     * @param url The URL to fetch content from.
     * @returns A promise that resolves with the fetched content.
     * @throws Error if the fetch request fails.
     */
    fetchContent(url: string): Promise<string>;
    /**
     * Checks if the given URL is of the same origin as the current document.
     * @param url The URL to check.
     * @returns True if the URL is same-origin, false otherwise.
     */
    isSameOrigin(url: string): boolean;
}

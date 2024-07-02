"use strict";
class FetchPartial {
    constructor() {
        this.originUrl = new URL(window.location.href);
    }
    /**
     * Fetches content from a given URL.
     * @param url The URL to fetch content from.
     * @returns A promise that resolves with the fetched content.
     * @throws Error if the fetch request fails.
     */
    async fetchContent(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch content from ${url} - ${response.statusText}`);
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
}
//# sourceMappingURL=FetchPartialTwo.js.map
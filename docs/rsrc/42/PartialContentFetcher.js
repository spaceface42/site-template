/**
 * PartialContentFetcher
 *
 * fetch html partials
 */
class PartialContentFetcher {
    constructor(baseUrl = window.location.href) {
        console.log('___PartialContentFetcher ', PartialContentFetcher.VERSION);
        this.originUrl = new URL(baseUrl);
    }
    /**
     * Accept content only if it is text/html or text/plain
     **/
    async fetchContent(url, options = {}) {
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    'Accept': 'text/html, text/plain'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const contentType = response.headers.get('Content-Type');
            if (!contentType) {
                console.warn(`No Content-Type header received from ${url}`);
            }
            else if (!this.isValidContentType(contentType)) {
                console.warn(`Unexpected Content-Type received from ${url}: ${contentType}`);
            }
            return await response.text();
        }
        catch (error) {
            throw new Error(`Failed to fetch content from ${url}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    isSameOrigin(url) {
        try {
            const urlOrigin = new URL(url, this.originUrl).origin;
            return this.originUrl.origin === urlOrigin;
        }
        catch (error) {
            console.warn(`Invalid URL: ${url}`);
            return false;
        }
    }
    isValidContentType(contentType) {
        const validTypes = ['text/html', 'text/plain'];
        return validTypes.some(type => contentType.includes(type));
    }
}
PartialContentFetcher.VERSION = '1.1.0';
export default PartialContentFetcher;
//# sourceMappingURL=PartialContentFetcher.js.map
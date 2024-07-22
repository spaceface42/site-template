/**
 * PartialContentFetcher v1.2.1
 *
 * fetch html partials
 */
class PartialContentFetcher {
    constructor(baseUrl = window.location.href) {
        this.originUrl = new URL(baseUrl);
    }
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
                throw new Error('No Content-Type header received');
            }
            else if (!this.isValidContentType(contentType)) {
                throw new Error(`Unexpected Content-Type received: ${contentType}`);
            }
            return await response.text();
        }
        catch (error) {
            throw new Error(`Failed to fetch content: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
PartialContentFetcher.VERSION = '1.2.1';
export default PartialContentFetcher;
//# sourceMappingURL=PartialContentFetcher.js.map
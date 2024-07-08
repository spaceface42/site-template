/**
 * PartialContentFetcher v1.1.0
 *
 * fetch html partials
 */
import { FetchError, HTTPError, ContentTypeError } from './customErrors.js';
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
                throw new HTTPError(`HTTP error! status: ${response.status}`, url, response.status);
            }
            const contentType = response.headers.get('Content-Type');
            if (!contentType) {
                throw new ContentTypeError('No Content-Type header received', url, null);
            }
            else if (!this.isValidContentType(contentType)) {
                throw new ContentTypeError(`Unexpected Content-Type received: ${contentType}`, url, contentType);
            }
            return await response.text();
        }
        catch (error) {
            if (error instanceof FetchError) {
                throw error;
            }
            throw new FetchError(`Failed to fetch content: ${error instanceof Error ? error.message : 'Unknown error'}`, url);
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
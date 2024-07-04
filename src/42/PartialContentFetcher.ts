/**
 * PartialContentFetcher v1.1.0
 * 
 * fetch html partials
 */
class PartialContentFetcher {
    static readonly VERSION = '1.1.0';
    private readonly originUrl: URL;
    
    constructor(baseUrl: string = window.location.href) {
        this.originUrl = new URL(baseUrl);
    }
    
    /**
     * Accept content only if it is text/html or text/plain
     **/
    async fetchContent(url: string, options: RequestInit = {}): Promise<string> {
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
            } else if (!this.isValidContentType(contentType)) {
                console.warn(`Unexpected Content-Type received from ${url}: ${contentType}`);
            }
            
            return await response.text();
        } catch (error) {
            throw new Error(`Failed to fetch content from ${url}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    
    isSameOrigin(url: string): boolean {
        try {
            const urlOrigin = new URL(url, this.originUrl).origin;
            return this.originUrl.origin === urlOrigin;
        } catch (error) {
            console.warn(`Invalid URL: ${url}`);
            return false;
        }
    }
    
    private isValidContentType(contentType: string): boolean {
        const validTypes = ['text/html', 'text/plain'];
        return validTypes.some(type => contentType.includes(type));
    }
}

export default PartialContentFetcher;
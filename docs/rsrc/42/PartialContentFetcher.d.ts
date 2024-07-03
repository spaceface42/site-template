/**
 * PartialContentFetcher
 *
 * fetch html partials
 */
declare class PartialContentFetcher {
    static readonly VERSION = "1.1.0";
    private readonly originUrl;
    constructor(baseUrl?: string);
    /**
     * Accept content only if it is text/html or text/plain
     **/
    fetchContent(url: string, options?: RequestInit): Promise<string>;
    isSameOrigin(url: string): boolean;
    private isValidContentType;
}
export default PartialContentFetcher;

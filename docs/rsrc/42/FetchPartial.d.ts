/**
 * FetchPartial
 *
 * fetch html partials
 */
declare class FetchPartial {
    private readonly originUrl;
    readonly VERSION = "2.0.0";
    constructor(baseUrl?: string);
    /**
     * Accept content only if it is text/html or text/plain
     **/
    fetchContent(url: string, options?: RequestInit): Promise<string>;
    isSameOrigin(url: string): boolean;
    private isValidContentType;
}
export default FetchPartial;

declare class PartialContentFetcher {
    static readonly VERSION = "1.1.0";
    private readonly originUrl;
    constructor(baseUrl?: string);
    fetchContent(url: string, options?: RequestInit): Promise<string>;
    isSameOrigin(url: string): boolean;
    private isValidContentType;
}
export default PartialContentFetcher;

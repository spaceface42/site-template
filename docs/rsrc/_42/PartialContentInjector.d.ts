declare class PartialContentInjector {
    static readonly VERSION = "1.2.1";
    private partialContentFetcher;
    private allowedCrossOriginDomains;
    constructor(allowedCrossOriginDomains: string[], baseUrl?: string);
    injectSinglePartial(url: string, targetSelector: string): Promise<void>;
    private injectPartialX;
    private isAllowedCrossOrigin;
    private insertContentX;
    private insertContentXX;
    private insertContent;
}
export default PartialContentInjector;

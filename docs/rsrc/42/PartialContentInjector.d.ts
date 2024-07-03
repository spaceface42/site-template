declare class PartialContentInjector {
    static readonly VERSION = "1.0.2";
    private partialContentFetcher;
    private allowedCrossOriginDomains;
    constructor(allowedCrossOriginDomains?: string[], baseUrl?: string);
    injectAllPartials(selector?: string): Promise<void>;
    injectSinglePartial(url: string, targetSelector: string): Promise<void>;
    private injectPartial;
    private isAllowedCrossOrigin;
    private insertContent;
}
export default PartialContentInjector;

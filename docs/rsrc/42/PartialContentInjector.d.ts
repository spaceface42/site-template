declare class PartialContentInjector {
    static readonly VERSION = "1.0.1";
    private partialContentFetcher;
    private allowedCrossOriginDomains;
    constructor(allowedCrossOriginDomains?: string[], baseUrl?: string);
    injectAllPartials(selector?: string): Promise<void>;
    private injectPartial;
    private injectSameOriginPartial;
    private injectCrossOriginPartial;
    private isAllowedCrossOrigin;
    private insertContent;
}
export default PartialContentInjector;

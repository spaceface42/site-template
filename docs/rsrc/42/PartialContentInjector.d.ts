declare class PartialContentInjector {
    private partialContentFetcher;
    private allowedCrossOriginDomains;
    readonly VERSION = "1.0.1";
    constructor(allowedCrossOriginDomains?: string[], baseUrl?: string);
    injectAllPartials(selector?: string): Promise<void>;
    private injectPartial;
    private injectSameOriginPartial;
    private injectCrossOriginPartial;
    private isAllowedCrossOrigin;
    private insertContent;
}
export default PartialContentInjector;

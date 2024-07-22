declare class PartialContentInjector {
    static readonly VERSION = "1.2.1";
    private partialContentFetcher;
    private allowedCrossOriginDomains;
    constructor(allowedCrossOriginDomains: string[], baseUrl?: string);
    injectAllPartials(selector?: string): Promise<void>;
    injectAllPartialsOBSOLETE(selector?: string): Promise<void>;
    injectSinglePartial(url: string, targetSelector: string): Promise<void>;
    private injectPartial;
    private isAllowedCrossOrigin;
    private insertContent;
    private insertContentXX;
    private insertContentDebug;
}
export default PartialContentInjector;

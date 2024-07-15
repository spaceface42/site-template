declare class PartialContentInjector {
    static readonly VERSION = "1.2.1";
    private partialContentFetcher;
    private allowedCrossOriginDomains;
    constructor(allowedCrossOriginDomains: string[], baseUrl?: string);
    injectAllPartialsOLD(selector?: string): Promise<void>;
    injectAllPartials(selector?: string): Promise<void>;
    injectSinglePartial(url: string, targetSelector: string): Promise<void>;
    private injectPartial;
    private isAllowedCrossOrigin;
    private insertContentX;
    private insertContentXX;
    private insertContent;
}
export default PartialContentInjector;

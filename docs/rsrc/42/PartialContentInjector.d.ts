declare class PartialContentInjector {
    private fetchPartial;
    private allowedCrossOriginDomains;
    constructor(allowedCrossOriginDomains?: string[]);
    injectAllPartials(selector?: string): Promise<void>;
    private injectPartial;
    private injectSameOriginPartial;
    private injectCrossOriginPartial;
    private isAllowedCrossOrigin;
    private insertContent;
}
export default PartialContentInjector;

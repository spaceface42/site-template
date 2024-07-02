declare class PartialContentInjector {
    private fetchPartial;
    private allowedCrossOriginDomains;
    constructor(allowedCrossOriginDomains?: string[]);
    injectAllPartials(selector?: string): Promise<void>;
    private injectPartial;
    private injectSameOriginPartial;
    private injectCrossOriginPartial;
    private isAllowedCrossOrigin;
    private insertContentX;
    /**
     * Inserts the response HTML into the provided element using insertAdjacentHTML.
     * @param response The response HTML.
     * @param element The element to update with the response HTML.
     */
    private insertContent;
}
export default PartialContentInjector;

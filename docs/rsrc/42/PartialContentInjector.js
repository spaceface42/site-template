// PartialContentInjector.ts
import FetchPartial from './FetchPartial.js';
class PartialContentInjector {
    constructor(allowedCrossOriginDomains = ['raw.githubusercontent.com']) {
        this.fetchPartial = new FetchPartial();
        this.allowedCrossOriginDomains = allowedCrossOriginDomains;
    }
    async injectAllPartials(selector = 'link[rel="html"]') {
        const partials = document.querySelectorAll(selector);
        await Promise.all(Array.from(partials).map(async (partial) => {
            const url = partial.getAttribute('href');
            if (!url) {
                throw new Error(`injectAllPartials: No URL provided for element: ${partial.outerHTML}`);
            }
            await this.injectPartial(url, partial);
        }));
    }
    async injectPartial(url, element) {
        try {
            if (this.fetchPartial.isSameOrigin(url)) {
                await this.injectSameOriginPartial(url, element);
            }
            else if (this.isAllowedCrossOrigin(url)) {
                await this.injectCrossOriginPartial(url, element);
            }
            else {
                throw new Error(`Cross-origin request not allowed for: ${url}`);
            }
        }
        catch (error) {
            console.error(`Error injecting partial from ${url}:`, error);
        }
    }
    async injectSameOriginPartial(url, element) {
        const content = await this.fetchPartial.fetchContent(url);
        this.insertContent(content, element);
    }
    async injectCrossOriginPartial(url, element) {
        const content = await this.fetchPartial.fetchContent(url);
        // You might want to add additional security measures here
        // For example, sanitizing the content before inserting it
        this.insertContent(content, element);
    }
    isAllowedCrossOrigin(url) {
        const urlObject = new URL(url);
        return this.allowedCrossOriginDomains.includes(urlObject.hostname);
    }
    insertContent(content, element) {
        var _a;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content.trim();
        while (tempDiv.firstChild) {
            (_a = element.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(tempDiv.firstChild, element);
        }
        element.remove();
    }
}
export default PartialContentInjector;
//# sourceMappingURL=PartialContentInjector.js.map
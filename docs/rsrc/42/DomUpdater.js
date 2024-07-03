import FetchPartial from './FetchPartial.js';
// DOMUpdater.ts
class DomUpdater {
    constructor() {
        this.fetchPartial = new FetchPartial();
    }
    async updateAllPartials(selector = 'link[rel="html"]') {
        const partials = document.querySelectorAll(selector);
        await Promise.all(Array.from(partials).map(async (partial) => {
            const url = partial.getAttribute('href');
            if (!url) {
                throw new Error(`updateAllPartials: No URL provided for element: ${partial.outerHTML}`);
            }
            await this.updatePartial(url, partial);
        }));
    }
    async updatePartial(url, element) {
        try {
            const content = await this.fetchPartial.fetchContent(url);
            this.insertContent(content, element);
        }
        catch (error) {
            console.error(`Error updating partial from ${url}:`, error);
        }
    }
    insertContent(content, element) {
        var _a;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content.trim();
        // Replace the original element with the new content
        while (tempDiv.firstChild) {
            (_a = element.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(tempDiv.firstChild, element);
        }
        element.remove();
    }
}
// export { FetchPartial, DOMUpdater };
export default DomUpdater;
//# sourceMappingURL=DomUpdater.js.map
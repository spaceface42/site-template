class FetchPartial {
    constructor() {
        this.originUrl = new URL(window.location.href);
    }
    async fetchContent(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch content from ${url} - ${response.statusText}`);
        }
        return response.text();
    }
    isSameOrigin(url) {
        const urlOrigin = new URL(url, this.originUrl).origin;
        return this.originUrl.origin === urlOrigin;
    }
}
export default FetchPartial;
//# sourceMappingURL=FetchPartial.js.map
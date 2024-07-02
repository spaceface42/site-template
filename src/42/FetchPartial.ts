class FetchPartial {
    private readonly originUrl: URL;

    constructor() {
        this.originUrl = new URL(window.location.href);
    }

    async fetchContent(url: string): Promise<string> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch content from ${url} - ${response.statusText}`);
        }
        return response.text();
    }

    isSameOrigin(url: string): boolean {
        const urlOrigin = new URL(url, this.originUrl).origin;
        return this.originUrl.origin === urlOrigin;
    }
}

export default FetchPartial;
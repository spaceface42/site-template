declare class FetchPartial {
    private readonly originUrl;
    constructor();
    fetchContent(url: string): Promise<string>;
    isSameOrigin(url: string): boolean;
}
export default FetchPartial;

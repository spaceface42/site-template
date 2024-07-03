declare class DomUpdater {
    private fetchPartial;
    constructor();
    updateAllPartials(selector?: string): Promise<void>;
    private updatePartial;
    private insertContent;
}
export default DomUpdater;

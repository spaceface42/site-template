declare class SimpleRouter {
    private fetchPartial;
    private readonly mainElement;
    /**
     * Initializes a new instance of the SimpleRouter class.
     * @param mainElementSelector - The CSS selector for the main content area.
     * @param defaultSelector - The default CSS selector used to find elements with partial HTML content. Defaults to 'link[rel="html"]'.
     */
    constructor(mainElementSelector: string, defaultSelector?: string);
    /**
     * Sets up event listeners for link clicks and popstate events.
     */
    private setupEventListeners;
    /**
     * Handles link click events to implement navigation.
     * @param event - The click event.
     */
    private handleLinkClick;
    /**
     * Handles popstate events to handle browser navigation.
     */
    private handlePopState;
    /**
     * Loads content for the given URL and updates the main content area.
     * @param url - The URL of the partial HTML content.
     */
    private loadContent;
}
export default SimpleRouter;

/**
 *
 *
 *
 */
import FetchPartial from './FetchPartial.js';
class SimpleRouter {
    /**
     * Initializes a new instance of the SimpleRouter class.
     * @param mainElementSelector - The CSS selector for the main content area.
     * @param defaultSelector - The default CSS selector used to find elements with partial HTML content. Defaults to 'link[rel="html"]'.
     */
    constructor(mainElementSelector, defaultSelector = 'link[rel="html"]') {
        this.fetchPartial = new FetchPartial(defaultSelector);
        const element = document.querySelector(mainElementSelector);
        if (!element) {
            throw new Error(`SimpleRouter: No element found with selector "${mainElementSelector}"`);
        }
        this.mainElement = element;
        this.setupEventListeners();
    }
    /**
     * Sets up event listeners for link clicks and popstate events.
     */
    setupEventListeners() {
        document.addEventListener('click', (event) => this.handleLinkClick(event));
        window.addEventListener('popstate', () => this.handlePopState());
    }
    /**
     * Handles link click events to implement navigation.
     * @param event - The click event.
     */
    async handleLinkClick(event) {
        const target = event.target.closest('a[href]');
        if (!target || !target.href)
            return;
        const url = target.href;
        event.preventDefault();
        history.pushState(null, '', url);
        await this.loadContent(url);
    }
    /**
     * Handles popstate events to handle browser navigation.
     */
    async handlePopState() {
        await this.loadContent(window.location.href);
    }
    /**
     * Loads content for the given URL and updates the main content area.
     * @param url - The URL of the partial HTML content.
     */
    async loadContent(url) {
        try {
            await this.fetchPartial.fetchPartial(url, this.mainElement);
        }
        catch (error) {
            console.error('SimpleRouter: Error loading content for URL:', url, error);
        }
    }
}
export default SimpleRouter;
//# sourceMappingURL=SimpleRouter.js.map
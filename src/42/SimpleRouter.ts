/**
 *  
 * 
 * 
 */
import FetchPartial from './FetchPartial.js';
import PromiseDom from './PromiseDom.js';

class SimpleRouter {
    private fetchPartial: FetchPartial;
    private readonly mainElement: HTMLElement;

    /**
     * Initializes a new instance of the SimpleRouter class.
     * @param mainElementSelector - The CSS selector for the main content area.
     * @param defaultSelector - The default CSS selector used to find elements with partial HTML content. Defaults to 'link[rel="html"]'.
     */
    constructor(mainElementSelector: string, defaultSelector: string = 'link[rel="html"]') {
        this.fetchPartial = new FetchPartial(defaultSelector);
        const element = document.querySelector(mainElementSelector);

        if (!element) {
            throw new Error(`SimpleRouter: No element found with selector "${mainElementSelector}"`);
        }

        this.mainElement = element as HTMLElement;
        this.setupEventListeners();
    }

    /**
     * Sets up event listeners for link clicks and popstate events.
     */
    private setupEventListeners(): void {
        document.addEventListener('click', (event: MouseEvent) => this.handleLinkClick(event));
        window.addEventListener('popstate', () => this.handlePopState());
    }

    /**
     * Handles link click events to implement navigation.
     * @param event - The click event.
     */
    private async handleLinkClick(event: MouseEvent): Promise<void> {
        const target = (event.target as HTMLElement).closest('a[href]') as HTMLAnchorElement;
        if (!target || !target.href) return;

        const url = target.href;
        event.preventDefault();
        history.pushState(null, '', url);
        await this.loadContent(url);
    }

    /**
     * Handles popstate events to handle browser navigation.
     */
    private async handlePopState(): Promise<void> {
        await this.loadContent(window.location.href);
    }

    /**
     * Loads content for the given URL and updates the main content area.
     * @param url - The URL of the partial HTML content.
     */
    private async loadContent(url: string): Promise<void> {
        try {
            await this.fetchPartial.fetchPartial(url, this.mainElement);
        } catch (error) {
            console.error('SimpleRouter: Error loading content for URL:', url, error);
        }
    }
}

export default SimpleRouter;

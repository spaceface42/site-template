class DocumentReadyHandler {
    /**
     * Initializes DocumentReadyHandler instance.
     * @param document The document object to use. Default is window.document.
     */
    constructor(document = window.document) {
        this.ready = this.initPromise(document);
    }
    /**
     * Initializes the promise that resolves when the DOM is ready.
     * @param document The document object to use.
     * @returns A promise that resolves when the DOM is ready.
     */
    initPromise(document) {
        return new Promise((resolve) => {
            if (this.isDomReady(document.readyState)) {
                // DOM is already ready
                resolve();
            }
            else {
                // Wait for DOMContentLoaded event
                const onDOMContentLoaded = () => {
                    resolve();
                    this.cleanupListeners(document, onDOMContentLoaded);
                };
                document.addEventListener('DOMContentLoaded', onDOMContentLoaded, { once: true });
            }
        });
    }
    /**
     * Checks if the DOM is ready based on the readyState.
     * @param state The current readyState of the document.
     * @returns True if the DOM is ready, false otherwise.
     */
    isDomReady(state) {
        return state === 'interactive' || state === 'complete';
    }
    /**
     * Cleans up event listeners.
     * @param document The document object.
     * @param listener The event listener function to remove.
     */
    cleanupListeners(document, listener) {
        document.removeEventListener('DOMContentLoaded', listener);
    }
}
DocumentReadyHandler.VERSION = '1.2.0';
export default DocumentReadyHandler;
// Simple event system for logging and debugging
class EventEmitter {
    constructor() {
        this.listeners = {};
    }
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    }
}
export default EventEmitter;
/**
 * PartialContentFetcher v1.1.0
 *
 * fetch html partials
 */
class PartialContentFetcher {
    constructor(baseUrl = window.location.href) {
        this.originUrl = new URL(baseUrl);
    }
    /**
     * Accept content only if it is text/html or text/plain
     **/
    async fetchContent(url, options = {}) {
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    'Accept': 'text/html, text/plain'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const contentType = response.headers.get('Content-Type');
            if (!contentType) {
                console.warn(`No Content-Type header received from ${url}`);
            }
            else if (!this.isValidContentType(contentType)) {
                console.warn(`Unexpected Content-Type received from ${url}: ${contentType}`);
            }
            return await response.text();
        }
        catch (error) {
            throw new Error(`Failed to fetch content from ${url}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    isSameOrigin(url) {
        try {
            const urlOrigin = new URL(url, this.originUrl).origin;
            return this.originUrl.origin === urlOrigin;
        }
        catch (error) {
            console.warn(`Invalid URL: ${url}`);
            return false;
        }
    }
    isValidContentType(contentType) {
        const validTypes = ['text/html', 'text/plain'];
        return validTypes.some(type => contentType.includes(type));
    }
}
PartialContentFetcher.VERSION = '1.1.0';
export default PartialContentFetcher;
class PartialContentInjector {
    constructor(allowedCrossOriginDomains, baseUrl) {
        if (!allowedCrossOriginDomains || allowedCrossOriginDomains.length === 0) {
            throw new Error('ALLOWED_DOMAINS is undefined or empty. Please configure allowed domains.');
        }
        this.partialContentFetcher = new PartialContentFetcher(baseUrl);
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
    async injectSinglePartial(url, targetSelector) {
        const targetElement = document.querySelector(targetSelector);
        if (!targetElement) {
            throw new Error(`Target element not found for selector: ${targetSelector}`);
        }
        await this.injectPartial(url, targetElement);
    }
    async injectPartial(url, element) {
        try {
            let content;
            if (this.partialContentFetcher.isSameOrigin(url)) {
                content = await this.partialContentFetcher.fetchContent(url);
            }
            else if (this.isAllowedCrossOrigin(url)) {
                content = await this.partialContentFetcher.fetchContent(url, {
                    mode: 'cors',
                    credentials: 'omit'
                });
            }
            else {
                throw new Error(`Cross-origin request not allowed for: ${url}`);
            }
            this.insertContent(content, element);
        }
        catch (error) {
            console.error(`Error injecting partial from ${url}:`, error instanceof Error ? error.message : String(error));
            throw error; // Propagate the error
        }
    }
    isAllowedCrossOrigin(url) {
        try {
            const urlObject = new URL(url);
            return this.allowedCrossOriginDomains.includes(urlObject.hostname);
        }
        catch (error) {
            console.warn(`Invalid URL: ${url}`);
            return false;
        }
    }
    insertContent(content, element) {
        try {
            element.insertAdjacentHTML('beforebegin', content.trim());
            element.remove();
        }
        catch (error) {
            console.error('insertContent: Error inserting HTML:', error instanceof Error ? error.message : String(error));
            throw error; // Propagate the error
        }
    }
}
PartialContentInjector.VERSION = '1.0.2';
export default PartialContentInjector;
export const APP_VERSION = '1.3.0';
const ALLOWED_DOMAINS = ['raw.githubusercontent.com', 'blackhole.spaceface.org'];
const appEvents = new EventEmitter();
// app init class
// checks for DOM readyness and then inits the app
class AppInitializer {
    constructor() {
        appEvents.emit('info', `Initializing application version ${APP_VERSION}...`);
        this.documentReadyHandler = new DocumentReadyHandler();
    }
    async initialize() {
        try {
            await this.initializePartialContentInjector();
            await this.waitForDomReady();
            await this.injectPartials();
            await this.demoErrors();
            await this.runPostInitializationTasks();
            appEvents.emit('info', 'Application initialized successfully');
        }
        catch (error) {
            appEvents.emit('error', 'Initialization failed');
            throw error; // Re-throw to be caught by the global error handler
        }
    }
    async initializePartialContentInjector() {
        this.partialContentInjector = new PartialContentInjector(ALLOWED_DOMAINS);
    }
    async waitForDomReady() {
        await this.documentReadyHandler.ready;
        appEvents.emit('info', 'DOM is now ready!');
    }
    async injectPartials() {
        if (!this.partialContentInjector) {
            throw new Error('PartialContentInjector is not initialized');
        }
        await this.partialContentInjector.injectAllPartials();
        appEvents.emit('info', 'All partials injected successfully');
    }
    async runPostInitializationTasks() {
        await this.addWelcomeMessage();
        await this.demoAwait();
    }
    async addWelcomeMessage() {
        const consoleElement = document.getElementById('console');
        if (consoleElement) {
            const h3 = document.createElement('h3');
            h3.textContent = `Welcome to spaceface / spacesuit / version ${APP_VERSION}`;
            consoleElement.appendChild(h3);
        }
        else {
            appEvents.emit('warn', 'Element with id "console" not found');
        }
    }
    async demoAwait() {
        await new Promise(resolve => setTimeout(resolve, 5000));
        appEvents.emit('info', "demoAwait demoAwait demoAwait");
    }
    async demoErrors() {
        appEvents.emit('error', 'demoErrors Someerror Initialization failed');
        // throw error; // Re-throw to be caught by the global error handler
    }
}
// Global error handler
window.addEventListener('error', (event) => {
    appEvents.emit('error', `Uncaught error: ${event.error}`);
});
// Logging setup
appEvents.on('info', (message) => console.log(message));
appEvents.on('warn', (message) => console.warn(message));
appEvents.on('error', (message) => console.error(message));
// Start the application
const appInitializer = new AppInitializer();
appInitializer.initialize().catch(() => {
    // Handle any cleanup or user notification here
});
//# sourceMappingURL=all.js.map
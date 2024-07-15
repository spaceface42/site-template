import DocumentReadyHandler from '../42/DocumentReadyHandler.js';
import PartialContentInjector from '../42/PartialContentInjector.js';
import EventEmitter from '../42/EventEmitter.js';
// Constants
const APP_VERSION = '1.3.0';
const ALLOWED_DOMAINS = ['raw.githubusercontent.com', 'blackhole.spaceface.org'];
// AppInitializer class
class AppInitializer {
    constructor(appEvents, allowedDomains) {
        this.appEvents = appEvents;
        this.allowedDomains = allowedDomains;
        this.appEvents.emit('info', `Initializing application version ${APP_VERSION}...`);
        this.documentReadyHandler = new DocumentReadyHandler(document, 15000); // Reduced timeout to 15 seconds
    }
    async initialize() {
        try {
            await this.initializePartialContentInjector();
            await this.waitForDomReady();
            await this.injectPartials();
            await this.runPostInitializationTasks();
            this.appEvents.emit('info', 'Application initialized successfully');
        }
        catch (error) {
            this.appEvents.emit('error', 'Initialization failed');
            console.error('Application initialization failed:', error);
            // Perform any necessary cleanup or user notification here
        }
    }
    async initializePartialContentInjector() {
        this.partialContentInjector = new PartialContentInjector(this.allowedDomains);
    }
    async waitForDomReady() {
        await this.documentReadyHandler.ready;
        this.appEvents.emit('info', 'DOM is now ready!');
    }
    async injectPartials() {
        if (!this.partialContentInjector) {
            throw new Error('PartialContentInjector is not initialized');
        }
        await this.partialContentInjector.injectAllPartials();
        this.appEvents.emit('info', 'All partials injected successfully');
    }
    async runPostInitializationTasks() {
        // Removed demoAwait and demoErrors
    }
}
AppInitializer.VERSION = APP_VERSION; // Aligned with APP_VERSION
// Event emitter setup
const appEvents = new EventEmitter();
// Logging setup
appEvents.on('info', (message) => console.log(message));
appEvents.on('warn', (message) => console.warn(message));
appEvents.on('error', (message) => console.error(message));
// Global error handler
window.addEventListener('error', (event) => {
    appEvents.emit('error', `Uncaught error: ${event.error}`);
});
// Start the application
const appInitializer = new AppInitializer(appEvents, ALLOWED_DOMAINS);
appInitializer.initialize();
//# sourceMappingURL=app.js.map
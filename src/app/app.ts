/**
 * init.ts
 * 
 * Initialization script for the application.
 */
import DocumentReadyHandler from '../42/DocumentReadyHandler.js';
import PartialContentInjector from '../42/PartialContentInjector.js';
import EventEmitter from '../42/EventEmitter.js';

// Constants
const APP_VERSION = '1.3.0';
const ALLOWED_DOMAINS = ['raw.githubusercontent.com', 'blackhole.spaceface.org'];

// AppInitializer class
class AppInitializer {
    static readonly VERSION = APP_VERSION; // Aligned with APP_VERSION
    private documentReadyHandler: DocumentReadyHandler;
    private partialContentInjector: PartialContentInjector;

    constructor(private readonly appEvents: EventEmitter, private readonly allowedDomains: string[]) {
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
        } catch (error) {
            this.appEvents.emit('error', 'Initialization failed');
            console.error('Application initialization failed:', error);
            // Perform any necessary cleanup or user notification here
        }
    }

    private async initializePartialContentInjector() {
        this.partialContentInjector = new PartialContentInjector(this.allowedDomains);
        if (PartialContentInjector.VERSION !== '1.2.1') {
            this.appEvents.emit('warn', `PartialContentInjector version mismatch. Expected 1.2.1, got ${PartialContentInjector.VERSION}`);
        }
    }

    private async waitForDomReady() {
        await this.documentReadyHandler.ready;
        this.appEvents.emit('info', 'DOM is now ready!');
    }

    private async injectPartials() {
        if (!this.partialContentInjector) {
            throw new Error('PartialContentInjector is not initialized');
        }
        // Call injectAllPartials, which now uses :not([data-partial-loaded])
        await this.partialContentInjector.injectAllPartials();
        this.appEvents.emit('info', 'All new partials injected successfully');
    }

    private async runPostInitializationTasks() {
        // Removed demoAwait and demoErrors
    }


}

// Event emitter setup
const appEvents = new EventEmitter();

// Logging setup
appEvents.on('info', (message: any) => console.log(message));
appEvents.on('warn', (message: any) => console.warn(message));
appEvents.on('error', (message: any) => console.error(message));

// Global error handler
window.addEventListener('error', (event) => {
    appEvents.emit('error', `Uncaught error: ${event.error}`);
});

// Start the application
const appInitializer = new AppInitializer(appEvents, ALLOWED_DOMAINS);
appInitializer.initialize();
/**
 * init.ts
 *
 * Initialization script for the application.
 */
import DocumentReadyHandler from '../42/DocumentReadyHandler.js';
import PartialContentInjector from '../42/PartialContentInjector.js';
export const APP_VERSION = '1.3.0';
const ALLOWED_DOMAINS = ['raw.githubusercontent.com', 'blackhole.spaceface.org'];
// event emitter / log errors
import EventEmitter from '../42/EventEmitter.js';
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
//# sourceMappingURL=app.js.map
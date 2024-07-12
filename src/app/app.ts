/**
 * init.ts
 * 
 * Initialization script for the application.
 */
import { FetchError, HTTPError, ContentTypeError } from '../42/customErrors.js';
import DocumentReadyHandler from '../42/DocumentReadyHandler.js';
import PartialContentInjector from '../42/PartialContentInjector.js';
import EventEmitter from '../42/EventEmitter.js';




// AppInitializer
class AppInitializer {
    static readonly VERSION = '1.1.0.fix';
    private documentReadyHandler: DocumentReadyHandler;
    private partialContentInjector: PartialContentInjector;

    constructor(private readonly appEvents: EventEmitter, private readonly allowedDomains: string[]) {
        this.appEvents.emit('info', `Initializing application version ${APP_VERSION}...`);
        // this.documentReadyHandler = new DocumentReadyHandler();
        this.documentReadyHandler = new DocumentReadyHandler(document, 30000); // 30 seconds timeout

    }

    async initialize() {
        try {
            await this.initializePartialContentInjector();
            await this.waitForDomReady();
            await this.injectPartials();

            await this.demoErrors();
            await this.runPostInitializationTasks();

            this.appEvents.emit('info', 'Application initialized successfully');
        } catch (error) {
            this.appEvents.emit('error', 'Initialization failed');
            throw error;
        }
    }

    private async initializePartialContentInjector() {
        this.partialContentInjector = new PartialContentInjector(this.allowedDomains);
    }

    private async waitForDomReady() {
        await this.documentReadyHandler.ready;
        this.appEvents.emit('info', 'DOM is now ready!');
    }

    private async injectPartials() {
        if (!this.partialContentInjector) {
            throw new Error('PartialContentInjector is not initialized');
        }
        await this.partialContentInjector.injectAllPartials();
        this.appEvents.emit('info', 'All partials injected successfully');
    }

    private async runPostInitializationTasks() {
        await this.addWelcomeMessage();
        await this.demoAwait();
    }

    private async addWelcomeMessage() {
        const consoleElement = document.getElementById('console');
        if (consoleElement) {
            const h3 = document.createElement('h3');
            h3.textContent = `Welcome to spaceface / spacesuit / version ${APP_VERSION}`;
            consoleElement.appendChild(h3);
        } else {
            this.appEvents.emit('warn', 'Element with id "console" not found');
        }
    }

    private async demoAwait() {
        await new Promise(resolve => setTimeout(resolve, 5000));
        this.appEvents.emit('info', "demoAwait demoAwait demoAwait");
    }

    private async demoErrors() {
        this.appEvents.emit('error', 'demoErrors Someerror Initialization failed');
    }
}

// Constants and initialization
const APP_VERSION = '1.3.0';
const ALLOWED_DOMAINS = ['raw.githubusercontent.com', 'blackhole.spaceface.org'];

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
appInitializer.initialize().catch(() => {
    // Handle any cleanup or user notification here
});

appInitializer.initialize().catch((error) => {
    console.error('Application initialization failed:', error);
    appEvents.emit('error', 'Application initialization failed. Please check the console for more details.');
    // Perform any necessary cleanup or user notification here
});


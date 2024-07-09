/**
 * EventEmitter v1.0.2
 * 
 */
class EventEmitter {
    static readonly VERSION = '1.1.0.fix';
    private listeners: { [key: string]: Function[] } = {};

    on(event: string, callback: Function) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        (this.listeners[event] as Function[]).push(callback); // Use type assertion
    }

    emit(event: string, data?: any) {
        const callbacks = this.listeners[event];
        if (callbacks) {
            callbacks.forEach(callback => callback(data));
        }
    }
}

export default EventEmitter;

/**
 * EventEmitter v1.0.2
 *
 */
class EventEmitter {
    constructor() {
        this.listeners = {};
    }
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback); // Use type assertion
    }
    emit(event, data) {
        const callbacks = this.listeners[event];
        if (callbacks) {
            callbacks.forEach(callback => callback(data));
        }
    }
}
EventEmitter.VERSION = '1.2.1';
export default EventEmitter;
//# sourceMappingURL=EventEmitter.js.map
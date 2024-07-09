/**
 * EventEmitter v1.2.1
 */
class EventEmitter {
    constructor() {
        this.listeners = {};
    }
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
        // Return a function to remove this listener
        return () => {
            const eventListeners = this.listeners[event];
            if (eventListeners) {
                this.listeners[event] = eventListeners.filter(cb => cb !== callback);
            }
        };
    }
    emit(event, data) {
        const callbacks = this.listeners[event];
        if (callbacks) {
            callbacks.forEach(callback => {
                try {
                    callback(data);
                }
                catch (error) {
                    console.error(`Error in event listener for ${event}:`, error);
                }
            });
        }
    }
}
EventEmitter.VERSION = '1.2.1';
export default EventEmitter;
//# sourceMappingURL=EventEmitter.js.map
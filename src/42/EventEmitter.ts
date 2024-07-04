// Simple event system for logging and debugging
class EventEmitter {
    private listeners: {[key: string]: Function[]} = {};

    on(event: string, callback: Function) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    emit(event: string, data?: any) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    }
}

export default EventEmitter;
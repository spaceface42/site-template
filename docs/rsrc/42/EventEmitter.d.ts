/**
 * EventEmitter v1.0.2
 *
 */
declare class EventEmitter {
    static readonly VERSION = "1.1.0.fix";
    private listeners;
    on(event: string, callback: Function): void;
    emit(event: string, data?: any): void;
}
export default EventEmitter;

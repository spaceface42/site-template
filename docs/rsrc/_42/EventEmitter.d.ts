/**
 * EventEmitter v1.2.1
 */
declare class EventEmitter {
    static readonly VERSION = "1.2.1";
    private listeners;
    on(event: string, callback: (data?: any) => void): () => void;
    emit(event: string, data?: any): void;
}
export default EventEmitter;

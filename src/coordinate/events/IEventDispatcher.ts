module coordinate.events {
    export interface IEventDispatcher {
        //constructor (target: IEventDispatcher= null);
        addEventListener(type: string, listener: Function, useCapture: boolean, priority: number, useWeakReference: boolean): void;
        dispatchEvent(event): boolean;
        hasEventListener(type: string): boolean;
        removeEventListener(type: string, listener: Function, useCapture: boolean): void;
        willTrigger(type: string): boolean;
    }
}
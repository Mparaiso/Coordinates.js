module coordinate.events {
    export class Event {
        bubbles: boolean;
        cancelable: boolean;
        currentTarget: any;
        eventPhase: number;
        target: any;
        type: string;

        __isCancelled: boolean;
        __isCancelledNow: boolean;

        constructor(inType: string,
            inBubbles: boolean = false,
            inCancelable: boolean = false) {
            this.type = inType;
            this.bubbles = inBubbles;
            this.cancelable = inCancelable;
            this.__isCancelled = false;
            this.__isCancelledNow = false;
            this.target = null;
            this.currentTarget = null;
            this.eventPhase = EventPhase.AT_TARGET;
        }

        clone(): Event {

            return new Event(this.type, this.bubbles, this.cancelable);

        }


        stopImmediatePropagation(): void {

            this.__isCancelled = true;
            this.__isCancelledNow = true;

        }


        stopPropagation(): void {

            this.__isCancelled = true;

        }


        toString(): string {

            return "[Event type=" + this.type + " bubbles=" + this.bubbles + " cancelable=" + this.cancelable + "]";

        }


        __createSimilar(type: String, related: any = null, targ: any = null): Event {

            var result: Event = new Event(this.type, this.bubbles, this.cancelable);

            if (targ != null) {

                result.target = targ;

            }

            return result;

        }


        __getIsCancelled(): boolean {

            return this.__isCancelled;

        }


        __getIsCancelledNow(): boolean {

            return this.__isCancelledNow;

        }


        __setPhase(phase: number): void {

            this.eventPhase = phase;

        }
    }
}

module coordinate.events {



    export class EventDispatcher {
        static eventSplitter = " ";

        callbacks: Object;


        addEventListener(events: string, callback: Function): EventDispatcher {
            debugger;
            if (callback == null) return this;
            var _events: Array<string> = events.split(EventDispatcher.eventSplitter);
            var event: string = null;
            this.callbacks = this.callbacks != null ? this.callbacks : {};
            while (_events.length > 0) {
                event = _events.shift();
                var list = this.callbacks[event];
                var node = list != null ? list.tail : {};
                node.next = {};
                var tail = node.next;
                node.callback = callback;
                this.callbacks[event] = { tail: tail, next: list != null ? list.next : node };
            }
            return this;
        }

        removeEventListener(events_: String, callback= null): EventDispatcher {
            if (Object.keys(this.callbacks).length <= 0) return this;
            var events: Array = events_ != null ? events_.split(EventDispatcher.eventSplitter) : Object.keys(this.callbacks);
            var event = null;
            while (events.length > 0) {
                event = events.shift();
                var node = this.callbacks[event];
                delete this.callbacks[event];
                if (node == null || callback == null) continue;
                var tail = node.tail;
                while (node != tail) {
                    node = node.next;
                    var cb = node.callback;
                    var ctx = this;
                    if ((callback != null && cb != callback)) {
                        this.addEventListener(event, cb);
                    }
                }
            }
            return this;
        }

        dispatchEvent(events_: string, rest: Array= null): EventDispatcher {
            if (this.callbacks == null) return this;
            var all = this.callbacks["all"];
            var events: Array = events_.split(EventDispatcher.eventSplitter);
            var event = null;
            while (events.length > 0) {
                event = events.shift();
                var node = this.callbacks[event];
                if (node != null) {
                    var tail = node.tail;
                    while (node != tail) {
                        if (node.callback != null) {
                            var args: Array = [event];
                            event.target = event.currentTarget = this;
                            if (rest != null) args = args.concat(rest);
                            node.callback.apply(this, args);
                        }
                        node = node.next;
                    }
                }
            }
            return this;
        }

    }
}
type EventCallback = (...args:any[]) => void;

export class EventEmitter {

    private events: Map<String, EventCallback[]> = new Map();

    on(event: string, callback: EventCallback): void{
        if(!this.events.has(event)){
            this.events.set(event,[])
        }
        this.events.get(event)!.push(callback);
    }

    emit(event: string, ...args: any[]): void {
        if(this.events.has(event)){
            this.events.get(event)!.forEach( callback => callback(...args) );
        }
    }

    off(event: string, callback: EventCallback): void {
        if(this.events.has(event)){
            const callbacks =  this.events.get(event)!;
            const index = callbacks.indexOf(callback);
            if(index !== -1){
                callbacks?.splice(index,1);
            }
        }
    }

}
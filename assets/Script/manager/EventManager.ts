// 事件监听类（自定义）
export default class EventManager {
    private target: any;
    constructor() {

    }
    public static _instance: EventManager = null;
    private listenerObj = {};
    public static getInstance(): EventManager {
        if(!this._instance) {
            this._instance = new EventManager();
        }
        return this._instance;
    }
    // 添加一个监听
    public addEventListener(type: string,handler: Function,target: any) {
        if(typeof type === "string" && typeof handler === "function") {
            // handler.bind(target);
            this.target = target;
            if(typeof this.listenerObj[type] === "undefined") {
                this.listenerObj[type] = [handler];
            } else {
                this.listenerObj[type].push(handler);
            }
        }
    }
    // 删除对应的监听
    public removeEventListener(type: string,handler: Function,target: any) {
        if(typeof type !== "string" && typeof handler !== "function") {
            return;
        }
        if(this.listenerObj[type] && this.listenerObj[type].length > 0) {
            for(var i = 0,len = this.listenerObj[type].length; i < len; i++) {
                if(this.listenerObj[type][i] == handler) {
                    this.listenerObj[type][i] = null;
                    break;
                }
            }
            this.listenerObj[type].splice(i,1);
            // this.listenerObj[type] = [];
        }
    }
    public dispatchEvent(event: any) {
        if(!event.target) {
            event.target = this.target;
        }
        if(this.listenerObj[event.type].length > 0) {
            let typeLen: number = this.listenerObj[event.type].length;
            let handlers = this.listenerObj[event.type];
            for(let i = 0; i < handlers.length; i++) {
                if(typeof handlers[i] === "function") {
                    // handlers[i](event).bind(event.target);
                    handlers[i].call(event.target,event);
                }
            }
        }
    }
}
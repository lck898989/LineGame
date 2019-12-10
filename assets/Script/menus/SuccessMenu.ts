const {ccclass, property} = cc._decorator;

@ccclass
export default class SuccessMenu extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

    start () {

    }
    private clickEvent(e: cc.Event,data: any): void {
        switch(data) {
            case "replay":
                
                break;
            case "nextLevel":
                break;    
        }
    }
    update (dt: number) {

    }
}

import Global from "../common/Global";
import LayerManager from "../manager/LayerManager";

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
                cc.director.loadScene("Game");
                break;
            case "nextLevel":
                Global.level++;
                cc.director.loadScene("Game");
                LayerManager.getInstance().removeSprite("menu");
                LayerManager.getInstance().showMask(false);
                break;    
        }
    }
    update (dt: number) {
        
    }
}

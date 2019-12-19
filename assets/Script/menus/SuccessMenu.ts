import Global from "../common/Global";
import LayerManager from "../manager/LayerManager";
import Game from "../Game";
import EventManager from "../manager/EventManager";

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
                break;
            case "close":
                // 关闭弹窗
                // Game.prototype.gameOver = 
                cc.director.loadScene("Game");
                // 分发事件
                EventManager.getInstance().dispatchEvent({type: "closeWindow",message: "close window",target: this});
                break;
            }
        LayerManager.getInstance().removeSprite("menu");
        LayerManager.getInstance().showMask(false);
    }
    update (dt: number) {

    }
}

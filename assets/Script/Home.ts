const {ccclass, property} = cc._decorator;
import AudioManager from "./manager/AudioManager";
import EventManager from "./manager/EventManager";
@ccclass
export default class Home extends cc.Component {
    // onLoad () {}
    @property(cc.Node)
    musicBtnOn: cc.Node = null;
    @property(cc.Node)
    musicBtnOff: cc.Node = null;
    private clickEvent(e: cc.Event,data: any): void {
        switch(data) {
            case "musicon":
                // 关闭音频
                AudioManager.getInstance().turnOffMusic();
                this.setBtnState(false);
                break;
            case "musicoff":
                // 开启音频
                AudioManager.getInstance().turnOnMusic();
                this.setBtnState(true);
                break;
        }
    }
    private setBtnState(on: boolean): void {
        if(this.musicBtnOff && this.musicBtnOn) {
            this.musicBtnOn.active = on;
            this.musicBtnOff.active = !on;
        }
    }
    start () {
        console.log("layer is ",cc.find("layer"));
        cc.game.addPersistRootNode(cc.find("layer"));
        // 获取音频信息
        let state: boolean = AudioManager.getInstance().getMusicState();
        console.log("music state is ",state);
        this.setBtnState(state);
        AudioManager.getInstance().playBg("audio/bg1",true,0.7);
    }
    // 跳转首页
    goIndex():void {
        cc.director.loadScene("Index");
    }

    // update (dt) {}
}

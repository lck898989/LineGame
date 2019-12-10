const {ccclass, property} = cc._decorator;

@ccclass
export default class Home extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    // 跳转首页
    goIndex():void {
        cc.director.loadScene("Index");
    }

    // update (dt) {}
}

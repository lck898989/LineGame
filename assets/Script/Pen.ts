// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    private gtx: cc.Graphics;
    start () {
        this.gtx = this.node.getComponent(cc.Graphics);
        console.log("gtx is ",this.gtx);
        if(this.gtx) {
            this.gtx.moveTo(0,0);
            this.gtx.lineTo(100,100);
            this.gtx.strokeColor = new cc.Color(255,200,100,255);
            this.gtx.stroke();
        }

    }

    // update (dt) {}
}

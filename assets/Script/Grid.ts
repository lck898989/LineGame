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
export default class Grid extends cc.Component {


    // LIFE-CYCLE CALLBACKS:
    private row: number = -1;
    private col: number = -1;
    private ctx: cc.Graphics = null;
    // 是否应该被改变颜色
    private changeColor: boolean = false;
    // 记录pahtid 即圆点的id
    private pathId: number = -1;
    onLoad () {
        
    }
    // 改变grid的颜色值
    private setColor(color: cc.Color): void {
        this.node.getChildByName("grid").color = color;
    }
    // 获取该网格的颜色值
    public getColor(): cc.Color {
        return this.node.getChildByName("grid").color;
    }
    start () {

    }
    
    // 销毁的时候进行事件监听的销毁
    onDestroy() {
        
    }
    // update (dt) {}
}

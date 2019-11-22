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
import Global from "./common/Global";
@ccclass
export default class Index extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    @property(cc.Node)
    page1: cc.Node = null;
    @property(cc.Node)
    page2: cc.Node = null;
    @property(cc.Node)
    page3: cc.Node = null;
    @property(cc.Prefab)
    levelModel: cc.Prefab = null;

    private levelArr: cc.Node[];
    // 当前选择的关卡
    private choosedLevel: number;

    private pageArr: cc.Node[];
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    }

    start () {
        console.log("index start");
        this.levelArr = [];
        this.pageArr = [];
        this.pageArr.push(this.page1);
        this.pageArr.push(this.page2);
        this.pageArr.push(this.page3);
        this.addAllLevel();

    }
    // 添加所有关卡
    addAllLevel(): void {
        let row = 5;
        let col = 6;
        let num = 0;
        for(let m = 0; m < 3; m++) {
            for(let i = 0; i < row; i++) {
                for(let j = 0; j < col; j++) {
                    num++;
                    let leveNode = cc.instantiate(this.levelModel);
                    
                    let tempX = -this.page1.width / 2 + leveNode.width / 2 + j * (100 + 30);
                    let tempY = this.page1.height / 2 - leveNode.height / 2 - i * (100 + 25);
                    this.levelArr.push(leveNode);
                    leveNode.name = m + "_" + i + "_" + j;
                    let numLabel: cc.Label = <cc.Label>leveNode.getChildByName("num").getComponent(cc.Label);
                    numLabel.string = num.toString();
                    leveNode.on("touchstart",this.touchNodeItem,leveNode);
                    leveNode.on("touchend",this.touchNodeItemend,leveNode);
                    leveNode.setPosition(cc.v2(tempX,tempY));
                    this.pageArr[m].addChild(leveNode);
                }
            }
        }
    }
    // 一个关卡被点击
    touchNodeItem(): void {
        if(this instanceof cc.Node) {
            console.log(this.name);
            let self: cc.Node = <cc.Node>this;
            self.color = new cc.Color(125,125,125,100);
            self.setScale(1.1);
        }         
    }
    touchNodeItemend(): void {
        if(this instanceof cc.Node) {
            let self = <cc.Node>this;
            self.setScale(1.0);
            let numArr = self.name.split("_");
            // 第几页
            let num1 = Number(numArr[0]);
            // 第几行
            let num2 = Number(numArr[1]);
            // 第几列
            let num3 = Number(numArr[2]);
            if(num2 !== 0) {
                this.choosedLevel = num1 * 30 + num2 * 6 + num3 + 1;
            } else {
                this.choosedLevel = num1 * 30 + num3 + 1;
            }
            console.log("choosedLevel is ",this.choosedLevel);
            Global.level = this.choosedLevel;
            cc.director.loadScene("Game");
        }
    }
    // update (dt) {}
}

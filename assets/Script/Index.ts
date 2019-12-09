// 圣诞树闪光
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
    @property(cc.Node)
    treeLight: cc.Node = null;

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
            let start = new Date().getMilliseconds();
            Global.prefabBuffer = [];
            Global.preLoadPrefabs(() => {
                let end = new Date().getMilliseconds();
                console.log("加载预制体消耗",end - start,"ms");
                cc.director.loadScene("Game");
            });
        }
    }
    btnEvent(e: cc.Event,data: any): void {
        switch(data) {
            case "share":
                // 分享
                if(CC_JSB) {
                    // 移动端
                    if(cc.sys.ANDROID) {
                        // 安卓端
                    } else if(cc.sys.IPHONE) {

                    }
                } else {
                    // H5端

                }
                break;
            case "back":
                // 回到首页
                cc.director.loadScene("Home");
                break;    
        }
    }
    update (dt) {
        this.treeLight.opacity -= dt * 50;
        if(this.treeLight.opacity <= 100) {
            this.treeLight.opacity = 255;
            
        }
    }
}

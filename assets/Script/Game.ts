const {ccclass, property} = cc._decorator;
import Grid from "./Grid";
import Util from "./utils/Util";
import Global from "./common/Global";

interface touchInfo {
    "p"   : cc.Vec2,
    "node": cc.Node 
}
@ccclass
export default class Game extends cc.Component {

    // onLoad () {}
    @property(cc.Node)
    gridCon: cc.Node = null;
    @property(cc.Prefab)
    gridModel: cc.Prefab = null;
    @property(cc.Prefab)
    circleMode: cc.Prefab = null;
    @property(cc.AudioClip)
    lineAudio: cc.AudioClip = null;

    // 初始化出来的预制体节点
    private initedPreNode: cc.Node = null;
    // 开始点击的所在的行列
    private startVec: cc.Vec2 = null;
    // 结束点击所在的行列
    private endVec: cc.Vec2 = null;
    // 网格背景数组
    private gridArr: cc.Node[];
    private ballArr: cc.Node[];
    // 网格二维数组
    private gridMap: cc.Node[][];
    private map: number[][];
    private ballMap: cc.Node[][];
    // 网格坐标数组
    private aArr: cc.Vec2[][];
    
    // 是否滑动的时候还改变颜色值 中间move的过程遇到小圆点就不改变颜色了
    private canMove: boolean = true;

    // 上一次触点所在的行和列
    private lastTouchVec: cc.Vec2 = null;

    // 开始移动时候的颜色值
    private moveStartColor: cc.Color = null;
    // 移动的路径数组
    private movePath: Object;

    // 小圆点是否配对成功
    private isPair: boolean = false;

    // 关卡配置数据
    private levelData: cc.JsonAsset = null;
    // 当前点击的id
    private currentId: number = -1;
    // 最后点击圆点的id
    private lastId: number = -1;
    // 是否是继续上一次的连线
    private isContinue: boolean = false;
    // 是否是从头开始划线
    private isReStart: boolean = false;
    // 移动的方向 0: 上， 1: 右 2： 下 3：左
    private curDir: number = -1;

    // 当前触摸的路径id
    private curMoveId: number = -1;
    // 当前触摸的路径应该改变的额颜色
    private curMoveColor: cc.Color = null;
    // 
    // private penNode: cc.Node = null;
    private gtxArr: cc.Graphics[] = null;
    private colorCircleArr: cc.Node[] = null;
    async start () {
        this.gridArr = [];
        this.ballArr = [];
        this.map = [];
        this.gridMap = [];
        this.aArr = [];
        this.ballMap = [];
        // 移动记录
        this.movePath = {};
        this.gtxArr = [];
        this.gridCon.on("touchstart",this.touchBegin,this);
        this.gridCon.on("touchmove",this.touchMove,this);
        this.gridCon.on("touchend",this.touchEnd,this);
        this.levelData = await new Promise((resolve,reject) => {
            cc.loader.loadRes("config/levelConfig.json",cc.JsonAsset,(err: Error,res: any) => {
                if(err) {
                    return;
                }
                if(res) {
                    console.log("res is ",res);
                    resolve(res);
                }
            })
        });
        if(!Global.level) {
            Global.level = 1;
        }
        // cc.JsonAsset
        for(let i = 0; i < this.levelData.json[Global.level].length; i++) {
            this.colorCircleArr.push();
        }
        // 初始化背景网格
        this.initGrid();

        // this.drawPath();
        this.addGrphicsToNode();
        // 初始化球
        // this.initCircle();
        // this.drawPath()
        
    }
    // 绘制路径
    private drawPath(): void {
        let penNodeTemp = this.gtxArr[0];
        let gtx = penNodeTemp.getComponent(cc.Graphics);
        gtx.lineJoin = cc.Graphics.LineJoin.ROUND;
        // gtx.lineJoin = cc.Graphics.LineJoin.ROUND;
        gtx.lineCap = cc.Graphics.LineCap.ROUND;
        gtx.clear();
        gtx.lineWidth = 40;
        // let startXWorld = this.node.convertToWorldSpaceAR(cc.v2(this.aArr[0][0].x,this.aArr[0][0].y));
        // let start: cc.Vec2 = new cc.Vec2(0,0);
        gtx.moveTo(this.aArr[0][0].x,this.aArr[0][0].y);
        gtx.strokeColor = new cc.Color(255,90,100,255);
        gtx.lineTo(60,100);
        gtx.lineTo(150,100);
        gtx.stroke();

    }
    // 添加Griphics 组件到父节点中 有多少种类型的圆点就用几个Griphics
    private addGrphicsToNode(): void {
        for(let i = 0; i < this.levelData.json[Global.level].length; i++) {
            let  penNode = new cc.Node();
            penNode.addComponent(cc.Graphics);
            this.gridCon.addChild(penNode);
            // 添加到画笔数组中 设置每个画笔的样式信息起点类型，拐点类型
            this.gtxArr.push(penNode.getComponent(cc.Graphics));
            this.gtxArr[i].lineWidth = 40;
            this.gtxArr[i].lineCap = cc.Graphics.LineCap.ROUND;
            this.gtxArr[i].lineJoin = cc.Graphics.LineJoin.ROUND;

        } 
    }
    initGrid(): void {
        let row = 6; 
        let col = 6;
        for(let i = 0; i < row; i++) {
            this.aArr[i] = [];
            this.map[i] = []
            this.gridMap[i] = [];
            this.ballMap[i] = []
            for(let j = 0; j < col; j++) {
                let nodeTemp = cc.instantiate(this.gridModel);
                console.log("tempX is ",nodeTemp.width);
                console.log("tempY is ",nodeTemp.height);
                let tempX = -this.gridCon.width / 2 + nodeTemp.width / 2 + j * nodeTemp.width;
                let tempY = this.gridCon.height / 2 - nodeTemp.height / 2 - i * nodeTemp.height;
                nodeTemp.getComponent("Grid").row = i;
                nodeTemp.getComponent("Grid").col = j;
                nodeTemp.getComponent("Grid").changeColor = false;
                nodeTemp.setPosition(cc.v2(tempX,tempY));
                this.gridCon.addChild(nodeTemp);
                this.gridArr.push(nodeTemp);

                this.aArr[i][j] = new cc.Vec2(tempX,tempY);
                this.map[i][j] = 0;
                this.gridMap[i][j] = nodeTemp;
                this.ballMap[i][j] = null;
            }
        }
    }
    // 初始化棋子
    private initCircle(): void {
        let level = Global.level === 0 ? 1 : Global.level;
        console.log("level is ",level);
        let dataArr = this.levelData.json[level];
        console.log("dataArr is ",dataArr);
        // 初始化路径对象
        for(let m = 0; m < dataArr.length; m++) {
            // 一个颜色对应一个路径数组
            this.movePath[m] = [];
        }
        if(dataArr) {
            for(let i = 0; i < dataArr.length; i++) {
                let dataItem = dataArr[i];
                let row = dataItem.row;
                let col = dataItem.col;
                // 棋子颜色数组 [r,g,b,a]
                let colorArr = dataItem.color;
                // 正确的路径走法
                let rightObj: {"row": number,"col": number} = dataItem.right;
                let id: number = dataItem.id;
                let path: number[][] = dataItem.path;
                let instance = cc.instantiate(this.circleMode);
                this.addBallToGridCon(instance,row,col,id,path,colorArr,rightObj.row,rightObj.col);
                // 设置另外一个
                let rightNode = cc.instantiate(this.circleMode);

                this.addBallToGridCon(rightNode,rightObj.row,rightObj.col,id,path.reverse(),colorArr,row,col);
            }
        } else {
            console.log("这一关的数据还没有敬请期待");
        }
    }
    private addBallToGridCon(instance: cc.Node,row: number,col: number,i: number,path: any,colorArr: number[],bRow: number,bCol: number): void {
        instance.getComponent("Ball").row = row;
        instance.getComponent("Ball").col = col;
        instance.getComponent("Ball").id = i;
        instance.getComponent("Ball").path = path;
        instance.getComponent("Ball").brotherRow = bRow;
        instance.getComponent("Ball").brotherCol = bCol;

        instance.color = new cc.Color(colorArr[0],colorArr[1],colorArr[2],colorArr[3]);
        // 设置坐标
        instance.setPosition(this.aArr[row][col]);
        this.map[row][col] = 1;
        this.gridCon.addChild(instance);
        this.ballArr.push(instance);
        this.ballMap[row][col] = instance;
    }
    // 产生随机数的方法
    createRandom(minNum: number,maxNum: number): number {
        return Math.floor(Math.random() * (maxNum - minNum) + minNum);
    }
    btnEvent(e: cc.Event.EventTouch,data: any): void {
        console.log("data is ",data);
        switch(data) {
            case "back":
                cc.director.loadScene("Index");
                break;
            case "reset":
                this.resetData();
                break;    
        }
    }
    /**
     * @returns void 重置数据包括路径数组，画笔数据，还原背景网格
     */
    private resetData(): void {
        // 还原网格背景的颜色值
        for(let i = 0; i < this.gridArr.length; i++) {
            let gridItem = this.gridArr[i];
            if(gridItem.getComponent("Grid").changeColor) {
                // 恢复默认颜色
                gridItem.getComponent("Grid").setColor(new cc.Color(200,200,200,255));
                // 还原网格背景的修改颜色属性
                gridItem.getComponent("Grid").changeColor = false;
            }
        }
        // 重置路径数据
        for(let i = 0; i < this.levelData.json[Global.level].length; i++) {
            // 清空数据
            this.movePath[i] = [];
        }
        // 清除画笔画的路径
        for(let i = 0; i < this.gtxArr.length; i++) {
            let gtxItem = this.gtxArr[i];
            gtxItem.clear();
        }
    }
    touchMove(e: cc.Event.EventTouch): void {
        
    }
    touchBegin(e: cc.Event.EventTouch): boolean {

        return true;
    }
    touchEnd(e: cc.Event.EventTouch): void {


    }
    
    /**
     * @param  {number} offsetX 水平方向偏移量
     * @param  {number} offsetY 竖直方向偏移量
     * @param  {number} row  所经过的网格的行
     * @param  {number} col  所经过的网格的列
     */
    private showGuideByOffsetXY(offsetX: number,offsetY: number,row: number,col: number) {
        
    }
    onDestroy() {
        this.gridCon.off("touchstart",this.touchBegin,this);
        this.gridCon.off("touchmove",this.touchMove,this);
        this.gridCon.off("touchend",this.touchEnd,this);

        this.movePath = {};
    }
    // 获得点击的行
    getRowColByTouch(e: cc.Event.EventTouch): touchInfo {
        let p = new cc.Vec2(-1,-1);
        let res = {
            "p"   : null,
            "node": null
        }
        let target = e.target;
        for(let i = 0; i < this.gridArr.length; i++) {
            let nodeItem = this.gridArr[i];
            if(nodeItem.getBoundingBoxToWorld().contains(e.getLocation())) {
                p.x = nodeItem.getComponent("Grid").row;
                p.y = nodeItem.getComponent("Grid").col;
                res.node = nodeItem;
            }
        }
        res.p = p;
        return res;
    }
    update (dt) {
        if(this.levelData && this.levelData.json[Global.level]) {
            let levelNumber = this.levelData.json[Global.level].length;
            console.log("movePath is ",this.movePath);
            // 遍历所有的路径
            // for(let i = 0; i < levelNumber; i++) {
            //     console.log("movePath is ",this.movePath[i]);
            //     if(this.movePath[i].length >= 2) {
            //         let curColor;
            //         let dataLen = this.levelData.json[Global.level].length;
            //         let dataItem = this.levelData.json[Global.level][this.currentId];
            //         // 绘制点前点击对应的画线id
            //         curColor = new cc.Color(dataItem.color[0],dataItem.color[1],dataItem.color[2],dataItem.color[3]);
            //         this.gtxArr[i].strokeColor = curColor;
            //         let movePathLen = this.movePath[this.currentId].length;
            //         for(let m = 0; m < movePathLen; m++) {
            //             let p = this.aArr[this.movePath[this.currentId][m].x][this.movePath[this.currentId][m].y];
            //             if(m === 0) {
            //                 this.gtxArr[i].moveTo(p.x,p.y);
            //             } else {
            //                 this.gtxArr[i].lineTo(p.x,p.y);
            //             }
            //         }
            //         this.gtxArr[i].stroke();
            //     }
            // }
            
        }
        
    }
}

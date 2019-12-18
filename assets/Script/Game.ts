const {ccclass, property} = cc._decorator;
import Grid from "./Grid";
import Util from "./utils/Util";
import Global from "./common/Global";
import LayerManager from "./manager/LayerManager";

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

    @property(cc.Node)
    gift: cc.Node = null;
    @property(cc.Prefab)
    menuPrefab: cc.Prefab = null;

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
    // cc.DrawNode
    
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

    // 存储结果的对象
    private res: any = {};
    public onLoad(): void {
        console.log("movePath is ",this.movePath);
        console.log("===>> gtxArr is ",this.gtxArr);
    }
    public async start () {
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
            cc.loader.loadRes("config/oneLevel.json",cc.JsonAsset,(err: Error,res: any) => {
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
        // for(let i = 0; i < this.levelData.json[Global.level].length; i++) {
        //     this.colorCircleArr.push();
        // }
        // 初始化背景网格 不要使用系统颜色，在预制体中不要加入Sprite并且改变其颜色
        this.initGrid();

        // this.drawPath();
        this.addGrphicsToNode();
        // 初始化球
        this.initCircle();

        this.gift.active = false;
    }
    // 添加Griphics 组件到父节点中 有多少种类型的圆点就用几个Griphics
    private addGrphicsToNode(): void {
        if(this.levelData && this.levelData.json && this.levelData.json[Global.level]) {
            for(let i = 0; i < this.levelData.json[Global.level].length; i++) {
                let  penNode = new cc.Node();
                penNode.name = "pen" + i.toString();
                penNode.addComponent(cc.Graphics);
                this.gridCon.addChild(penNode);
                // 添加到画笔数组中 设置每个画笔的样式信息起点类型，拐点类型
                this.gtxArr.push(penNode.getComponent(cc.Graphics));
                this.gtxArr[i].lineWidth = 40;
                this.gtxArr[i].lineCap = cc.Graphics.LineCap.ROUND;
                this.gtxArr[i].lineJoin = cc.Graphics.LineJoin.ROUND;
                // 根据十六机制颜色进行填充
                // this.gtxArr[i].fillColor.fromHEX("#ffffff");
    
            } 
        }
    }
    initGrid(): void {
        let row = 6; 
        let col = 6;
        for(let i = 0; i < row; i++) {
            this.aArr[i] = [];
            this.map[i] = [];
            this.gridMap[i] = [];
            this.ballMap[i] = []
            for(let j = 0; j < col; j++) {
                let nodeTemp = cc.instantiate(this.gridModel);
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
    private initCircle() {
        let level = Global.level === 0 ? 1 : Global.level;
        let dataArr = this.levelData.json[level];
        
        // dragonBones
        if(dataArr) {
            // 初始化路径对象
            for(let m = 0; m < dataArr.length; m++) {
                // 一个颜色对应一个路径数组
                this.movePath[m] = [];
            }
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
                let instance: cc.Node = cc.instantiate(Global.prefabBuffer[i]);
                this.addBallToGridCon(instance,row,col,id,path,colorArr,rightObj.row,rightObj.col);
                // 设置另外一个
                let rightNode = cc.instantiate(Global.prefabBuffer[i]);

                this.addBallToGridCon(rightNode,rightObj.row,rightObj.col,id,path.reverse(),colorArr,row,col);
            }
        } else {
            console.log("这一关的数据还没有敬请期待");
            // if(Global.level >= 2) {
            //     Global.level--;
            // }
        }
    }
    /**
     * @param  {cc.Node} instance 预制体实例节点
     * @param  {number} row 该圆点在网格中的行
     * @param  {number} col 该圆点在网格中的列
     * @param  {number} i 该圆点在网格中id编号
     * @param  {any} path 该圆点所拥有的路径
     * @param  {number[]} colorArr 颜色数组
     * @param  {number} bRow 兄弟圆点所在的行
     * @param  {number} bCol 兄弟圆点所在的列
     * @returns void
     */
    private addBallToGridCon(instance: cc.Node,row: number,col: number,i: number,path: any,colorArr: number[],bRow: number,bCol: number): void {
        let ballComponent = instance.getComponent("Ball");
        ballComponent.row = row;
        ballComponent.col = col;
        ballComponent.id = i;
        ballComponent.path = path;
        ballComponent.brotherRow = bRow;
        ballComponent.brotherCol = bCol;
        // 设置Grid的id
        this.gridMap[row][col].getComponent("Grid").ballId = i;
        
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
                // 清除所有的画笔
                // this.clearPath();
                cc.director.loadScene("Index");
                break;
            case "reset":
                // 重置数据
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
                gridItem.getChildByName("grid").color = new cc.Color(255,255,255,255);
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
        // 重置结果信息
        this.res = {};
    }
    touchMove(e: cc.Event.EventTouch): void {
        let res = this.getRowColByTouch(e);
        let targetNode = res.node;
        if(targetNode) {
            let gridComponent = targetNode.getComponent("Grid");
            let currentPath: cc.Vec2[] = this.movePath[this.currentId];
            // 最后一次的move坐标值和当前move坐标值的差值
            if(this.currentId !== -1 && currentPath) {
                let moveLen: number = currentPath.length;
                // 取出最后一个坐标值
                let lastVec = currentPath[moveLen - 1];
                // 最后点击的坐标值与路径中上一个坐标值x,y相差为1不允许这种操作
                if(Math.abs(lastVec.x - res.p.x) === 1 && Math.abs(lastVec.y - res.p.y) === 1) {
                    // 斜着走不允许
                    this.canMove = false;
                } else if(Math.abs(lastVec.x - res.p.x) > 1 && Math.abs(lastVec.y - res.p.y) === 1) {
                    // 跨列走不允许
                    this.canMove = false;
                } else if(Math.abs(lastVec.y - res.p.y) > 1 && Math.abs(lastVec.x - res.p.x) === 1) {
                    // 跨行走不允许
                    this.canMove = false;
                } else {
                    let offsetX = res.p.x - lastVec.x;
                    let offsetY = res.p.y - lastVec.y;
                    // 网格的行列
                    let row = res.p.x;
                    let col = res.p.y;
                }
            }
            // if(e.getLocation().x )
            if(this.canMove && res.p.x !== -1 && res.p.y !== -1 && currentPath) {
                // 获得圆点的id号
                // let id = this.ballMap[res.p.x][res.p.y].getComponent("Ball").id;
                if(this.map[res.p.x][res.p.y] && this.ballMap[res.p.x][res.p.y]) {
                    // 经过的是小圆点 如果小圆点的颜色和起始点的颜色不一样就不会改变grid的颜色否则会改变也即是id相同 id来源（点击小圆点获得，点击路径获得）
                    if(this.ballMap[this.startVec.x][this.startVec.y] && this.ballMap[res.p.x][res.p.y].getComponent("Ball").id === this.ballMap[this.startVec.x][this.startVec.y].getComponent("Ball").id) {
                        gridComponent.changeColor = true;
                        gridComponent.pathId = this.currentId;
                        this.isPair = true;
                        targetNode.getChildByName("grid").color = new cc.Color(this.moveStartColor.getR(),this.moveStartColor.getG(),this.moveStartColor.getB(),this.moveStartColor.getA());
                        // 播放音效
                        if(res.p.x !== this.startVec.x || res.p.y !== this.startVec.y)
                            cc.audioEngine.play(this.lineAudio,false,1);
                    } else {
                        // 点击开始点不是圆点获得移动
                        if(this.isContinue && this.curMoveId === this.ballMap[res.p.x][res.p.y].getComponent("Ball").id) {
                            gridComponent.changeColor = true;
                            gridComponent.pathId = this.curMoveId;
                            
                            this.isPair = true;
                            targetNode.getChildByName("grid").color = new cc.Color(this.moveStartColor.getR(),this.moveStartColor.getG(),this.moveStartColor.getB(),this.moveStartColor.getA());
                            // 播放音效
                            cc.audioEngine.play(this.lineAudio,false,1);
                        }
                    }
    
                    if((res.p.x !== this.startVec.x || res.p.y !== this.startVec.y) && this.map[res.p.x][res.p.y]) {
                        // 移动的对象不是起点的话可以不让它继续向前移动
                        this.canMove = false;
                    }
                    // 加入到移动队列中去(网格中圆点的id和当前点击的id是同一个)
                    if(!Util.isContainVec2(res.p,currentPath) && (gridComponent.ballId === this.currentId)) {
                        currentPath.push(res.p);
                    }
                    this.checkBackAndDeal(currentPath,res);
                } else {
                    // 如果经过的网格没有颜色
                    if(!gridComponent.changeColor && !this.isContinue) {
                        // 经过的网格没有被染色
                        gridComponent.changeColor = true;
                        gridComponent.pathId = this.currentId;
                        // 经过的是网格 设置网格的颜色为当前移动的颜色
                        targetNode.getChildByName("grid").color = new cc.Color(this.moveStartColor.getR(),this.moveStartColor.getG(),this.moveStartColor.getB(),this.moveStartColor.getA());
                        // 加入到移动路径中
                        if(this.canMove && !Util.isContainVec2(res.p,currentPath)) {
                            currentPath.push(res.p);
                        }
                    } else if(!gridComponent.changeColor && this.isContinue) {
                        // 在这种情况的时候回就绪划线操作
                        // let pathid = gridComponent.pathId;
                        if(this.curMoveId !== -1) {
                            gridComponent.changeColor = true;
                            gridComponent.setColor(this.curMoveColor);
                            gridComponent.pathId = this.curMoveId;
                        }
                        // 加入到移动队列（graphics会绘制移动队列里面的点）
                        if(this.canMove && !Util.isContainVec2(res.p,this.movePath[this.curMoveId])) {
                            this.movePath[this.curMoveId].push(res.p);
                        }
    
                    } else {
                        this.checkBackAndDeal(currentPath,res);
                    }
                }
            }
            // 检查是否过关
            // this.checkIsPass();
        }
    }
    // 处理回退连线
    private checkBackAndDeal(currentPath: cc.Vec2[],res: {"p": cc.Vec2,"node": cc.Node}): void {
        // 判断该点是否是路径数组的倒数第二个路径 是的话就删除最后一个路径点
        let pathLen: number = currentPath.length;
        let moveIndex: number = -1;
        for(let i = 0; i < pathLen; i++) {
            if(res.p.x === currentPath[i].x && res.p.y === currentPath[i].y) {
                moveIndex = i;
            }
        }
        if(moveIndex !== -1 && (moveIndex === pathLen - 2)) {
            let lastInfo: cc.Vec2 = currentPath[pathLen - 1];
            let lastGridCom = this.gridMap[lastInfo.x][lastInfo.y].getComponent("Grid");
            lastGridCom.changeColor = false;
            lastGridCom.pathId = -1;
            // gridItem.getChildByName("grid").color = new cc.Color(255,255,255,255);
            this.gridMap[lastInfo.x][lastInfo.y].getChildByName("grid").color = new cc.Color(255,255,255,255);
            // 清除它的路径信息
            currentPath.splice(pathLen - 1,1);
        }
    }
    touchBegin(e: cc.Event.EventTouch): boolean {
        let res = this.getRowColByTouch(e);
        let targetNode = res.node;
        if(targetNode) {
            // 获得点击小圆点的id
            let circleNode: cc.Node = this.ballMap[res.p.x][res.p.y];
            this.canMove = true;
            // 获得小圆点上的id
            if(circleNode && circleNode.getComponent("Ball")) {
                this.currentId = circleNode.getComponent("Ball").id;
            }
            // 当最后点击的id和当前点击的圆点的id相同的时候清空路径 && 点击的不是空白网格
            if(this.map[res.p.x][res.p.y]) {
                let ballId = circleNode.getComponent("Ball").id;
                let tempArrLen = this.movePath[ballId].length;
                // 清除之前的路径
                for(let i = 0; i < tempArrLen; i++) {
                    let moveItem = this.movePath[ballId][i];
                    let tempNode = this.gridMap[moveItem.x][moveItem.y];
                    tempNode.getComponent("Grid").changeColor = false;
                    let gridNode = tempNode.getChildByName("grid");
                    gridNode.color = new cc.Color(255,255,255,255);
                }
                this.movePath[ballId] = [];
                // 清除对应的画笔
                // let currentGraphic = this.gtxArr[ballId];
                // currentGraphic.clear();
                this.isReStart = true;
            } else if(!this.map[res.p.x][res.p.y] && this.gridMap[res.p.x][res.p.y].getComponent("Grid").changeColor){
                // 点击了空白网格区域并且颜色已经改变了 可以接上之前的颜色进行移动
                this.canMove = true;
                this.isContinue = true;
                if(this.gridMap[res.p.x][res.p.y].getComponent("Grid").pathId !== -1) {
                    this.currentId = this.gridMap[res.p.x][res.p.y].getComponent("Grid").pathId;
                }
                let pathid = targetNode.getComponent("Grid").pathId;
                this.curMoveId = pathid;
                this.curMoveColor = targetNode.getComponent("Grid").getColor();
    
            }
            else if(!circleNode) {
                this.canMove = false;
            }
            this.startVec = res.p;
            if(this.ballMap[res.p.x][res.p.y] && !Util.isContainVec2(this.startVec,this.movePath[this.currentId])) {
                if(!Util.isContainVec2(this.startVec,this.movePath[this.currentId])) {
                    this.movePath[this.currentId].push(this.startVec);
                }
            }
            
            // 打开可以移动的开关
            
            if(res.p.x !== -1 && res.p.y !== -1 && targetNode != null && this.canMove) {
                let gridTarget;
                // 变换底色
                for(let i = 0; i < this.ballArr.length; i++) {
                    if(res.p.x === this.ballArr[i].getComponent("Ball").row &&
                       res.p.y === this.ballArr[i].getComponent("Ball").col &&
                       this.map[res.p.x][res.p.y]) {
                           let circleItem = this.ballArr[i];
                           
                           // 查找网格背景
                           gridTarget = this.gridMap[res.p.x][res.p.y];
                          
                           // 设置颜色是否改变了
                           gridTarget.getComponent("Grid").changeColor = true;
                           gridTarget.getComponent("Grid").pathId = this.currentId;
                           let realTarget: cc.Node = gridTarget.getChildByName("grid");
                           realTarget.color = new cc.Color(circleItem.color.getR() / 4,circleItem.color.getG() / 4,circleItem.color.getB() / 4,20);
                        //    realTarget.opacity = 100;
                           this.moveStartColor = realTarget.color;
                        //    targetNode.color = new cc.Color(circleItem.color.getR(),circleItem.color.getG(),circleItem.color.getB(),circleItem.color.getA() / 2);
                    }
                }
                // 点击的不是圆点对象是
                if(this.isContinue) {
                    // 查找网格背景
                    gridTarget = this.gridMap[res.p.x][res.p.y];
                    // 设置颜色是否改变了
                    gridTarget.getComponent("Grid").changeColor = true;
                    gridTarget.getComponent("Grid").pathId = this.currentId;
                    let realTarget = gridTarget.getChildByName("grid");
                    this.moveStartColor = realTarget.color;
                }
            }
            // 最后一次触摸的点的ID
            this.lastId = this.currentId;
            return true;
        }
    }
    touchEnd(e: cc.Event.EventTouch): void {
        console.log("touchend");
        let res = this.getRowColByTouch(e);
        this.endVec = res.p;
        let targetNode = res.node;
        if(targetNode) {
            // 获得点击小圆点的id
            let circleNode: cc.Node = this.ballMap[res.p.x][res.p.y];
            // 获得小圆点上的id
            let targetId: number = -1;
            if(circleNode && circleNode.getComponent("Ball")) {
                targetId = circleNode.getComponent("Ball").id;
            }
            console.log("before end path is ",this.movePath);
            
            this.isContinue = false;
            this.isReStart = false;
            // 判断游戏是否过关
            console.log("path is ",this.movePath);
        }
        // 检测是否过关
        this.checkIsPass();
    }
    
    onDestroy() {
        this.gridCon.off("touchstart",this.touchBegin,this);
        this.gridCon.off("touchmove",this.touchMove,this);
        this.gridCon.off("touchend",this.touchEnd,this);
        // if(this.successAnimation) {
        //     this.successAnimation.off("finished",this.successOver,this);
        // }

        this.clearPath();
        // 清除移动path
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
        this.drawPath();
        
    }
    // 清除所有的路径信息
    private clearPath(): void {
        if(this.levelData && this.levelData.json[Global.level]) {
            let levelNumber = this.levelData.json[Global.level].length;
            let curId: number = this.currentId;
            let self = this;
            // 遍历所有的路径
            for(let i = 0; i < levelNumber; i++) {
                if(self.gtxArr) {
                    // 清除路径重要
                    self.gtxArr[i].clear(true);
                    // 自己手动释放
                    if(cc.isValid(self.gtxArr[i].node)) {
                        self.gtxArr[i].node.destroy();
                    }
                }                    
            }
            self.gtxArr = [];
        }
    }
    // 重新绘制路径信息
    private drawPath(): void {
        if(this.levelData && this.levelData.json[Global.level]) {
            let levelNumber = this.levelData.json[Global.level].length;
            let curId: number = this.currentId;
            let self = this;
            // 遍历所有的路径
            for(let i = 0; i < levelNumber; i++) {
                if(self.movePath[i].length >= 2) {
                    // 绘制直线
                    let curColor;
                    let dataLen = self.levelData.json[Global.level].length;
                    let dataItem = self.levelData.json[Global.level][i];
                    // 绘制点前点击对应的画线id
                    curColor = new cc.Color(dataItem.color[0],dataItem.color[1],dataItem.color[2],dataItem.color[3]);
                    // if(this.checkPathValid(self.movePath[curId],curId)) {
                    self.gtxArr[i].strokeColor = curColor;
                    let movePathLen = self.movePath[i].length;
                    // 清除路径重要
                    self.gtxArr[i].clear();
                    for(let m = 0; m < movePathLen; m++) {
                        let p = self.aArr[self.movePath[i][m].x][self.movePath[i][m].y];
                        if(m === 0) {
                            self.gtxArr[i].moveTo(p.x,p.y);
                        } else {
                            self.gtxArr[i].lineTo(p.x,p.y);
                        }
                    }
                    self.gtxArr[i].stroke();
                } else {
                    self.gtxArr[i].clear();
                }
            }
            
        }
    }
    // 检测是否过关
    private checkIsPass(): boolean {
        let res: boolean = false;
        let self = this;
        // 配置文件中的关卡数据数组
        let levelData = self.levelData.json[Global.level];
        let moveKeys = Object.keys(self.movePath);
        let rightNum: number = 0;
        // let obj = {};
        if(self.levelData && levelData && (levelData.length === moveKeys.length)) {
            let levelNumber = levelData.length;
            // 遍历所有的路径
            for(let i = 0; i < levelNumber; i++) {
                // 绘制直线
                // let dataLen = levelData.length;
                let dataItem = levelData[i];
                let movePathItem: cc.Vec2[] = self.movePath[i];
                let pathArr: number[][] = dataItem.path;

                if(movePathItem.length === pathArr.length) {
                    let singlePathRight: number = 0;
                    let checkRes = this.checkPathArrIsEqual(movePathItem,pathArr);
                    if(checkRes) {
                        this.res[`${i}`] = true;
                    }
                }
                
            }
        }
        console.log("obj is ",this.res);
        if(Object.keys(this.res).length === levelData.length) {
            res = true;
            // 层级管理器显示遮罩
            LayerManager.getInstance().showMask(true);
            // 显示菜单信息
            LayerManager.getInstance().showSprite(cc.instantiate(this.menuPrefab),"menu");
        }
        return res;
    }
    private checkPathArrIsEqual(pathItem: cc.Vec2[],pathArr: number[][]): boolean {
        let pathItemArr: any[] = [];
        
        for(let i = 0,len = pathItem.length; i < len; i++) {
            pathItemArr[i] = [];
            pathItemArr[i][0] = pathItem[i].x;
            pathItemArr[i][1] = pathItem[i].y;

        }
        console.log(`pathItemArr is `,pathItemArr);
        let rightNumber: number = 0;
        for(let m = 0,len = pathItemArr.length; m < len; m++) {
            if((pathItemArr[m][0] === pathArr[m][0] && pathItemArr[m][1] === pathArr[m][1]) ||
               (pathItemArr[m][0] === pathArr[len - 1 - m][0] && pathItemArr[m][1] === pathArr[len - 1 - m][1])) {
                rightNumber++;
            }
        }
        if(rightNumber === pathArr.length) {
            return true;
        }
        return false;
    }
}

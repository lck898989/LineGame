/***
 * 
 * 游戏场景层级管理器
 * 1: 弹出层
 * 2：动画层
 * 3：游戏层
 * 4：视频层
 */

const {ccclass, property} = cc._decorator;
enum Layer {
    GAME,
    MASK,
    TOAST,
    ANIMATION,
    TEXTURE,
    VIDEO
}
@ccclass
export default class LayerManager extends cc.Component {
    private offset: number = 100;
    // private static node: cc.Node = LayerManager.node;
    private static _instance: LayerManager = null;

    private animationState: cc.AnimationState = null;
    /**
     * 动画缓存
     * {
     *      "key": ""
     * }
     */
    private animationCache: Object = {};
    
    @property(cc.Node)
    maskLayer: cc.Node = null;
    @property(cc.Node)
    toastLayer: cc.Node = null;
    @property(cc.Node)
    animationLayer: cc.Node = null;
    @property(cc.Node)
    texLayer: cc.Node = null;
    @property(cc.Node)
    videoLayer: cc.Node = null;

    private layerNode: cc.Node = null;
    
    onLoad () {
        this.layerNode = cc.find("layer");
        cc.find("layer").active = false;       
    }
    public static getInstance(): LayerManager {
        if(!this._instance) {
            this._instance = new LayerManager();
        }
        
        return this._instance;
    }
    // 显示遮罩
    public showMask(isShow: boolean): void {
        if(!this.maskLayer) {
            let managerCom: cc.Component = cc.find("layer").getComponent("LayerManager");
            let layerNode: cc.Node = managerCom.node;
            this.maskLayer = cc.find("layer").getChildByName("mask");
        }
        if(this.maskLayer) {
            this.maskLayer.parent.active = true;
            if(isShow) {
                this.maskLayer.active = true;
                this.maskLayer.zIndex = this.offset + Layer.MASK;
            } else {
                this.maskLayer.active = false;
                // LayerManager._instance.maskLayer.zIndex = this.offset + Layer.MASK;
            }
        }

    }
    /**
     * @param  {cc.Node} node 需要添加的图片节点可以是一个预制体的实例也可以是一个空节点
     * @param  {string} name 添加到父节点的该节点名字
     */
    public showSprite(node: cc.Node,name: string) {
        // 将该node添加到空节点下
        node.name = name;
        if(!this.texLayer) {
            let managerCom: cc.Component = cc.find("layer").getComponent("LayerManager");
            let layerNode: cc.Node = managerCom.node;
            this.texLayer = layerNode.getChildByName("tex");
        }
        if(this.texLayer) {
            this.texLayer.parent.active = true;
            this.texLayer.active = true;
            node.scale = 0.5;
            // if(node.parent.)
            console.log("texlyaer's active is ",this.texLayer.active);
            console.log("node is ",node);
            node.addComponent(cc.Widget);
            let widget: cc.Widget = node.getComponent(cc.Widget);
            widget.left = (cc.find("layer").width - node.width) / 2;
            widget.right = (cc.find("layer").width - node.width) / 2;
            widget.target = cc.find("layer");
            this.texLayer.addChild(node);
            // to(duration: number, props: any, opts: {progress: Function; easing: Function|string; })
            cc.tween(node).to(0.5,{
                scale: 1,
                angle: 360
            }).start().call(() => {
                console.log("动画播放完毕");
            });
            // 设置层级关系
            this.texLayer.zIndex = this.offset + Layer.TEXTURE;
        }
    }
    public removeSprite(name: string) {
        if(!this.texLayer) {
            let managerCom: cc.Component = cc.find("layer").getComponent("LayerManager");
            let layerNode: cc.Node = managerCom.node;
            this.texLayer = layerNode.getChildByName("tex");
        }
        if(this.texLayer) {
            let spriteTemp: cc.Node = this.texLayer.getChildByName(name);
            if(spriteTemp) {
                // destroy该节点
                spriteTemp.destroy();
            }
        }
    }
    // 显示对话框
    public showToast(toastNode: cc.Node): void {
        if(!this.toastLayer) {
            let managerCom: cc.Component = cc.find("layer").getComponent("LayerManager");
            let layerNode: cc.Node = managerCom.node;
            this.toastLayer = layerNode.getChildByName("toast");
        }
        if(this.toastLayer) {
            this.toastLayer.parent.active = true;
            this.toastLayer.active = true;
            this.toastLayer.active = true;
            this.toastLayer.addChild(toastNode);
            this.toastLayer.zIndex = this.offset + Layer.TOAST;
        }
    }
    /**
     * ============废弃=============
     * @param  {string} animationName 要播放的动画名称
     * @param  {number} playTime 参数播放次数
     * @param  {any} target 动画播放完毕的回调函数的target
     * @param  {Function} animationOverCallBack 动画播放完毕的回调函数
     * @returns void
     public showAnimation(animationName: string,playTime: number = 1,target: any,animationOverCallBack?: (e: cc.Event.EventCustom) => void): void {
         let that = this;
         if(!this.animationLayer) {
             let managerCom: cc.Component = cc.find("layer").getComponent("LayerManager");
             let layerNode: cc.Node = managerCom.node;
             this.animationLayer = layerNode.getChildByName("animation");
         }
         if(this.animationLayer) {
             this.animationLayer.parent.active = true;
             this.animationLayer.active = true;
             this.animationLayer.active = true;
             this.animationLayer.zIndex = this.offset + Layer.ANIMATION;
             let self = this;
             let animationCom: cc.Animation = this.animationLayer.getComponent(cc.Animation);
             // 缓存中没有找到
             if(!this.animationCache[animationName]) {
                 cc.loader.loadRes(`animation/${animationName}`,cc.AnimationClip,(err,clip) => {
                     if(err) {
                         return;
                     }
                     animationCom.defaultClip = clip;
                     // 将clip放到缓存中存储
                     that.animationCache[animationName] = clip;
                     // 加载完整之后自动播放
                     animationCom.playOnLoad = true;
                     that.animationState = animationCom.play();
                     // // 设置动画播放次数
                     // this.animationState.repeatCount = playTime;
                     if(animationOverCallBack) {
                         // 动画执行完毕执行回调函数
                         animationCom.on("finished",animationOverCallBack,target);
                     }
                 });
             } else {
                 animationCom.defaultClip = this.animationCache[animationName];
                 // 加载完整之后自动播放
                 animationCom.playOnLoad = true;
                 this.animationState = animationCom.play();
                 // 设置动画播放次数
                 // this.animationState.repeatCount = playTime;
                 if(animationOverCallBack) {
                     // 动画执行完毕执行回调函数
                     animationCom.on("finished",animationOverCallBack,target);
                 }
             }
 
         }
     }
     */
    /**
     * ==========废弃==========
     * @param animationName 
     * 
     public deleteAnimation(animationName: string) {
         if(animationName !== "") {
             // 停止动画
             this.animationLayer.getComponent(cc.Animation).stop();
             // 清空内存
             this.animationLayer.getComponent(cc.Animation).defaultClip = null;
             this.animationLayer.active = false;
         }
     }
     public clearAnimationCache(): void {
         this.animationCache = {};
     }
     * 
     */
    start () {

    }

    // update (dt) {}
}

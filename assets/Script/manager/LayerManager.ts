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
    VIDEO
}
@ccclass
export default class LayerManager extends cc.Component {
    private static offset: number = 100;
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
    videoLayer: cc.Node = null;

    onLoad () {
        this.node.active = false;
    }
    public static getInstance(): LayerManager {
        if(!this._instance) {
            this._instance = new LayerManager();
        }
        return this._instance;
    }
    // 添加到
    public static showMask(isShow: boolean): void {
        if(this._instance && this._instance.maskLayer) {
            this._instance.node.active = true;
            if(isShow) {
                this._instance.maskLayer.active = true;
                this._instance.maskLayer.zIndex = this.offset + Layer.MASK;
            } else {
                this._instance.maskLayer.active = false;
                // this._instance.maskLayer.zIndex = this.offset + Layer.MASK;
            }
        }

    }
    // 显示对话框
    public static showToast(toastNode: cc.Node): void {
        if(this._instance && this._instance.toastLayer) {
            this._instance.node.active = true;
            this._instance.toastLayer.active = true;
            this._instance.toastLayer.addChild(toastNode);
            this._instance.toastLayer.zIndex = this.offset + Layer.TOAST;
        }
    }
    /**
     * @param  {string} animationName 要播放的动画名称
     * @param  {number} playTime 参数播放次数
     * @param  {any} target 动画播放完毕的回调函数的target
     * @param  {Function} animationOverCallBack 动画播放完毕的回调函数
     * @returns void
     */
    public static showAnimation(animationName: string,playTime: number = 1,target: any,animationOverCallBack?: (e: cc.Event.EventCustom) => void): void {
        if(this._instance && this._instance.animationLayer) {
            this._instance.node.active = true;
            this._instance.animationLayer.active = true;
            this._instance.animationLayer.zIndex = this.offset + Layer.ANIMATION;
            let self = this;
            let animationCom: cc.Animation = self._instance.animationLayer.getComponent(cc.Animation);
            // 缓存中没有找到
            if(!self._instance.animationCache[animationName]) {
                cc.loader.loadRes(`animation/${animationName}.anim`,cc.AnimationClip,(err,clip) => {
                    if(err) {
                        return;
                    }
                    animationCom.defaultClip = clip;
                    // 将clip放到缓存中存储
                    self._instance.animationCache[animationName] = clip;
                    
                });
            } else {
                animationCom.defaultClip = self._instance.animationCache[animationName];
            }
            // 加载完整之后自动播放
            animationCom.playOnLoad = true;
            self._instance.animationState = animationCom.play();
            // 设置动画播放次数
            self._instance.animationState.repeatCount = playTime;
            if(animationOverCallBack) {
                // 动画执行完毕执行回调函数
                animationCom.on("finished",animationOverCallBack,target);
            }

        }
    }
    public static deleteAnimation(animationName: string) {
        if(animationName !== "") {
            // 停止动画
            this._instance.animationLayer.getComponent(cc.Animation).stop();
            // 清空内存
            this._instance.animationLayer.getComponent(cc.Animation).defaultClip = null;
            this._instance.animationLayer.active = false;
        }
    }
    public static clearAnimationCache(): void {
        this._instance.animationCache = {};
    }
    start () {

    }

    // update (dt) {}
}

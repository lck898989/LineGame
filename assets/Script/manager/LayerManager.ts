/***
 * 
 * 游戏场景层级管理器
 * 1: 弹出层
 * 2：动画层
 * 3：游戏层
 * 4：视频层
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class LayerManager extends cc.Component {
    private static _instance: LayerManager = null;
    onLoad () {

    }
    public static getInstance(): LayerManager {
        if(!this._instance) {
            this._instance = new LayerManager();
        }
        return this._instance;
    }
    start () {

    }

    // update (dt) {}
}

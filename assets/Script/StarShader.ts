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
export default class StarShader extends cc.Component {

    _material: any;
    private _start: number = 0;
    onLoad () {

    }

    start () {
        this._material = this.node.getComponent(cc.Sprite).sharedMaterials[0];
    }

    update (dt) {
        if(this.node.active && this._material) {
            this.setShaderTime(dt);
        }
    }
    private setShaderTime(dt: number) {
        let start = this._start;
        if(start > 65535) {
            start = 0;
        }
        start += 0.01;
        // console.log("_material's effect is ",this._material.effect);
        if(this._material.effect) {
            this._material.effect.setProperty('u_time',start);
            this._start = start;
            
        }
    }
}

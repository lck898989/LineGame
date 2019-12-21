export default class Global {
    // 关卡
    public static level: number = 1;
    // 预制体节点缓存
    public static prefabBuffer: cc.Prefab[] = [];
    // 圆点颜色数量
    public static totalColorCout: number = 7;
    public static layerNode: cc.Node = null;
    // 预加载预制体组件
    public static async preLoadPrefabs(callback: Function) {
        let PromiseArr: Promise<cc.Prefab>[] = [];
        for(let i = 0; i < this.totalColorCout; i++) {
            console.log("i is ",i);
            let promiseItem: Promise<cc.Prefab> = new Promise((resolve,reject) => {
                cc.loader.loadRes("balls/" + i,(err,prefab: cc.Prefab) => {
                    if(err) {
                        reject("error");
                    }
                    resolve(prefab);
                    let name = prefab.name;
                    // this.prefabBuffer[name] = prefab;
                    this.prefabBuffer.push(prefab);
                });
            });
            let promiseRes: cc.Prefab = await promiseItem;
            PromiseArr.push(promiseItem);
        }
        if(PromiseArr.length > 0) {
            Promise.all(PromiseArr).then(() => {
                callback();
            });
        }
    }
    
}
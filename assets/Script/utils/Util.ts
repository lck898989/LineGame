export default class Util {
    // 去重方法
    public static uniqueArr(arr: cc.Vec2[]): cc.Vec2[] {
        let res: cc.Vec2[] = null;
        
        return res;
    }
    public static isContainVec2(vec: cc.Vec2,arr: cc.Vec2[]): boolean {
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].x === vec.x && arr[i].y === vec.y) {
                return true;
            }
        }
        return false;
    }
}
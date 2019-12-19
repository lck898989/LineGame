// 声音管理类
export default class AudioManager {
    private static _instance: AudioManager;

    private currentBgMusic: number = -1;
    // 背景音乐缓冲
    private bgCache: Object = {};
    // 音效缓存
    private effectCache: Object = {};
    // 音量
    private volume: number = 1;
    // 默认是开启音效的
    private musicOn: boolean = true;

    public static getInstance(): AudioManager {
        if(!this._instance) {
            this._instance = new AudioManager();
        }
        if(!cc.sys.localStorage.getItem("music")) {
            // 默认开启音效
            cc.sys.localStorage.setItem("music",1);
        }
        return this._instance;
    }
    
    // 播放背景音乐
    public async playBg(url: string,loop: boolean,volume?: number) {
        
        console.log("url is ",typeof url);
        if(typeof url === "string") {
            let that = this;
            if(typeof volume === 'number') {
                if(volume > 1) {
                    volume = 1;
                } else if(volume < 0) {
                    volume = 0;
                }
            } else {
                volume = this.volume;
            }
            console.log("bgCache is ",this.bgCache[url]);
            if(!this.bgCache[url]) {
                console.log("raw(url) is ",cc.url.raw(url));
                // 动态加载资源
                let clip = await new Promise((resolve,reject) => {
                    cc.loader.loadRes(url,(err,clip: cc.AudioClip) => {
                        if(err) {
                            console.log("err is ",err);
                            reject(err);
                            return;
                        }
                        resolve(clip);
                    });
                });
                this.bgCache[url] = clip;
                if(this.musicOn) {
                    this.currentBgMusic = cc.audioEngine.play(this.bgCache[url],loop,volume);
                }

            } else {
                if(this.musicOn) {
                    this.currentBgMusic = cc.audioEngine.play(this.bgCache[url],loop,volume);
                }
            }
        }
    }
    public stopBg(id: number) {
        // 暂停音乐
        cc.audioEngine.pause(id);
    }
    // 播放音效
    public playEffect(url: string) {
        if(!this.musicOn) {
            return;
        }
        if(typeof url === "string") {
            let self = this;
            if(!this.effectCache[url]) {
                cc.loader.loadRes(url,(err,clip: cc.AudioClip) => {
                    if(err) {
                        return;
                    }
                    self.effectCache[url] = clip;
                });
            }
            cc.audioEngine.play(this.effectCache[url],false,this.volume);
        }
    }
    // 开启音效(1为开启，0为关闭)
    public turnOnMusic(): void {
        // let clipTemp: cc.AudioClip = this.bgCache[Object.keys(this.bgCache)[0]];
        // cc.audioEngine.play(clipTemp,true,0.7);
        if(this.currentBgMusic !== -1) {
            cc.audioEngine.resume(this.currentBgMusic);
        }
        cc.sys.localStorage.setItem("music",1);
        this.musicOn = true;
    }
    // 关闭音效
    public turnOffMusic(): void {
        // 关闭音效
        this.stopBg(this.currentBgMusic);
        cc.sys.localStorage.setItem("music",0);
        this.musicOn = false;
    }
    // 获取音效状态（是开启还是关闭）
    public getMusicState(): boolean {
        let musicState: number = cc.sys.localStorage.getItem("music");
        return musicState == 1 ? true : false;
    }
    // 设置音效
    public setVolume(volume: number): void {
        if(volume > 1 || volume < 0) {
            if(volume > 1) {
                this.volume = 1;
            } else {
                this.volume = 0;
            }
        } else {
            this.volume = volume;
        }
    }

}

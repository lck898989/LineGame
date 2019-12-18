// 声音管理类
class AudioManager {
    private static _instance: AudioManager;

    public static getInstance(): AudioManager {
        if(!this._instance) {
            this._instance = new AudioManager();
        }
        return this._instance;
    }
    private currentBgMusic: number;
    // 背景音乐缓冲
    private bgCache: {};
    // 音量
    private volume: number = 1;
    private bgOn: boolean = false;
    
    // 播放背景音乐
    public playBg(url: string,loop: boolean,volume?: number) {
        if(typeof url === "string") {
            if(typeof volume === 'number') {
                if(volume > 1) {
                    volume = 1;
                } else if(volume < 0) {
                    volume = 0;
                }
            } else {
                volume = this.volume;
            }
            if(!this.bgCache[url]) {
                // 动态加载资源
                cc.loader.loadRes(url,cc.AudioClip,(err,clip: cc.AudioClip) => {
                    if(err) {
                        return;
                    }
                    this.bgCache[url] = clip;
                });
            }
            this.currentBgMusic = cc.audioEngine.play(this.bgCache[url],loop,volume);
        }
    }
    public stopBg(id: number) {
        cc.audioEngine.stop(id);
    }

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

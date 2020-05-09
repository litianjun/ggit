(function($,root){
    // play pause getAudio
    function AudioManger(src){
        // 创建一个audio对象
        this.audio = new Audio();
        //  audio默认状态
        this.status = 'pause';
    }
    AudioManger.prototype = {
        play:function(){
            this.audio.play();
            this.status = 'play';
        },
        pause: function(){
            this.audio.pause();
            this.status = 'pause';
        },
        getAudio: function(src){
            console.log(src)
            this.audio.src = src;
            this.audio.load();
        }
    }
    root.audioManger = new AudioManger();
}(window.Zepto,window.player || (window.player = {})));
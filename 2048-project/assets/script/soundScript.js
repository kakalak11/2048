// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        soundButtonText: cc.Label,
        swipeSound: cc.AudioSource,
        combineSound: cc.AudioSource,
        _muted: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onClickSound: function () {
        if (!this._muted) {
            this.node.children.forEach(element => element.getComponent(cc.AudioSource).volume = 0);
            this.soundButtonText.string = 'Sounds OFF';
            this._muted = true;
            return;
        }
        this.node.children.forEach(element => element.getComponent(cc.AudioSource).volume = 1);
        this.soundButtonText.string = 'Sounds ON';
        this._muted = false;
        return;
    },

    _playSound: function (data) {
        if (data === 'swipe') {
            this.swipeSound.play();
            return;
        }
        if (data === 'combine') {
            this.combineSound.play();
            return;
        }
    },

    onLoad() {
        Emitter.instance.registerEvent('sound', this._playSound.bind(this));
    },

    start() {

    },

    // update (dt) {},
});

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
    },

    // LIFE-CYCLE CALLBACKS:

    onClickPlayButton: function () {
        Emitter.instance.emit('hideMenu');
    },

    onClickMenuButton: function () {
        Emitter.instance.emit('showMenu');
    },

    _show: function () {
        this.node.runAction(cc.moveTo(0.5, 0, 0).easing(cc.easeExponentialInOut(0.5)));
    },

    _hide: function () {
        this.node.runAction(cc.moveTo(0.5, 500, 0).easing(cc.easeExponentialInOut(0.5)));
    },

    onLoad() {
        Emitter.instance.registerEvent('showMenu', this._show.bind(this));
        Emitter.instance.registerEvent('hideMenu', this._hide.bind(this));
    },

    start() {

    },

    // update (dt) {},
});

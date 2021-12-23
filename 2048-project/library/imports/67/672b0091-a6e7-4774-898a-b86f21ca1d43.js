"use strict";
cc._RF.push(module, '672b0CRpudHdImKuG8hyh1D', 'soundScript');
// script/soundScript.js

'use strict';

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        soundButtonText: cc.Label,
        swipeSound: cc.AudioSource,
        combineSound: cc.AudioSource,
        undoSound: cc.AudioSource,
        gameWin: cc.AudioSource,
        gameOver: cc.AudioSource,
        _muted: false
    },

    // LIFE-CYCLE CALLBACKS:

    onClickSound: function onClickSound() {
        if (!this._muted) {
            this.node.children.forEach(function (element) {
                return element.getComponent(cc.AudioSource).volume = 0;
            });
            this.soundButtonText.string = 'Sounds OFF';
            this._muted = true;
            return;
        }
        this.node.children.forEach(function (element) {
            return element.getComponent(cc.AudioSource).volume = 1;
        });
        this.soundButtonText.string = 'Sounds ON';
        this._muted = false;
        return;
    },

    _playSound: function _playSound(data) {
        if (data === 'swipe') {
            this.swipeSound.play();
            return;
        }
        if (data === 'combine') {
            this.combineSound.play();
            return;
        }

        if (data === 'gameWin') {
            this.gameWin.play();
            return;
        }
        if (data === 'gameOver') {
            this.gameOver.play();
            return;
        }
        if (data === 'undo') {
            this.undoSound.play();
            return;
        }
    },

    onLoad: function onLoad() {
        Emitter.instance.registerEvent('sound', this._playSound.bind(this));
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
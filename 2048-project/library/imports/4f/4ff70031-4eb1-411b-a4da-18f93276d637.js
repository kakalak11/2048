"use strict";
cc._RF.push(module, '4ff70AxTrFBG6TaGPkydtY3', 'keyboardScript');
// script/keyboardScript.js

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
        _canMove: true
    },

    // LIFE-CYCLE CALLBACKS:

    _onKeyDown: function _onKeyDown(event) {
        // cc.warn('key down', this._canMove);
        this.node.emit('setInput', false);
        if (!this._canMove) return;
        Emitter.instance.emit('canMove', false);
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.node.emit('moveRow', false);
                Emitter.instance.emit('sound', 'swipe');
                break;
            case cc.macro.KEY.d:
                this.node.emit('moveRow', true);
                Emitter.instance.emit('sound', 'swipe');
                break;
            case cc.macro.KEY.w:
                this.node.emit('moveCollumn', false);
                Emitter.instance.emit('sound', 'swipe');
                break;
            case cc.macro.KEY.s:
                this.node.emit('moveCollumn', true);
                Emitter.instance.emit('sound', 'swipe');
                break;
            default:
                Emitter.instance.emit('canMove');
                break;
        }
    },

    _reset: function _reset() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
    },
    onLoad: function onLoad() {
        var _this = this;

        Emitter.instance.registerEvent('canMove', function () {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            return _this._canMove = value;
        });
        this.node.on('reset', this._reset, this);
        this.node.on('setInput', function (touch) {
            if (touch) _this._canMove = false;
        }, this);
        Emitter.instance.registerEvent('start', function () {
            return cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, _this._onKeyDown, _this);
        });
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
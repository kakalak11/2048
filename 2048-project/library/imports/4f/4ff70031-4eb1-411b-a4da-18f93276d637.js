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

cc.Class({
    extends: cc.Component,

    properties: {
        _canMove: true
    },

    // LIFE-CYCLE CALLBACKS:

    _onKeyDown: function _onKeyDown(event) {
        this.node.emit('setInput', false);
        if (!this._canMove) return;
        this._canMove = false;
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.node.emit('moveRow', false);
                break;
            case cc.macro.KEY.d:
                this.node.emit('moveRow', true);
                break;
            case cc.macro.KEY.w:
                this.node.emit('moveCollumn', false);
                break;
            case cc.macro.KEY.s:
                this.node.emit('moveCollumn', true);
                break;
            default:
                this._canMove = true;
                break;

        }
    },

    _reset: function _reset() {
        cc.log('keyboard reset');
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
    },
    onLoad: function onLoad() {
        var _this = this;

        this._canMove = true;
        this.node.on('canMove', function () {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            _this._canMove = value;
        }, this);
        this.node.on('reset', this._reset, this);
        this.node.on('setInput', function (touch) {
            if (touch) _this._canMove = false;
        }, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
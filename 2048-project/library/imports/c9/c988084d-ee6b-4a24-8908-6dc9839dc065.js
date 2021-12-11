"use strict";
cc._RF.push(module, 'c9880hN7mtKJIkIbcmDncBl', 'gameBoard');
// script/gameBoard.js

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

var Emitter = require('event');

cc.Class({
    extends: cc.Component,

    properties: {
        tilesPrefab: cc.Prefab,
        tilesRow: [cc.Node]
    },

    // LIFE-CYCLE CALLBACKS:

    _onKeyDown: function _onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.space:
                this._moveRight();
                break;
        }
    },

    _moveRight: function _moveRight() {
        cc.log(this.tilesRow[0].number);
    },

    onLoad: function onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
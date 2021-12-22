"use strict";
cc._RF.push(module, '688deAYbdlDr4V81CNkMKEy', 'notificationScript');
// script/notificationScript.js

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
var utilities = require('./utils');
cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.RichText,
        _player: '',
        _score: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        Emitter.instance.registerEvent('notify', function (data) {
            _this._player = data.player;
            _this._score = data.score;
            cc.log(data);
        });
    },
    start: function start() {
        this.label.string = utilities.generateRainbowText('The best player is ' + this._player + ' with ' + this._score);
        var action = cc.repeatForever(cc.sequence(cc.moveTo(5, -500, 0), cc.moveTo(0, 500, 0)));
        this.label.node.runAction(action);
    }
}

// update (dt) {},
);

cc._RF.pop();
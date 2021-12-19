"use strict";
cc._RF.push(module, 'd5151/jsIBEQas95Jda5jHI', 'tilesScript');
// script/tilesScript.js

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
        number: 0,
        position: cc.Vec2,
        _index: null,
        _color: []
    },

    // LIFE-CYCLE CALLBACKS:

    setNumber: function setNumber(value) {
        this.number = value;
        this.node.getComponentInChildren(cc.Label).string = this.number;
        // this.node.color = new cc.Color(this._color[Math.log(2) / Math.log(this.number)]);
        this.node.color = new cc.Color('#eee4da');
    },

    moveCombine: function moveCombine(pos, time) {
        var _this = this;

        var currentPos = this.node.getPosition(cc.v2());
        this.node.dispatchEvent(new cc.Event.EventCustom('move', true));
        var action = cc.sequence(cc.moveTo(time, pos), cc.callFunc(function () {
            _this.setNumber(0);
            _this.node.active = false;
            _this.node.setPosition(currentPos);
        }));
        this.node.runAction(action);
    },

    onLoad: function onLoad() {
        // cc.log('tile prefab instantiated !');
        this._color = ['#eee4da', '#eedfc8', '#f3b079', '#ed8c55', '#f67c5e', '#ea5a38', '#f4d86b', '#f2d04b', '#e5c128', '#edc501', '#edc501'];
    },
    start: function start() {
        // if (this.number) {
        //     this.node.active = true;
        //     return;
        // };
        // this.node.active = false;
        // return;
    },
    update: function update(dt) {}
});

cc._RF.pop();
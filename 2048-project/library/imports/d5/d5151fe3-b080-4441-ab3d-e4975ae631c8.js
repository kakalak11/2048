"use strict";
cc._RF.push(module, 'd5151/jsIBEQas95Jda5jHI', 'tilesScript');
// scripts/prefab/tilesScript.js

'use strict';

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
        if (!parseInt(Math.log(this.number) / Math.log(2))) return;
        this.node.color = this._color[Math.log(this.number) / Math.log(2) - 1];
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

    onLoad: function onLoad() {},
    start: function start() {},
    update: function update(dt) {}
});

cc._RF.pop();
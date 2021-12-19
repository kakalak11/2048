"use strict";
cc._RF.push(module, '6cd4anyT4xKLqNnUPS5brir', 'prefabScript');
// scenes/testScript/prefabScript.js

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
        nodeSprite: cc.Node,
        nodeLabel: cc.Label,
        _pos: cc.Vec2,
        _index: null,
        _time: 0.25,
        _moving: null,
        number: 0
    },

    // LIFE-CYCLE CALLBACKS:

    _setPosition: function _setPosition(start) {
        var _this = this;

        if (this._moving) return;
        if (start) {
            this.node.setPosition(this._pos);
            return;
        }
        if (this.node.opacity === 0) {
            this.node.setPosition(this._pos);
            return;
        }
        this.node.once('position-changed', function () {
            _this.node.dispatchEvent(new cc.Event.EventCustom('moved', true));
            cc.log('pos change');
        }, this);
        this._moving = true;
        this.action = cc.sequence(cc.moveTo(this._time, cc.v2(this._pos)), cc.callFunc(function () {
            _this._moving = false;
            _this.node.dispatchEvent(new cc.Event.EventCustom('canMove', true));
            _this.node.dispatchEvent(new cc.Event.EventCustom('stop', true));
        }));
        this.node.runAction(this.action);
        return;
    },

    _setActive: function _setActive() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (data !== this._index || this.node.opacity !== 0) return;
        this.node.opacity = 255;
        this.number = Math.random() > 0.5 ? 2 : 4;
        this.nodeLabel.string = this.number;
        var action = cc.sequence(cc.scaleTo(this._time / 2, 1.2), cc.callFunc(function () {}), cc.scaleTo(this._time / 2, 1));
        this.node.runAction(action);
        return;
    },

    setNumber: function setNumber(number) {
        this.number = number;
        this.nodeLabel.string = this.number;
        return;
    },

    _getCombine: function _getCombine(data) {
        if (data.key !== this._index) return;
        // cc.log('this is the one get combine', data.key);
        this.number *= 2;
        this.nodeLabel.string = this.number;
        var action = cc.sequence(cc.scaleTo(this._time / 2, 1.2), cc.callFunc(function () {}), cc.scaleTo(this._time / 2, 1));
        this.node.runAction(action);
        return;
    },

    _setCombine: function _setCombine(data) {
        var _this2 = this;

        if (data.key !== this._index) return;
        this.number = 0;
        this.node.opacity = 0;
        this.nodeLabel.string = this.number;
        var action = cc.sequence(cc.moveTo(this._time, data.pos), cc.callFunc(function () {
            _this2.node.setPosition(_this2._pos);
        }));
        this.node.runAction(action);
        return;
    },

    onLoad: function onLoad() {
        Emitter.instance.registerEvent('setPosition', this._setPosition.bind(this));
        Emitter.instance.registerEvent('setActive', this._setActive.bind(this));

        Emitter.instance.registerEvent('getCombine', this._getCombine.bind(this));
        Emitter.instance.registerEvent('setCombine', this._setCombine.bind(this));
    },
    start: function start() {}
}

// update(dt) {},
);

cc._RF.pop();
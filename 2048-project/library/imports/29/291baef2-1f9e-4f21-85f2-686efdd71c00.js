"use strict";
cc._RF.push(module, '291ba7yH55PIYXyaG791xwA', 'touchScript');
// script/touchScript.js

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
        touchNode: cc.Node,
        _xDelta: 0,
        _yDelta: 0,
        _canTouch: true
    },

    // LIFE-CYCLE CALLBACKS:

    _onTouchStart: function _onTouchStart(event) {
        var _this = this;

        Emitter.instance.emit('sound', 'swipe');
        this.node.emit('setInput', true);
        if (!this._canTouch) return;
        this._canTouch = false;
        this.touchNode.on('touchmove', function (event) {
            var delta = event.touch.getDelta();
            this._xDelta += delta.x;
            this._yDelta += delta.y;
        }, this);

        this.touchNode.once('touchend', function (event) {
            var xDelta = event.getLocation().x - event.getStartLocation().x;
            var yDelta = event.getLocation().y - event.getStartLocation().y;
            cc.log('x delta is: ', xDelta, ', y delta is: ', yDelta);
            if (Math.abs(xDelta) === 0 && Math.abs(yDelta) === 0) {
                this._canTouch = true;
                return;
            }
            if (Math.abs(xDelta) > Math.abs(yDelta)) {
                if (xDelta > 0) {
                    this.node.emit('moveRow', true);
                    cc.log('move right');
                } else {
                    this.node.emit('moveRow', false);
                    cc.log('move left');
                }
            } else {
                if (yDelta > 0) {
                    this.node.emit('moveCollumn', false);
                    cc.log('move down');
                } else {
                    this.node.emit('moveCollumn', true);
                    cc.log('move up');
                }
            }
            this._canTouch = true;
            return;
        }, this);

        this.touchNode.on('touchcancel', function (event) {
            _this._canTouch = true;
            return;
        }, this);
    },

    onLoad: function onLoad() {
        var _this2 = this;

        this.touchNode.on('touchstart', this._onTouchStart, this);
        this.node.on('canMove', function () {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            return _this2._canTouch = value;
        }, this);
        this.node.on('setInput', function (touch) {
            if (!touch) _this2._canTouch = false;
        }, this);
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
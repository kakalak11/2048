(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/out-of-date/touchScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '291ba7yH55PIYXyaG791xwA', 'touchScript', __filename);
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
        Emitter.instance.emit('sound', 'swipe');
        this.node.emit('setInput', true);
        if (!this._canTouch) return;
        this._canTouch = false;

        this.touchNode.once('touchend', function (event) {
            var xDelta = event.getLocation().x - event.getStartLocation().x;
            var yDelta = event.getLocation().y - event.getStartLocation().y;
            cc.log('x delta is: ', xDelta, ', y delta is: ', yDelta);
            if (Math.abs(xDelta) === 0 && Math.abs(yDelta) === 0) {
                Emitter.instance.emit('canMove');
                return;
            }
            if (Math.abs(xDelta) > Math.abs(yDelta)) {
                if (xDelta > 0) {
                    Emitter.instance.emit('moveRow', true);
                    cc.log('move right');
                } else {
                    Emitter.instance.emit('moveRow', false);
                    cc.log('move left');
                }
            } else {
                if (yDelta > 0) {
                    Emitter.instance.emit('moveCollumn', false);
                    cc.log('move down');
                } else {
                    Emitter.instance.emit('moveCollumn', true);
                    cc.log('move up');
                }
            }
            Emitter.instance.emit('canMove');
            return;
        }, this);

        this.touchNode.on('touchcancel', function (event) {
            Emitter.instance.emit('canMove');
            return;
        }, this);
    },

    onLoad: function onLoad() {
        var _this = this;

        this.touchNode.on('touchstart', this._onTouchStart, this);
        Emitter.instance.registerEvent('canMove', function () {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            return _this._canTouch = value;
        });
        this.node.on('setInput', function (touch) {
            if (!touch) _this._canTouch = false;
        }, this);
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=touchScript.js.map
        
(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/keyboardScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4ff70AxTrFBG6TaGPkydtY3', 'keyboardScript', __filename);
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
        Emitter.instance.emit('sound', 'swipe');
        this.node.emit('setInput', false);
        if (!this._canMove) return;
        Emitter.instance.emit('canMove', false);
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
                Emitter.instance.emit('canMove');
                break;
        }
    },

    // moveLeft() { return this.node.emit('moveRow', false) },
    // moveRight() { return this.node.emit('moveRow', true) },
    // moveUp() { return this.node.emit('moveCollumn', false) },
    // moveDown() { return this.node.emit('moveCollumn', true) },

    // MoveRightCommand: function () { return },
    // MoveLeftCommand: function () { return },
    // MoveUpCommand: function () { return },
    // MoveDownCommand: function () { return },

    // Command: function (execute, undo) {
    //     this.execute = execute;
    //     this.undo = undo;
    // },

    // Action: function () {
    //     this.current = null;
    //     this.commands = [];

    //     return {
    //         _action(command) {
    //             var name = command.execute.toString().substr(9, 3);
    //             return name.charAt(0).toUpperCase() + name.slice(1);
    //         },

    //         execute(command) {
    //             this.current = command.execute(this.current);
    //             this.commands.push(command);
    //         },

    //         undo() {
    //             var command = commands.pop();
    //             this.current = command.undo(this.current);
    //         },

    //     }


    // },

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
        //# sourceMappingURL=keyboardScript.js.map
        
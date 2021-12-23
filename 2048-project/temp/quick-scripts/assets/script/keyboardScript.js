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

    ctor: function ctor() {
        this.moveRightCommand = new Command(this.moveRight, this.moveLeft);
        this.moveLeftCommand = new Command(this.moveLeft, this.moveRight);
        this.moveDownCommand = new Command(this.moveDown, this.moveUp);
        this.moveUpCommand = new Command(this.moveUp, this.moveDown);

        this.action = new Action();
    },


    // LIFE-CYCLE CALLBACKS:

    _onKeyDown: function _onKeyDown(event) {
        // cc.warn('key down', this._canMove);
        this.node.emit('setInput', false);
        if (!this._canMove) return;
        Emitter.instance.emit('canMove', false);
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                // Emitter.instance.emit('moveRow', false);
                this.action.execute(this.moveLeftCommand);
                Emitter.instance.emit('sound', 'swipe');
                break;
            case cc.macro.KEY.d:
                // Emitter.instance.emit('moveRow', true);
                this.action.execute(this.moveRightCommand);
                Emitter.instance.emit('sound', 'swipe');
                break;
            case cc.macro.KEY.w:
                // Emitter.instance.emit('moveCollumn', false);
                this.action.execute(this.moveUpCommand);
                Emitter.instance.emit('sound', 'swipe');
                break;
            case cc.macro.KEY.s:
                // Emitter.instance.emit('moveCollumn', true);
                this.action.execute(this.moveDownCommand);
                Emitter.instance.emit('sound', 'swipe');
                break;
            case cc.macro.KEY.space:
                Emitter.instance.emit('canMove');
                cc.log(this.action.getCommands());
                // this.action.undo();
                break;
            case cc.macro.KEY.c:
                Emitter.instance.emit('lose');
                break;
            default:
                Emitter.instance.emit('canMove');
                break;
        }
    },

    moveRight: function moveRight() {
        Emitter.instance.emit('moveRow', true);
    },
    moveLeft: function moveLeft() {
        Emitter.instance.emit('moveRow', false);
    },
    moveDown: function moveDown() {
        Emitter.instance.emit('moveCollumn', true);
    },
    moveUp: function moveUp() {
        Emitter.instance.emit('moveCollumn', false);
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

var Command = cc.Class({
    ctor: function ctor(execute, undo) {
        this.execute = execute;
        this.undo = undo;
    }
});

var Action = cc.Class({
    ctor: function ctor() {
        this.current = null;
        this.commands = [];
    },
    execute: function execute(command) {
        this.current = command;
        this.commands.push(command);
        command.execute();
    },
    undo: function undo() {
        if (this.commands.length === 0) {
            cc.log('undo list is empty');
            return;
        }
        var command = this.commands.pop();
        this.current = command;
        command.undo();
    },
    getCommands: function getCommands() {
        return this.commands;
    }
});

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
        
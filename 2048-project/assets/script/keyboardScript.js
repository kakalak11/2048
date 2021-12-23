// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
        _canMove: true,
    },

    ctor() {
        this.moveRightCommand = new Command(this.moveRight, this.moveLeft);
        this.moveLeftCommand = new Command(this.moveLeft, this.moveRight);
        this.moveDownCommand = new Command(this.moveDown, this.moveUp);
        this.moveUpCommand = new Command(this.moveUp, this.moveDown);

        this.action = new Action();
    },

    // LIFE-CYCLE CALLBACKS:

    _onKeyDown: function (event) {
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

    moveRight() { Emitter.instance.emit('moveRow', true) },
    moveLeft() { Emitter.instance.emit('moveRow', false) },
    moveDown() { Emitter.instance.emit('moveCollumn', true) },
    moveUp() { Emitter.instance.emit('moveCollumn', false) },

    _reset() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
    },

    onLoad() {
        Emitter.instance.registerEvent('canMove', (value = true) => this._canMove = value);
        this.node.on('reset', this._reset, this);
        this.node.on('setInput', (touch) => {
            if (touch) this._canMove = false;
        }, this)
        Emitter.instance.registerEvent('start', () => cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this));
    },

    start() {

    },

    // update (dt) {},
});



var Command = cc.Class({
    ctor(execute, undo) {
        this.execute = execute;
        this.undo = undo;
    },
});

var Action = cc.Class({
    ctor() {
        this.current = null;
        this.commands = [];
    },

    execute(command) {
        this.current = command;
        this.commands.push(command);
        command.execute();
    },

    undo() {
        if (this.commands.length === 0) {
            cc.log('undo list is empty');
            return;
        }
        var command = this.commands.pop();
        this.current = command;
        command.undo();
    },

    getCommands() {
        return this.commands;
    }
});
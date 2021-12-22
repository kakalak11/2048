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

    // LIFE-CYCLE CALLBACKS:

    _onKeyDown: function (event) {
        // cc.warn('key down', this._canMove);
        this.node.emit('setInput', false);
        if (!this._canMove) return;
        Emitter.instance.emit('canMove', false);
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.node.emit('moveRow', false);
                Emitter.instance.emit('sound', 'swipe');
                break;
            case cc.macro.KEY.d:
                this.node.emit('moveRow', true);
                Emitter.instance.emit('sound', 'swipe');
                break;
            case cc.macro.KEY.w:
                this.node.emit('moveCollumn', false);
                Emitter.instance.emit('sound', 'swipe');
                break;
            case cc.macro.KEY.s:
                this.node.emit('moveCollumn', true);
                Emitter.instance.emit('sound', 'swipe');
                break;
            default:
                Emitter.instance.emit('canMove');
                break;
        }
    },

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
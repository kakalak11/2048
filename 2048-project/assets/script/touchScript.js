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
        touchNode: cc.Node,
        _xDelta: 0,
        _yDelta: 0,
        _canTouch: true,
    },

    // LIFE-CYCLE CALLBACKS:

    _onTouchStart: function (event) {
        Emitter.instance.emit('sound', 'swipe');
        this.node.emit('setInput', true);
        if (!this._canTouch) return;
        this._canTouch = false;

        this.touchNode.once('touchend', function (event) {
            let xDelta = event.getLocation().x - event.getStartLocation().x;
            let yDelta = event.getLocation().y - event.getStartLocation().y;
            cc.log('x delta is: ', xDelta, ', y delta is: ', yDelta);
            if (Math.abs(xDelta) === 0 && Math.abs(yDelta) === 0) {
                Emitter.instance.emit('canMove');
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
            Emitter.instance.emit('canMove');
            return;
        }, this);

        this.touchNode.on('touchcancel', (event) => {
            Emitter.instance.emit('canMove');
            return;
        }, this);
    },

    onLoad() {
        this.touchNode.on('touchstart', this._onTouchStart, this);
        Emitter.instance.registerEvent('canMove', (value = true) => this._canTouch = value);
        this.node.on('setInput', (touch) => {
            if (!touch) this._canTouch = false;
        }, this);
    },

    start() {

    },

    // update (dt) {},
});

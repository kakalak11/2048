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
        touchNode: cc.Node,
        _xDelta: 0,
        _yDelta: 0,
        _canTouch: true,
    },

    // LIFE-CYCLE CALLBACKS:

    _onTouchStart: function (event) {
        this.node.emit('setInput', true);
        if (!this._canTouch) return;
        this._canTouch = false;
        this.touchNode.on('touchmove', function (event) {
            var delta = event.touch.getDelta();
            this._xDelta += delta.x;
            this._yDelta += delta.y;
        }, this);

        this.touchNode.once('touchend', function (event) {
            cc.log(this._xDelta, this._yDelta);
            if (this._xDelta === 0 && this._yDelta === 0) {
                this._canTouch = true;
                return;
            }
            if (Math.abs(this._xDelta) < 50 && Math.abs(this._yDelta) < 50) {
                this._xDelta = 0;
                this._yDelta = 0;
                this._canTouch = true;
                return;
            }
            if (Math.abs(this._xDelta) > Math.abs(this._yDelta) && this._xDelta < 0) {
                this.node.emit('moveRow', false);
                cc.log('move right');
            }
            if (Math.abs(this._xDelta) > Math.abs(this._yDelta) && this._xDelta > 0) {
                this.node.emit('moveRow', true);
                cc.log('move left');
            }
            if (Math.abs(this._xDelta) < Math.abs(this._yDelta) && this._yDelta < 0) {
                this.node.emit('moveCollumn', true);
                cc.log('move down');
            }
            if (Math.abs(this._xDelta) < Math.abs(this._yDelta) && this._yDelta > 0) {
                this.node.emit('moveCollumn', false);
                cc.log('move up');
            }
            this._xDelta = 0;
            this._yDelta = 0;
            return;
        }, this);

        this.touchNode.on('touchcancel', (event) => {
            this._canTouch = true;
            this._xDelta = 0;
            this._yDelta = 0;
            return;
        }, this);
    },

    onLoad() {
        this.touchNode.on('touchstart', this._onTouchStart, this);
        // this.touchNode.on('touchstart', () => {
        //     cc.log('touch');
        //     cc.log(this);
        // }, this);
        this.node.on('canMove', (value = true) => this._canTouch = value, this);
        this.node.on('setInput', (touch) => {
            if (!touch) this._canTouch = false;
        }, this)
    },

    start() {

    },

    // update (dt) {},
});

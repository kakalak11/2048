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
        _canMove: true,
    },

    // LIFE-CYCLE CALLBACKS:

    _onKeyDown: function (event) {
        if (!this._canMove) return;
        this._canMove = false;
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
                this._canMove = true;
                break;

        }
    },

    onLoad() {
        this._canMove = true;
        this.node.on('canMove', (value = true) => {
            this._canMove = value;
            cc.log('can move', value);
        }, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
    },

    start() {

    },

    // update (dt) {},
});

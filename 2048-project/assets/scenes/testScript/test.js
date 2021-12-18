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
        _direction: 1,
    },

    // LIFE-CYCLE CALLBACKS:

    _onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.d:
                this._direction = 1;
                break;
            case cc.macro.KEY.a:
                this._direction = -1;
                break;
        }
    },

    _onKeyUp: function (event) {
        this._direction = 0;
    },

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this._onKeyUp, this);
    },

    start() {

    },

    update(dt) {
        this.node.runAction(cc.moveBy(dt, 5 * this._direction, 0))
    },
});

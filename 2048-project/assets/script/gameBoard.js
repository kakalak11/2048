// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const Emitter = require('event');

cc.Class({
    extends: cc.Component,

    properties: {
        tilesPrefab: cc.Prefab,
        tilesRow: [cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    _onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.space:
                this._moveRight();
                break;
        }
    },

    _moveRight: function () {
        cc.log(this.tilesRow[0].number);
    },

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
    },

    start() {

    },

    // update (dt) {},
});

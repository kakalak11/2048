// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var utilities = require('utils');

cc.Class({
    extends: cc.Component,

    properties: {
        tilesPrefab: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:


    _onKeyDown: function (event) {
        switch (event.keyCode) {
            case macro.KEY.space:
                this._moveDown();
                break;
        }
    },

    _moveDown: function () {
        this.node.children.forEach(function (element) {
            element.y -= element.width + 5;
        });
        cc.log(this.node.children);
    },

    _tilesInit: function () {
        let tiles = cc.instantiate(this.tilesPrefab);
        tiles.color = Math.random() > 0.9 ? cc.Color.RED : cc.Color.WHITE;
        tiles.x -= 81.25 / 2;
        tiles.y -= 81.25 / 2;
        tiles
        this.node.addChild(tiles);
    },

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);

    },

    start() {

    },

    // update (dt) {},
});

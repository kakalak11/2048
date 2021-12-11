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
        tilePrefab: cc.Prefab,
        tilesRows: [cc.Node],
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
        this._generateRandomValue();
    },

    _setupGrid() {
        this.node.children.forEach(element => {
            for (let i = 0; i < 4; i++) {
                let tile = cc.instantiate(this.tilePrefab);
                tile.setPosition(cc.v2((-415/2+50) + 105*i,0));
                tile.getComponent('tilesScript').setNumber(2);
                element.addChild(tile);
            }
        });
    },

    _generateRandomValue() {
        let tileValue = this.node.children[0].children[0].getComponent('tilesScript').number;
        cc.log(tileValue);
    },

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
    },
    
    start() {
        this._setupGrid();
    },

    // update (dt) {},
});

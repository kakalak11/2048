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
        tilesPrefab: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    _tilesInit: function() {
        let tiles = cc.instantiate(this.tilesPrefab);
        tiles.color = Math.random() > 0.9 ? cc.Color.RED : cc.Color.WHITE;
        this.node.addChild(tiles);
    },

    _onKeyDown: function(event) {
        switch(event.keyCode) {
            case cc.macro.KEY.down:
                console.log('Press down key');
                this._moveDown();
                break;
        }
    },

    _moveDown: function() {
        this.node.children.forEach(function(element) {
        });
    },

    onLoad () {
        for (let i = 0; i < 16; i++) this._tilesInit();
        cc.log(this.node.children);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
    },

    start () {

    },

    // update (dt) {},
});

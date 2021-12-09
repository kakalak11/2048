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

    _moveRight() {
    },

    _randomTilesGenerate() {
        let tile = this.node.children[Math.floor(Math.random() * 4)].children[Math.floor(Math.random() * 4)];
        let tileLabel = tile.children[0].getComponent('cc.Label');
        tileLabel.string = Math.random() > 0.5 ? 2 : 4;
    },

    _tilesInit: function () {

        for (let i = 0; i < 4; i++) {
            let collum = new Collum();

            function Collum() {
                let collum = new cc.Node;
                collum.width = 425;
                collum.height = 100;
                collum.x += 5;
                collum.addComponent(cc.Layout);
                let layoutCollum = collum.getComponent(cc.Layout);
                layoutCollum.type = 1;
                layoutCollum.spacingX = 5;


                return collum;
            }

            for (let j = 0; j < 4; j++) {
                let tile = cc.instantiate(this.tilesPrefab);
                collum.addChild(tile);
            }
            this.node.addChild(collum);
        }
    },

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function() {
            this.node.emit('right');
            cc.log('keydown');
        }, this);
        this._tilesInit();
        this._randomTilesGenerate();
        this._randomTilesGenerate();
    },

    start() {

    },

    // update (dt) {},
});

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
        number: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    setNumber: function (value) {
        this.number = value;
        this.node.getComponentInChildren(cc.Label).string = this.number;
    },

    onLoad() {
        // cc.log('tile prefab instantiated !');

    },

    start() {
        // if (this.number) {
        //     this.node.active = true;
        //     return;
        // };
        // this.node.active = false;
        // return;
    },

    update(dt) {
    },
});

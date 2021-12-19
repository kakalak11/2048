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
        position: cc.Vec2,
        _index: null,
        _color: [],
    },

    // LIFE-CYCLE CALLBACKS:

    setNumber: function (value) {
        this.number = value;
        this.node.getComponentInChildren(cc.Label).string = this.number;
        // this.node.color = new cc.Color(this._color[Math.log(2) / Math.log(this.number)]);
        this.node.color = new cc.Color('#eee4da');
    },

    moveCombine: function (pos, time) {
        let currentPos = this.node.getPosition(cc.v2());
        this.node.dispatchEvent(new cc.Event.EventCustom('move', true))
        let action = cc.sequence(
            cc.moveTo(time, pos),
            cc.callFunc(() => {
                this.setNumber(0);
                this.node.active = false;
                this.node.setPosition(currentPos);
            }),
        )
        this.node.runAction(action);
    },

    onLoad() {
        // cc.log('tile prefab instantiated !');
        this._color = ['#eee4da','#eedfc8','#f3b079','#ed8c55','#f67c5e','#ea5a38','#f4d86b','#f2d04b','#e5c128','#edc501','#edc501'];
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

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
        if (!parseInt(Math.log(this.number) / Math.log(2))) return;
        this.node.color = this._color[(Math.log(this.number) / Math.log(2)) - 1];
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
        this._color = [cc.Color.GRAY, cc.Color.RED, cc.Color.GREEN, cc.Color.BLUE, cc.Color.YELLOW, cc.Color.ORANGE, cc.Color.CYAN, cc.Color.MAGENTA, cc.Color.YELLOW, cc.Color.RED, cc.Color.BLACK];
    },

    start() {
    },

    update(dt) {
    },
});

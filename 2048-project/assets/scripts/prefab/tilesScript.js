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
    },

    start() {
    },

    update(dt) {
    },
});

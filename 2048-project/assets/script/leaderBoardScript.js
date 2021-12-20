// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        itemPrefab: cc.Prefab,
        userNameBox: cc.EditBox,
        score: cc.Label,
        _data: null,
        _bestScore: 0,
        _bestPlayer: '',
    },

    // LIFE-CYCLE CALLBACKS:

    onClickLeaderBoardButton: function () {
        this.node.active = true;
        this.node.opacity = 0;
        this.node.runAction(cc.fadeIn(0.25, 255));
        // this._updateLeaderBoard();
    },

    onClickReturn: function () {
        this.node.runAction(cc.sequence(
            cc.fadeOut(0.25, 0),
            cc.callFunc(() => this.node.active = false),
        ));
    },

    onClickSave: function () {
        let value = this.score.string;
        let key = this.userNameBox.string;
        this.userNameBox.string = '';
        this._data.setItem(key, value);
        return;
    },

    _updateLeaderBoard: function () {
        this._data.clear();
        this._data.setItem('kakalak', 200);
        this._data.setItem('kakalak11', 2054);
        this._data.setItem('kakalak22', 300);
        this._data.setItem('kakalak33', 3000);
        this._data.removeItem('debug');
        let index = 0;

        for (const property in this._data) {
            if (property === 'length') return;
            index++;
            cc.warn(index);
            if (this._bestScore < parseInt(this._data[property])) {
                this._bestScore = parseInt(this._data[property]);
                this._bestPlayer = property;
            }
            let item = cc.instantiate(this.itemPrefab);
            this.content.addChild(item);
            item.getComponent(cc.Label).string = `__________${index}__________\n${property}\n${this._data[property]}`;
        }
    },

    onLoad() {
        this._data = cc.sys.localStorage;
        this._updateLeaderBoard();
    },

    start() {

    },

    // update (dt) {},
});

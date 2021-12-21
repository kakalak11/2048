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
        _highScoreList: [],
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
        let value = `${this.userNameBox.string} : ${this.score.string}`;
        this._highScoreList.push(value);
        this.userNameBox.string = '';
        this._data.setItem(this._highScoreList.length, value);
        return;
    },

    _loadData: function () {
        for (let index = 0; index < this._data.length - 1; index++) {
            this._highScoreList.push(this._data.getItem(index));
        }
        cc.log(this._highScoreList);
        this._sortData();
        return;
    },

    _sortData: function () {
        this._highScoreList.forEach((element, index, array) => {
            this.number = parseInt(element.split(':')[1]);
            if (this._bestScore < this.number) {
                this._temp = array[0];
                array[0] = element;
                element = this._temp;
                this._bestScore = this.number;
                this._bestPlayer = element.split(':')[0];
                return;
            }
        });
        this._highScoreList[0] = `${this._bestPlayer} : ${this._bestScore}`;
        this._updateLeaderBoard();
    },

    _updateLeaderBoard: function () {
        this.content.removeAllChildren();
        this._highScoreList.forEach((element, index) => {
            let item = cc.instantiate(this.itemPrefab);
            let label = item.getComponent(cc.Label);
            this.content.addChild(item);
            if (index === 0) {
                label.string = `_____UWU_____${index + 1}_____UWU_____\n${element.split(':')[0]}\n${element.split(':')[1]}`;
                return;
            }
            label.string = `__________${index + 1}__________\n${element.split(':')[0]}\n${element.split(':')[1]}`;
        })
    },

    onLoad() {
        this._data = cc.sys.localStorage;
        cc.log(this._data);
        this._loadData();
    },

    start() {

    },

    // update (dt) {},
});

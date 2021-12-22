"use strict";
cc._RF.push(module, '030e4gof9lNbKPtSyK/7YCc', 'leaderBoardScript');
// script/leaderBoardScript.js

'use strict';

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var Emitter = require('mEmitter');

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
        _playing: null
    },

    // LIFE-CYCLE CALLBACKS:

    onClickLeaderBoardButton: function onClickLeaderBoardButton() {
        Emitter.instance.emit('showLeaderBoard');
        Emitter.instance.emit('hideMenu');
    },

    onClickReturn: function onClickReturn() {
        Emitter.instance.emit('hideLeaderBoard');
        Emitter.instance.emit('showMenu');
    },

    onClickSave: function onClickSave() {
        var value = this.userNameBox.string + ' : ' + this.score.string;
        this._highScoreList.push(value);
        this.userNameBox.string = '';
        this._data.setItem(this._highScoreList.length - 1, value);
        cc.log(this._data);
        return;
    },

    _loadData: function _loadData() {
        for (var index = 0; index < this._data.length; index++) {
            if (this._data.getItem(index) === null) continue;
            this._highScoreList.push(this._data.getItem(index));
        }
        // cc.log(this._highScoreList);
        this._sortData();
        return;
    },

    _sortData: function _sortData() {
        var _this = this;

        this._highScoreList.forEach(function (element, index, array) {
            _this.number = parseInt(element.split(':')[1]);
            if (_this._bestScore < _this.number) {
                _this._bestScore = _this.number;
                _this._bestPlayer = element.split(':')[0];
                return;
            }
        });
        // cc.log(`${this._bestPlayer}: ${this._bestScore}`);
        var temp = this._highScoreList[0];
        this._highScoreList[this._highScoreList.indexOf(this._bestPlayer + ': ' + this._bestScore)] = temp;
        this._highScoreList[0] = this._bestPlayer + ': ' + this._bestScore;
        // cc.log(this._highScoreList);
        this._updateLeaderBoard();
    },

    _updateLeaderBoard: function _updateLeaderBoard() {
        var _this2 = this;

        this.content.removeAllChildren();
        this._highScoreList.forEach(function (element, index) {
            var item = cc.instantiate(_this2.itemPrefab);
            var label = item.getComponent(cc.Label);
            _this2.content.addChild(item);
            if (index === 0) {
                label.string = '_____UWU_____' + (index + 1) + '_____UWU_____\n' + element.split(':')[0] + '\n' + element.split(':')[1];
                return;
            }
            label.string = '__________' + (index + 1) + '__________\n' + element.split(':')[0] + '\n' + element.split(':')[1];
        });
    },

    _show: function _show() {
        this.node.runAction(cc.moveTo(0.5, cc.v2(0, 0)).easing(cc.easeExponentialInOut(0.5)));
    },

    _hide: function _hide() {
        this.node.runAction(cc.moveTo(0.5, cc.v2(500, 0)).easing(cc.easeExponentialInOut(0.5)));
    },

    onLoad: function onLoad() {
        var _this3 = this;

        this._data = cc.sys.localStorage;
        this._data.removeItem('debug');
        this._loadData();
        Emitter.instance.registerEvent('showLeaderBoard', this._show.bind(this));
        Emitter.instance.registerEvent('hideLeaderBoard', this._hide.bind(this));
        Emitter.instance.registerEvent('playing', function () {
            return _this3._playing = true;
        });
        Emitter.instance.registerEvent('notPlaying', function () {
            return _this3._playing = false;
        });
    },
    start: function start() {
        Emitter.instance.emit('notify', { player: this._bestPlayer, score: this._bestScore });
    }
}

// update (dt) {},
);

cc._RF.pop();
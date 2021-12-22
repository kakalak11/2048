"use strict";
cc._RF.push(module, '795456T5e5BEYLQF5gO+zNh', 'windowScript');
// script/windowScript.js

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
        score: cc.Node,
        bestScoreNumber: cc.Label,
        gameBoard: cc.Node,
        leaderBoard: cc.Node,
        winBoard: cc.Node,
        loseBoard: cc.Node,
        _playing: false
    },

    // LIFE-CYCLE CALLBACKS:

    onClickPlayButton: function onClickPlayButton() {
        Emitter.instance.emit('showWindow');
        if (!this._playing) {
            Emitter.instance.emit('start');
        }
        Emitter.instance.emit('canMove');
        Emitter.instance.emit('playing');
    },

    onClickMenuButton: function onClickMenuButton() {
        Emitter.instance.emit('hideWindow');
    },

    _scoreUpdate: function _scoreUpdate() {
        var _this = this;

        this.gameMatrix = this.gameBoard.getComponent('gameBoard')._tilesMatrix.flat();
        if (!this.gameMatrix) {
            this.score.getComponent('cc.Label').string = 0;
            return;
        }
        this.scoreNumber = 0;
        this.gameMatrix.forEach(function (element) {
            return _this.scoreNumber += element.getComponent('tilesScript').number;
        });
        this.score.getComponent('cc.Label').string = this.scoreNumber;
        return;
    },

    _win: function _win() {
        this.winBoard.emit('winBoard');
        Emitter.instance.emit('notPlaying');
    },

    _lose: function _lose() {
        this.loseBoard.emit('loseBoard');
        Emitter.instance.emit('notPlaying');
    },

    onClickReturnButton: function onClickReturnButton() {
        this.gameBoard.getComponent('gameBoard')._reset();
        if (this._playing) Emitter.instance.emit('notPlaying');
        Emitter.instance.emit('start');
        Emitter.instance.emit('canMove');
        Emitter.instance.emit('playing');
        return;
    },

    _show: function _show() {
        this.node.runAction(cc.moveTo(0.5, 0, 0).easing(cc.easeExponentialInOut(0.5)));
    },

    _hide: function _hide() {
        this.node.runAction(cc.moveTo(0.5, -500, 0).easing(cc.easeExponentialInOut(0.5)));
    },

    onLoad: function onLoad() {
        var _this2 = this;

        this.node.on('updateScore', this._scoreUpdate, this);
        this.node.on('win', this._win, this);
        this.node.on('lose', this._lose, this);
        this.leaderBoardScript = this.leaderBoard.getComponent('leaderBoardScript');
        this.leaderBoardScript.active = false;
        cc.log(this.leaderBoardScript._bestScore);
        this.bestScoreNumber.string = this.leaderBoardScript._bestScore;

        Emitter.instance.registerEvent('showWindow', this._show.bind(this));
        Emitter.instance.registerEvent('hideWindow', this._hide.bind(this));
        Emitter.instance.registerEvent('playing', function () {
            return _this2._playing = true;
        });
        Emitter.instance.registerEvent('notPlaying', function () {
            return _this2._playing = false;
        });
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
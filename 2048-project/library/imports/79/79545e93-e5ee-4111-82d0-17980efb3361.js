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

cc.Class({
    extends: cc.Component,

    properties: {
        menuNode: cc.Node,
        score: cc.Node,
        gameBoard: cc.Node,
        winBoard: cc.Node,
        loseBoard: cc.Node,
        _playing: null
    },

    // LIFE-CYCLE CALLBACKS:

    onClickPlayButton: function onClickPlayButton() {
        this.node.runAction(cc.moveTo(0.5, 0, 0).easing(cc.easeExponentialInOut(0.5)));
        this.gameBoard.getComponent('gameBoard')._setupGrid(this._playing);
        this._playing = true;
    },

    onClickMenuButton: function onClickMenuButton() {
        this.node.runAction(cc.moveTo(0.5, -500, 0).easing(cc.easeExponentialInOut(0.5)));
    },

    _scoreUpdate: function _scoreUpdate() {
        var _this = this;

        this.gameMatrix = this.gameBoard.getComponent('gameBoard')._tilesMatrix.flat();
        this.scoreNumber = 0;
        this.gameMatrix.forEach(function (element) {
            return _this.scoreNumber += element.getComponent('tilesScript').number;
        });
        this.score.getComponent('cc.Label').string = this.scoreNumber;
    },

    _win: function _win() {
        this.winBoard.emit('winBoard');
        this._playing = false;
    },

    _lose: function _lose() {
        this.loseBoard.emit('loseBoard');
        this._playing = false;
    },

    onClickReturnButton: function onClickReturnButton() {
        this.gameBoard.getComponent('gameBoard')._reset();
        return;
    },

    onLoad: function onLoad() {
        this.node.on('updateScore', this._scoreUpdate, this);
        this.node.on('win', this._win, this);
        this.node.on('lose', this._lose, this);
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
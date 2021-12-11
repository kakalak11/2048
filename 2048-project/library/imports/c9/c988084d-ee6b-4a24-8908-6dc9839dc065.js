"use strict";
cc._RF.push(module, 'c9880hN7mtKJIkIbcmDncBl', 'gameBoard');
// script/gameBoard.js

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

var Emitter = require('event');

cc.Class({
    extends: cc.Component,

    properties: {
        tilePrefab: cc.Prefab,
        tilesRows: [cc.Node]
    },

    // LIFE-CYCLE CALLBACKS:

    _onKeyDown: function _onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.right:
                this._moveRight();
                break;
            case cc.macro.KEY.left:
                this._moveLeft();
                break;
        }
    },

    _moveRight: function _moveRight() {
        this.node.children.forEach(function (element) {
            var numbers = element.children.filter(function (element) {
                return element.active;
            });
            var zeros = element.children.filter(function (element) {
                return !element.active;
            });
            var newArray = zeros.concat(numbers);
            element.removeAllChildren(true);
            element.addChild(newArray.shift());
            element.addChild(newArray.shift());
            element.addChild(newArray.shift());
            element.addChild(newArray.shift());
            element.children.forEach(function (element, index) {
                return element.runAction(cc.moveTo(0.25, -157.5 + 105 * index, 0));
            });
            cc.log(element.children);
        }, this.tilePrefab);
    },

    _moveLeft: function _moveLeft() {
        this.node.children.forEach(function (element) {
            var numbers = element.children.filter(function (element) {
                return element.active;
            });
            var zeros = element.children.filter(function (element) {
                return !element.active;
            });
            var newArray = numbers.concat(zeros);
            element.removeAllChildren(true);
            element.addChild(newArray.shift());
            element.addChild(newArray.shift());
            element.addChild(newArray.shift());
            element.addChild(newArray.shift());
            element.children.forEach(function (element, index) {
                return element.runAction(cc.moveTo(0.25, -157.5 + 105 * index, 0));
            });
            cc.log(element.children);
        }, this.tilePrefab);
    },

    _moveDown: function _moveDown() {
        // this.node.children.forEach((element, index) => {
        //     for (let i = 0; i < 3; i++) {

        //     }
        // });
    },

    _setupGrid: function _setupGrid() {
        var _this = this;

        this.node.children.forEach(function (element) {
            for (var i = 0; i < 4; i++) {
                var tile = cc.instantiate(_this.tilePrefab);
                tile.active = Math.random() > 0.7 ? true : false;
                tile.setPosition(cc.v2(-415 / 2 + 50 + 105 * i, 0));
                tile.getComponent('tilesScript').setNumber(2);
                element.addChild(tile);
            }
        });
    },
    _generateRandomValue: function _generateRandomValue() {
        var randomTile = this.node.children[parseInt(Math.random() * 3)].children[parseInt(Math.random() * 3)];
        cc.log(randomTile);
    },
    onLoad: function onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
    },
    start: function start() {
        this._setupGrid();
    },
    update: function update(dt) {}
});

cc._RF.pop();
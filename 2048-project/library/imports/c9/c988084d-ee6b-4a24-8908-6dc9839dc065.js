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
        _tilesMatrix: [],
        _moving: null
    },

    // LIFE-CYCLE CALLBACKS:

    _onKeyDown: function _onKeyDown(event) {
        if (this._moving) return;
        switch (event.keyCode) {
            case cc.macro.KEY.right:
                this._moving = true;
                this._moveRight();
                break;
            case cc.macro.KEY.left:
                this._moving = true;
                this._moveLeft();
                break;
            case cc.macro.KEY.down:
                this._moving = true;
                this._moveDown();
                break;
            case cc.macro.KEY.up:
                this._moving = true;
                this._moveUp();
                break;
            case cc.macro.KEY.space:
                this._showPostion();
                break;
        }
    },

    _moveRight: function _moveRight() {
        var _this = this;

        this._tilesMatrix.forEach(function (element, rowIndex) {
            var numbers = element.filter(function (element) {
                return element.active;
            });
            var zeros = element.filter(function (element) {
                return !element.active;
            });
            element = zeros.concat(numbers);
            element.forEach(function (element, collumnIndex) {
                return element.runAction(cc.sequence(cc.moveTo(0.25, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex), cc.callFunc(function () {
                    return _this._moving = false;
                })));
            });
            for (var i = 0; i < 4; i++) {
                _this._tilesMatrix[rowIndex][i] = element.shift();
            }
        });
        cc.log(this._tilesMatrix);
    },

    _moveLeft: function _moveLeft() {
        var _this2 = this;

        this._tilesMatrix.forEach(function (element, rowIndex) {
            var numbers = element.filter(function (element) {
                return element.active;
            });
            var zeros = element.filter(function (element) {
                return !element.active;
            });
            element = numbers.concat(zeros);
            element.forEach(function (element, collumnIndex) {
                return element.runAction(cc.sequence(cc.moveTo(0.25, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex), cc.callFunc(function () {
                    return _this2._moving = false;
                })));
            });
            for (var i = 0; i < 4; i++) {
                _this2._tilesMatrix[rowIndex][i] = element.shift();
            }
        });
        cc.log(this._tilesMatrix);
    },

    _moveDown: function _moveDown() {
        var _this3 = this;

        var _loop = function _loop(i) {
            var collumn = [];
            for (var j = 0; j < 4; j++) {
                collumn.push(_this3._tilesMatrix[j][i]);
            }
            cc.log(collumn);
            var numbers = collumn.filter(function (element) {
                return element.active;
            });
            var zeros = collumn.filter(function (element) {
                return !element.active;
            });
            collumn = zeros.concat(numbers);
            cc.log(collumn);
            collumn.forEach(function (element, index) {
                return element.runAction(cc.sequence(cc.moveTo(0.25, -157.5 + 105 * i, 157.5 - 105 * index), cc.callFunc(function () {
                    return _this3._moving = false;
                })));
            });
            for (var _j = 0; _j < 4; _j++) {
                _this3._tilesMatrix[_j][i] = collumn.shift();
            }
        };

        for (var i = 0; i < 4; i++) {
            _loop(i);
        }
        cc.log(this._tilesMatrix);
    },

    _moveUp: function _moveUp() {
        var _this4 = this;

        var _loop2 = function _loop2(i) {
            var collumn = [];
            for (var j = 0; j < 4; j++) {
                collumn.push(_this4._tilesMatrix[j][i]);
            }
            cc.log(collumn);
            var numbers = collumn.filter(function (element) {
                return element.active;
            });
            var zeros = collumn.filter(function (element) {
                return !element.active;
            });
            collumn = numbers.concat(zeros);
            cc.log(collumn);
            collumn.forEach(function (element, index) {
                return element.runAction(cc.sequence(cc.moveTo(0.25, -157.5 + 105 * i, 157.5 - 105 * index), cc.callFunc(function () {
                    return _this4._moving = false;
                })));
            });
            for (var _j2 = 0; _j2 < 4; _j2++) {
                _this4._tilesMatrix[_j2][i] = collumn.shift();
            }
        };

        for (var i = 0; i < 4; i++) {
            _loop2(i);
        }
        cc.log(this._tilesMatrix);
    },

    _showPostion: function _showPostion() {
        // this._tilesRows.forEach(element => element.forEach(element => cc.log(element.name, Math.floor((element.getPosition().x + 157.5) / 100), Math.floor((element.getPosition().y + 157.5) / 100))));
        this._tilesRows.forEach(function (element) {
            element.forEach(function (element) {
                // this._tilesRows[Math.floor((element.getPosition().x + 157.5) / 100)][Math.floor((element.getPosition().y + 157.5) / 100)] = element;
                // this._tilesCollumns[Math.floor((element.getPosition().y + 157.5) / 100)][Math.floor((element.getPosition().x + 157.5) / 100)] = element;
                // cc.log(Math.floor((element.getPosition().x + 157.5) / 100), Math.floor((element.getPosition().y + 157.5) / 100))
            });
        });
        cc.log(this._tilesCollumns, this._tilesRows);
    },

    _setupGrid: function _setupGrid() {
        var numberIndex = 1;
        this._tilesMatrix.push([], [], [], []);
        for (var _collumn = 0; _collumn < 4; _collumn++) {
            for (var row = 0; row < 4; row++) {
                var tile = cc.instantiate(this.tilePrefab);
                tile.active = Math.random() > 0.7 ? true : false;
                tile.name = 'tile ' + numberIndex;
                tile.getComponent('tilesScript').setNumber(numberIndex++);
                tile.setPosition(cc.v2(-157.5 + 105 * row, 157.5 - 105 * _collumn));
                // cc.log(Number(String(tile.getPosition().x + 157.5)[0]), Number(String((tile.getPosition().y - 157.5) * -1)[0]));
                this._tilesMatrix[Number(String((tile.getPosition().y - 157.5) * -1)[0])][Number(String(tile.getPosition().x + 157.5)[0])] = tile;
                this.node.addChild(tile);
            }
        }
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
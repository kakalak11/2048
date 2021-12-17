(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/gameBoard.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c9880hN7mtKJIkIbcmDncBl', 'gameBoard', __filename);
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
        _moving: null,
        _time: 0.25 / 8,
        _check: true,
        _combined: false,
        _posistionChanged: null,
        _skip: false
    },

    // LIFE-CYCLE CALLBACKS:

    _onKeyDown: function _onKeyDown(event) {
        var _this = this;

        this.node.emit('checkWin');
        this.node.emit('checkLose');
        if (this._moving) return;
        this._moving = true;
        this._check = false;
        switch (event.keyCode) {
            case cc.macro.KEY.d:
                this._moveRow(true);
                this._combineRow(true);
                this.scheduleOnce(function () {
                    _this._moveRow(true);
                    _this._adjustPosition();
                    _this._moving = false;
                }, this._time);
                break;
            case cc.macro.KEY.a:
                this._moveRow(false);
                this._combineRow(false);
                this.scheduleOnce(function () {
                    _this._moveRow(false);
                    _this._adjustPosition();
                    _this._moving = false;
                }, this._time);
                break;
            case cc.macro.KEY.s:
                this._moveCollumn(true);
                this._combineCollumn(true);
                this.scheduleOnce(function () {
                    _this._moveCollumn(true);
                    _this._adjustPosition();
                    _this._moving = false;
                }, this._time);
                break;
            case cc.macro.KEY.w:
                this._moveCollumn(false);
                this._combineCollumn(false);
                this.scheduleOnce(function () {
                    _this._moveCollumn(false);
                    _this._adjustPosition();
                    _this._moving = false;
                }, this._time);
                break;
            case cc.macro.KEY.space:
                this._adjustPosition();
                console.clear();
                break;
            case cc.macro.KEY.c:
                this._generateRandomValue();
                break;
            default:
                this._moving = false;
                break;
        }
    },

    //Move logic

    _moveRow: function _moveRow(directionRight) {
        var _this2 = this;

        this._tilesMatrix.forEach(function (element, rowIndex) {
            var numbers = element.filter(function (element) {
                return element.active;
            });
            var zeros = element.filter(function (element) {
                return !element.active;
            });
            directionRight ? element = zeros.concat(numbers) : element = numbers.concat(zeros);
            for (var i = 0; i < 4; i++) {
                _this2._tilesMatrix[rowIndex][i] = element.shift();
            }
        });
        return;
    },

    _moveCollumn: function _moveCollumn(directionDown, adjust) {
        for (var i = 0; i < 4; i++) {
            var collumn = [];
            for (var j = 0; j < 4; j++) {
                collumn.push(this._tilesMatrix[j][i]);
            }var numbers = collumn.filter(function (element) {
                return element.active;
            });
            var zeros = collumn.filter(function (element) {
                return !element.active;
            });
            directionDown ? collumn = zeros.concat(numbers) : collumn = numbers.concat(zeros);
            for (var _j = 0; _j < 4; _j++) {
                this._tilesMatrix[_j][i] = collumn.shift();
            }
        }
        return;
    },

    _adjustPosition: function _adjustPosition() {
        var _this3 = this;

        this._tilesMatrix.forEach(function (element, rowIndex) {
            return element.forEach(function (element, collumnIndex) {
                _this3.action = cc.sequence(cc.moveTo(_this3._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex).easing(cc.easeSineIn(_this3._time)), cc.callFunc(function () {}));
                element.runAction(_this3.action);
            });
        });
        this.scheduleOnce(this._generateRandomValue, this._time);
        return;
    },

    //Combine logic

    _combineRow: function _combineRow(directionRight) {
        var _this4 = this;

        this._tilesMatrix.forEach(function (element, index) {
            directionRight ? _this4.array = element.reverse() : _this4.array = element;
            _this4.array.forEach(function (element, index, array) {
                if (_this4.skip) {
                    _this4.skip = false;
                    return;
                }
                _this4.nextElement = array[index + 1];
                _this4.elementScript = element.getComponent('tilesScript');
                if (_this4.nextElement === undefined) return;
                _this4.nextElementScript = _this4.nextElement.getComponent('tilesScript');
                if (_this4.elementScript.number === 0) return;
                if (_this4.elementScript.number === _this4.nextElementScript.number) {
                    _this4.skip = true;
                    _this4.elementScript.setNumber(_this4.elementScript.number *= 2);
                    element.runAction(cc.sequence(cc.scaleTo(_this4._time / 2, 1.25), cc.scaleTo(_this4._time / 2, 1)));
                    _this4.nextElementScript.moveCombine(element.getPosition(cc.v2()), _this4._time / 2);
                    _this4._combined = true;
                }
            });
            directionRight ? _this4.array.reverse() : null;
        });
        return;
    },

    _combineCollumn: function _combineCollumn(directionDown) {
        var _this5 = this;

        for (var i = 0; i < 4; i++) {
            this.collumn = [];
            for (var j = 0; j < 4; j++) {
                this.collumn.push(this._tilesMatrix[j][i]);
            }
            directionDown ? this.collumn.reverse() : null;
            this.collumn.forEach(function (element, index, array) {
                if (_this5.skip) {
                    _this5.skip = false;
                    return;
                }
                _this5.nextElement = array[index + 1];
                _this5.elementScript = element.getComponent('tilesScript');
                if (_this5.nextElement === undefined) return;
                _this5.nextElementScript = _this5.nextElement.getComponent('tilesScript');
                if (_this5.elementScript.number === 0) return;
                if (_this5.elementScript.number === _this5.nextElementScript.number) {
                    _this5.skip = true;
                    _this5.elementScript.setNumber(_this5.elementScript.number *= 2);
                    element.runAction(cc.sequence(cc.scaleTo(_this5._time / 2, 1.25), cc.scaleTo(_this5._time / 2, 1)));
                    _this5.nextElementScript.moveCombine(element.getPosition(cc.v2()), _this5._time);
                    _this5._combined = true;
                }
            });
            directionDown ? this.collumn.reverse() : null;
        }
        return;
    },

    _generateRandomValue: function _generateRandomValue() {
        if (!this._check) return;
        do {
            this.randomCollumn = Math.floor(Math.random() * 4);
            this.randomRow = Math.floor(Math.random() * 4);
            if (this._tilesMatrix.flat().every(function (element) {
                return element.active;
            })) {
                return;
            }
        } while (this._tilesMatrix[this.randomRow][this.randomCollumn].active);
        this.randomTile = this._tilesMatrix[this.randomRow][this.randomCollumn];
        this.number = this.randomTile.getComponent('tilesScript');
        this.randomTile.active = true;
        this.randomTile.scale = 0;
        this.number.setNumber(Math.random() > 0.7 ? 4 : 2);
        this.randomTile.setPosition(cc.v2(-157.5 + 105 * this.randomCollumn, 157.5 - 105 * this.randomRow));
        this.randomTile.runAction(cc.scaleTo(this._time, 1));
        this._check = false;
    },
    _setupGrid: function _setupGrid() {
        var _this6 = this;

        var numberIndex = 1;
        this._tilesMatrix.push([], [], [], []);
        for (var collumn = 0; collumn < 4; collumn++) {
            for (var row = 0; row < 4; row++) {
                this.tile = cc.instantiate(this.tilePrefab);
                this.tile.active = false;
                this.tile.on('mousedown', this._onClick, this.tile);
                this.tile.name = 'tile ' + numberIndex++;
                this.tile.setPosition(cc.v2(-157.5 + 105 * row, 157.5 - 105 * collumn));
                this.tile.on('position-changed', function () {
                    // cc.log('position changed');
                    _this6._check = true;
                }, this);
                this._tilesMatrix[Number(String((this.tile.getPosition().y - 157.5) * -1)[0])][Number(String(this.tile.getPosition().x + 157.5)[0])] = this.tile;
                this.node.addChild(this.tile);
            }
        }
        for (var i = 0; i < 2; i++) {
            this._check = true;
            this._generateRandomValue();
        }
        this._check = false;
    },


    _checkWin: function _checkWin() {
        var win = false;
        this._tilesMatrix.flat().forEach(function (element) {
            return element.getComponent('tilesScript').number === 2048 ? win = true : null;
        });
        if (win) {
            cc.log('you have won');
            return true;
        }
        return false;
    },

    _checkLose: function _checkLose() {
        var _this7 = this;

        this.checkRow = this._tilesMatrix.every(function (element, index, array) {
            if (element.every(function (element, index, array) {
                if (array[index + 1] === undefined) return true;
                _this7.number = element.getComponent('tilesScript').number;
                _this7.nextNumber = array[index + 1].getComponent('tilesScript').number;
                if (_this7.number !== _this7.nextNumber) return true;
                return false;
            })) return true;
            return false;
        });
        this.checkCollumn = this._tilesMatrix.flat().every(function (element, index, array) {
            if (array[index + 4] === undefined) return true;
            _this7.number = element.getComponent('tilesScript').number;
            _this7.nextNumber = array[index + 4].getComponent('tilesScript').number;
            if (_this7.number !== _this7.nextNumber) return true;
            return false;
        });
        if (this.checkCollumn && this.checkRow) {
            cc.log('you have lost');
            return true;
        }
        return false;
    },

    _onClick: function _onClick() {
        cc.log(this.name);
        this.script = this.getComponent('tilesScript');
        // this.script.setNumber(this.script.number === 2 ? 4 : 2);
        this.script.setNumber(2048);
        return;
        cc.log(this.getPosition(cc.v2()));
    },

    onLoad: function onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
        this._setupGrid();
        this.node.on('checkWin', this._checkWin, this);
        this.node.on('checkLose', this._checkLose, this);
    },
    start: function start() {},
    update: function update(dt) {}
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=gameBoard.js.map
        
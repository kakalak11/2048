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
        _moving: null,
        _time: 0.25,
        _check: true,
        _combined: false,
        _posistionChanged: null,
        _skip: false
    },

    // LIFE-CYCLE CALLBACKS:

    _onKeyDown: function _onKeyDown(event) {
        if (this._moving) return;
        this._moving = true;
        switch (event.keyCode) {
            case cc.macro.KEY.d:
                this._moveRow(true);
                break;
            case cc.macro.KEY.a:
                this._moveRow(false);
                break;
            case cc.macro.KEY.s:
                this._moveCollumn(true);
                break;
            case cc.macro.KEY.w:
                this._moveCollumn(false);
                break;
            case cc.macro.KEY.space:
                this._adjustPosition();
                console.clear();
                break;
            default:
                this._moving = false;
                break;
        }
    },

    _moveRow: function _moveRow(directionRight, adjust) {
        var _this = this;

        this._tilesMatrix.forEach(function (element, rowIndex) {
            var numbers = element.filter(function (element) {
                return element.active;
            });
            var zeros = element.filter(function (element) {
                return !element.active;
            });
            directionRight ? element = zeros.concat(numbers) : element = numbers.concat(zeros);
            for (var i = 0; i < 4; i++) {
                _this._tilesMatrix[rowIndex][i] = element.shift();
            }
        });
        if (!adjust) this._combineRow(directionRight);
        this._adjustPosition();
        if (adjust) this._generateRandomValue();

        return;
        this.scheduleOnce(function () {
            _this.node.emit('move');
        }, this._time);
    },

    _moveCollumn: function _moveCollumn(directionDown, adjust) {
        var _this2 = this;

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
        if (!adjust) this._combineCollumn(directionDown);
        this._adjustPosition();
        if (adjust) this._generateRandomValue();

        return;
        this.scheduleOnce(function () {
            _this2.node.emit('combineCollumn', directionDown);
            _this2.node.emit('move');
        }, this._time);
    },

    _adjustPosition: function _adjustPosition() {
        var _this3 = this;

        this._tilesMatrix.forEach(function (element, rowIndex) {
            return element.forEach(function (element, collumnIndex) {
                _this3.action = cc.sequence(cc.moveTo(_this3._time / 2, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex).easing(cc.easeCubicActionInOut(_this3._time / 2)), cc.callFunc(function () {
                    return _this3._moving = false;
                }));
                element.runAction(_this3.action);
            });
        });
        return;
    },

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
                    var copyTile = _this4.nextElement;
                    _this4.elementScript.setNumber(_this4.elementScript.number *= 2);
                    element.runAction(cc.sequence(cc.scaleTo(_this4._time / 2, 1.25), cc.scaleTo(_this4._time / 2, 1)));
                    _this4.nextElement.active = false;
                    _this4.nextElementScript.setNumber(0);
                    var action = cc.sequence(cc.moveBy(_this4._time, element.getPosition(cc.v2())), cc.callFunc(function () {
                        copyTile.destroy();
                    }));
                    copyTile.runAction(action);
                    _this4._combined = true;
                }
            });
            directionRight ? _this4.array.reverse() : null;
        });
        this.scheduleOnce(function () {
            return _this4._moveRow(directionRight, true);
        }, this._time / 2);
        this._combined && !this._check ? this._generateRandomValue(true) : this._combined = false;
        return;
    },

    //  2  -  2  -  2  - 0  => move =>  0  -  2  -  2  -  2  => reverse =>  2  -  2  -  2  -  0  => combine =>  4  -  0  -  2  -  0  => reverse 

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
                    var copyTile = _this5.nextElement;
                    _this5.elementScript.setNumber(_this5.elementScript.number *= 2);
                    element.runAction(cc.sequence(cc.scaleTo(_this5._time / 2, 1.25), cc.scaleTo(_this5._time / 2, 1)));
                    _this5.nextElement.active = false;
                    _this5.nextElementScript.setNumber(0);
                    var action = cc.sequence(cc.moveTo(_this5._time, element.getPosition(cc.v2())), cc.callFunc(function () {
                        copyTile.destroy();
                    }));
                    copyTile.runAction(action);
                    // this.node.emit('position-changed');
                    _this5._combined = true;
                }
            });
            directionDown ? this.collumn.reverse() : null;
        }
        this.scheduleOnce(function () {
            return _this5._moveCollumn(directionDown, true);
        }, this._time / 2);
        this._combined && !this._check ? this._generateRandomValue(true) : this._combined = false;
        return;
    },

    _generateRandomValue: function _generateRandomValue() {
        var bypass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (this._skip) {
            this._skip = false;
            this._check = false;
            return;
        }
        cc.warn('bypass is ', bypass);
        cc.warn('check is ', this._check);
        if (bypass) {
            this._check = true;
            this._skip = bypass;
        }
        cc.log('===========');
        if (!this._check) return;
        do {
            this.randomCollumn = Math.floor(Math.random() * 4);
            this.randomRow = Math.floor(Math.random() * 4);
            if (this._tilesMatrix.every(function (element) {
                return element.every(function (element) {
                    return element.active;
                });
            })) {
                this.node.emit('checkLose');
                return;
            }
        } while (this._tilesMatrix[this.randomRow][this.randomCollumn].active);
        this.randomTile = this._tilesMatrix[this.randomRow][this.randomCollumn];
        this.number = this.randomTile.getComponent('tilesScript');
        this.randomTile.active = true;
        this.randomTile.scale = 0;
        this.number.setNumber(Math.random() > 0.7 ? 4 : 2);
        this.randomTile.setPosition(cc.v2(-157.5 + 105 * this.randomCollumn, 157.5 - 105 * this.randomRow));
        this.randomTile.runAction(cc.sequence(cc.scaleTo(this._time, 1), cc.callFunc(function () {
            return null;
        })));
        // this.scheduleOnce(() => this._check = false, this._time);
        this._check = false;
        this._combined = false;
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
                // tile.active ? tile.getComponent('tilesScript').setNumber(Math.random() > 0.5 ? 2 : 4) : tile.getComponent('tilesScript').setNumber(0);
                this.tile.name = 'tile ' + numberIndex++;
                this.tile.setPosition(cc.v2(-157.5 + 105 * row, 157.5 - 105 * collumn));
                this.tile.on('position-changed', function () {
                    if (_this6._check) return;
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


    _addEvent: function _addEvent() {
        var _this7 = this;

        // this.node.on('move', this._generateRandomValue, this);
        this.node.on('adjustRow', function (adjustRight) {
            _this7._tilesMatrix.forEach(function (element, rowIndex) {
                var numbers = element.filter(function (element) {
                    return element.active;
                });
                var zeros = element.filter(function (element) {
                    return !element.active;
                });
                adjustRight ? element = zeros.concat(numbers) : element = numbers.concat(zeros);
                element.forEach(function (element, collumnIndex) {
                    return element.runAction(cc.sequence(cc.moveTo(_this7._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex), cc.callFunc(function () {})));
                });
                for (var i = 0; i < 4; i++) {
                    _this7._tilesMatrix[rowIndex][i] = element.shift();
                }
            });
            _this7.node.emit('checkWin');
        }, this);
        this.node.on('adjustCollumn', function (adjustDown) {
            for (var i = 0; i < 4; i++) {
                var collumn = [];
                for (var j = 0; j < 4; j++) {
                    collumn.push(_this7._tilesMatrix[j][i]);
                }
                var numbers = collumn.filter(function (element) {
                    return element.active;
                });
                var zeros = collumn.filter(function (element) {
                    return !element.active;
                });
                adjustDown ? collumn = zeros.concat(numbers) : collumn = numbers.concat(zeros);
                for (var _j2 = 0; _j2 < 4; _j2++) {
                    _this7._tilesMatrix[_j2][i] = collumn.shift();
                }
            }
            _this7._tilesMatrix.forEach(function (element, rowIndex) {
                return element.forEach(function (element, collumnIndex) {
                    element.runAction(cc.moveTo(_this7._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex));
                });
            });
            _this7.node.emit('checkWin');
        });
        this.node.on('combineRow', this._combineRow, this);
        this.node.on('combineCollumn', this._combineCollumn, this);
        this.node.on('checkWin', this._checkWin, this);
        this.node.on('checkLose', this._checkLose, this);
    },

    _checkWin: function _checkWin() {
        // !this._combined && this._check ? this._check = false : null;
        // cc.log(this._check);
        this._combined && !this._check ? this._generateRandomValue(true) : null;
        this._check ? this._generateRandomValue() : null;
        this._check && !this._combined ? this._check = false : null;
        this._combined = false;
        // this._check ? this._check = false : null;
        var win = false;
        this._tilesMatrix.flat().forEach(function (element) {
            element.getComponent('tilesScript').number === 2048 ? win = true : null;
        });
        win ? cc.log('you have won') : null;
        return;
    },

    _checkLose: function _checkLose() {
        var _this8 = this;

        this.checkRow = this._tilesMatrix.every(function (element, index, array) {
            if (element.every(function (element, index, array) {
                if (array[index + 1] === undefined) return true;
                _this8.number = element.getComponent('tilesScript').number;
                _this8.nextNumber = array[index + 1].getComponent('tilesScript').number;
                if (_this8.number !== _this8.nextNumber) return true;
                return false;
            })) return true;
            return false;
        });
        this.checkCollumn = this._tilesMatrix.flat().every(function (element, index, array) {
            if (array[index + 4] === undefined) return true;
            _this8.number = element.getComponent('tilesScript').number;
            _this8.nextNumber = array[index + 4].getComponent('tilesScript').number;
            if (_this8.number !== _this8.nextNumber) return true;
            cc.log('you lose');
            return false;
        });
        if (this.checkCollumn && this.checkRow) return true;
        return false;
    },

    _onClick: function _onClick() {
        cc.log(this.name);
        this.script = this.getComponent('tilesScript');
        this.script.setNumber(this.script.number === 2 ? 4 : 2);
        return;
        cc.log(this.getPosition(cc.v2()));
    },

    onLoad: function onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
        this._setupGrid();
        this._addEvent();
    },
    start: function start() {

        // this.schedule(() => console.clear(), 1);
    },
    update: function update(dt) {
        // cc.log('check is ', this._check);
    }
});

cc._RF.pop();
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
        _time: 0.125,
        _check: null
    },

    // LIFE-CYCLE CALLBACKS:

    _onKeyDown: function _onKeyDown(event) {
        var _this = this;

        if (this._moving) return;
        switch (event.keyCode) {
            case cc.macro.KEY.right || cc.macro.KEY.d:
                this._moving = true;
                this.node.emit('right');
                // this._moveRight();
                break;
            case cc.macro.KEY.left || cc.macro.KEY.a:
                this._moving = true;
                this._moveLeft();
                break;
            case cc.macro.KEY.down || cc.macro.KEY.s:
                this._moving = true;
                this._moveDown();
                break;
            case cc.macro.KEY.up || cc.macro.KEY.w:
                this._moving = true;
                this._moveUp();
                break;
            case cc.macro.KEY.space:
                cc.log(this._tilesMatrix.every(function (element, index, array) {
                    if (element.every(function (element, index, array) {
                        if (array[index + 1] === undefined) return true;
                        _this.number = element.getComponent('tilesScript').number;
                        _this.nextNumber = array[index + 1].getComponent('tilesScript').number;
                        if (_this.number !== _this.nextNumber) return true;
                        return false;
                    })) return true;
                    return false;
                }));
                break;
        }
    },

    _moveRight: function _moveRight() {
        var _this2 = this;

        this._tilesMatrix.forEach(function (element, rowIndex) {
            var numbers = element.filter(function (element) {
                return element.active;
            });
            var zeros = element.filter(function (element) {
                return !element.active;
            });
            element = zeros.concat(numbers);
            element.forEach(function (element, collumnIndex) {
                return element.runAction(cc.sequence(cc.moveTo(_this2._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex), cc.callFunc(function () {})));
            });
            cc.log();
            for (var i = 0; i < 4; i++) {
                _this2._tilesMatrix[rowIndex][i] = element.shift();
            }
        });
        this.scheduleOnce(function () {
            _this2.node.emit('combineRow', true);
            _this2.node.emit('move');
        }, this._time);
    },

    _moveLeft: function _moveLeft() {
        var _this3 = this;

        this._tilesMatrix.forEach(function (element, rowIndex) {
            var numbers = element.filter(function (element) {
                return element.active;
            });
            var zeros = element.filter(function (element) {
                return !element.active;
            });
            element = numbers.concat(zeros);
            element.forEach(function (element, collumnIndex) {
                return element.runAction(cc.sequence(cc.moveTo(_this3._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex), cc.callFunc(function () {})));
            });
            for (var i = 0; i < 4; i++) {
                _this3._tilesMatrix[rowIndex][i] = element.shift();
            }
        });
        this.scheduleOnce(function () {
            _this3.node.emit('combineRow', false);
            _this3.node.emit('move');
        }, this._time);
    },

    _moveDown: function _moveDown() {
        var _this4 = this;

        for (var i = 0; i < 4; i++) {
            var collumn = [];
            for (var j = 0; j < 4; j++) {
                collumn.push(this._tilesMatrix[j][i]);
            }
            var numbers = collumn.filter(function (element) {
                return element.active;
            });
            var zeros = collumn.filter(function (element) {
                return !element.active;
            });
            collumn = zeros.concat(numbers);
            for (var _j = 0; _j < 4; _j++) {
                this._tilesMatrix[_j][i] = collumn.shift();
            }
        }
        this._tilesMatrix.forEach(function (element, rowIndex) {
            return element.forEach(function (element, collumnIndex) {
                element.runAction(cc.moveTo(_this4._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex));
            });
        });
        this.scheduleOnce(function () {
            _this4.node.emit('combineCollumn', true);
            _this4.node.emit('move');
        }, this._time);
    },

    _moveUp: function _moveUp() {
        var _this5 = this;

        for (var i = 0; i < 4; i++) {
            var collumn = [];
            for (var j = 0; j < 4; j++) {
                collumn.push(this._tilesMatrix[j][i]);
            }
            var numbers = collumn.filter(function (element) {
                return element.active;
            });
            var zeros = collumn.filter(function (element) {
                return !element.active;
            });
            collumn = numbers.concat(zeros);
            for (var _j2 = 0; _j2 < 4; _j2++) {
                this._tilesMatrix[_j2][i] = collumn.shift();
            }
        }
        this._tilesMatrix.forEach(function (element, rowIndex) {
            return element.forEach(function (element, collumnIndex) {
                element.runAction(cc.moveTo(_this5._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex));
            });
        });
        this.scheduleOnce(function () {
            _this5.node.emit('combineCollumn', false);
            _this5.node.emit('move');
        }, this._time);
    },

    //  2  -  2  -  2  - 0  => move =>  0  -  2  -  2  -  2  => reverse =>  2  -  2  -  2  -  0  => combine =>  4  -  0  -  2  -  0  => reverse 

    _combineRow: function _combineRow(directionRight) {
        var _this6 = this;

        if (directionRight) {
            this._tilesMatrix.forEach(function (element) {
                element.reverse().forEach(function (element, index, array) {
                    if (_this6.skip) {
                        _this6.skip = false;
                        return;
                    }
                    _this6.nextElement = array[index + 1];
                    _this6.elementScript = element.getComponent('tilesScript');
                    if (_this6.nextElement === undefined) return;
                    _this6.nextElementScript = _this6.nextElement.getComponent('tilesScript');
                    if (_this6.elementScript.number === _this6.nextElementScript.number) {
                        _this6.skip = true;
                        var copyTile = _this6.nextElement;
                        _this6.elementScript.setNumber(_this6.elementScript.number *= 2);
                        element.runAction(cc.sequence(cc.scaleTo(0.125, 1.25), cc.scaleTo(0.125, 1)));
                        _this6.nextElement.active = false;
                        _this6.nextElementScript.setNumber(0);
                        var action = cc.sequence(cc.moveBy(0.125, element.getPosition(cc.v2())), cc.callFunc(function () {
                            copyTile.destroy();
                        }));
                        copyTile.runAction(action);
                    }
                });
                element.reverse();
            });
            this.node.emit('adjustRow', true);
            return;
        }

        this._tilesMatrix.forEach(function (element) {
            element.forEach(function (element, index, array) {
                if (_this6.skip) {
                    _this6.skip = false;
                    return;
                }
                _this6.nextElement = array[index + 1];
                _this6.elementScript = element.getComponent('tilesScript');
                if (_this6.nextElement === undefined) return;
                _this6.nextElementScript = _this6.nextElement.getComponent('tilesScript');
                if (_this6.elementScript.number === _this6.nextElementScript.number) {
                    _this6.skip = true;
                    var copyTile = _this6.nextElement;
                    _this6.elementScript.setNumber(_this6.elementScript.number *= 2);
                    element.runAction(cc.sequence(cc.scaleTo(0.125, 1.25), cc.scaleTo(0.125, 1)));
                    _this6.nextElement.active = false;
                    _this6.nextElementScript.setNumber(0);
                    var action = cc.sequence(cc.moveBy(0.125, element.getPosition(cc.v2())), cc.callFunc(function () {
                        copyTile.destroy();
                    }));
                    copyTile.runAction(action);
                }
            });
        });
        this.node.emit('adjustRow', false);
        return;
    },

    _combineCollumn: function _combineCollumn(directionDown) {
        var _this7 = this;

        if (directionDown) {
            for (var i = 0; i < 4; i++) {
                this.collumn = [];
                for (var j = 0; j < 4; j++) {
                    this.collumn.push(this._tilesMatrix[j][i]);
                }
                this.collumn.reverse().forEach(function (element, index, array) {
                    if (_this7.skip) {
                        _this7.skip = false;
                        return;
                    }
                    _this7.nextElement = array[index + 1];
                    _this7.elementScript = element.getComponent('tilesScript');
                    if (_this7.nextElement === undefined) return;
                    _this7.nextElementScript = _this7.nextElement.getComponent('tilesScript');
                    if (_this7.elementScript.number === _this7.nextElementScript.number) {
                        _this7.skip = true;
                        var copyTile = _this7.nextElement;
                        // copyTile.setPosition(element.getPosition(cc.v2()));
                        _this7.elementScript.setNumber(_this7.elementScript.number *= 2);
                        element.runAction(cc.sequence(cc.scaleTo(0.125, 1.25), cc.scaleTo(0.125, 1)));
                        _this7.nextElement.active = false;
                        _this7.nextElementScript.setNumber(0);
                        var action = cc.sequence(cc.moveTo(0.125, element.getPosition(cc.v2())), cc.callFunc(function () {
                            copyTile.destroy();
                        }));
                        copyTile.runAction(action);
                    }
                });
                this.collumn.reverse();
            }
            this.node.emit('adjustCollumn', true);
            return;
        }

        for (var _i = 0; _i < 4; _i++) {
            this.collumn = [];
            for (var _j3 = 0; _j3 < 4; _j3++) {
                this.collumn.push(this._tilesMatrix[_j3][_i]);
            }
            this.collumn.forEach(function (element, index, array) {
                if (_this7.skip) {
                    _this7.skip = false;
                    return;
                }
                _this7.nextElement = array[index + 1];
                _this7.elementScript = element.getComponent('tilesScript');
                if (_this7.nextElement === undefined) return;
                _this7.nextElementScript = _this7.nextElement.getComponent('tilesScript');
                if (_this7.elementScript.number === _this7.nextElementScript.number) {
                    _this7.skip = true;
                    var copyTile = _this7.nextElement;
                    // copyTile.setPosition(element.getPosition(cc.v2()));
                    _this7.elementScript.setNumber(_this7.elementScript.number *= 2);
                    element.runAction(cc.sequence(cc.scaleTo(0.125, 1.25), cc.scaleTo(0.125, 1)));
                    _this7.nextElement.active = false;
                    _this7.nextElementScript.setNumber(0);
                    var action = cc.sequence(cc.moveTo(0.125, element.getPosition(cc.v2())), cc.callFunc(function () {
                        copyTile.destroy();
                    }));
                    copyTile.runAction(action);
                }
            });
        }
        this.node.emit('adjustCollumn', false);
        return;
    },

    _generateRandomValue: function _generateRandomValue() {
        var _this8 = this;

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
            return _this8._check = false;
        })));
    },
    _setupGrid: function _setupGrid() {
        var _this9 = this;

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
                    return _this9._check = true;
                }, this);
                this._tilesMatrix[Number(String((this.tile.getPosition().y - 157.5) * -1)[0])][Number(String(this.tile.getPosition().x + 157.5)[0])] = this.tile;
                this.node.addChild(this.tile);
            }
        }
        this._check = true;
        // this._generateRandomValue();
        // this._generateRandomValue();
        for (var i = 0; i < 16; i++) {
            this._generateRandomValue();
        }this._check = false;
    },


    _addEvent: function _addEvent() {
        var _this10 = this;

        this.node.on('move', this._generateRandomValue, this);
        this.node.on('right', this._moveRight, this);
        this.node.on('adjustRow', function (adjustRight) {
            _this10._tilesMatrix.forEach(function (element, rowIndex) {
                var numbers = element.filter(function (element) {
                    return element.active;
                });
                var zeros = element.filter(function (element) {
                    return !element.active;
                });
                adjustRight ? element = zeros.concat(numbers) : element = numbers.concat(zeros);
                element.forEach(function (element, collumnIndex) {
                    return element.runAction(cc.sequence(cc.moveTo(_this10._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex), cc.callFunc(function () {
                        _this10._moving = false;
                    })));
                });
                for (var i = 0; i < 4; i++) {
                    _this10._tilesMatrix[rowIndex][i] = element.shift();
                }
            });
            _this10.node.emit('checkWin');
            // cc.log(this._tilesMatrix[0]);
        }, this);
        this.node.on('adjustCollumn', function (adjustDown) {
            for (var i = 0; i < 4; i++) {
                var collumn = [];
                for (var j = 0; j < 4; j++) {
                    collumn.push(_this10._tilesMatrix[j][i]);
                }
                var numbers = collumn.filter(function (element) {
                    return element.active;
                });
                var zeros = collumn.filter(function (element) {
                    return !element.active;
                });
                adjustDown ? collumn = zeros.concat(numbers) : collumn = numbers.concat(zeros);
                for (var _j4 = 0; _j4 < 4; _j4++) {
                    _this10._tilesMatrix[_j4][i] = collumn.shift();
                }
            }
            _this10._tilesMatrix.forEach(function (element, rowIndex) {
                return element.forEach(function (element, collumnIndex) {
                    element.runAction(cc.moveTo(_this10._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex));
                    _this10._moving = false;
                });
            });
            _this10.node.emit('checkWin');
        });
        this.node.on('combineRow', this._combineRow, this);
        this.node.on('combineCollumn', this._combineCollumn, this);
        this.node.on('checkWin', this._checkWin, this);
        this.node.on('checkLose', this._checkLose, this);
    },

    _checkWin: function _checkWin() {
        var win = false;
        this._tilesMatrix.flat().forEach(function (element) {
            element.getComponent('tilesScript').number === 2048 ? win = true : null;
        });
        win ? cc.log('you have won') : null;
    },

    _checkLose: function _checkLose() {},

    _onClick: function _onClick() {
        cc.log(this.getPosition(cc.v2()));
        this.script = this.getComponent('tilesScript');
        this.script.setNumber(this.script.number === 2 ? 4 : 2);
    },

    onLoad: function onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
        this._setupGrid();
        this._addEvent();
    },
    start: function start() {},
    update: function update(dt) {}
});

cc._RF.pop();
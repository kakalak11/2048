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
        _time: 0.125
    },

    // LIFE-CYCLE CALLBACKS:

    _onKeyDown: function _onKeyDown(event) {
        cc.log('move');
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
                this._generateRandomValue();
                break;
            case cc.macro.KEY.v:

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
                return element.runAction(cc.sequence(cc.moveTo(_this._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex), cc.callFunc(function () {
                    cc.log('this run later');
                })));
            });
            for (var i = 0; i < 4; i++) {
                _this._tilesMatrix[rowIndex][i] = element.shift();
            }
        });
        this.scheduleOnce(function () {
            cc.log('this run first');
            _this.node.emit('combineRow', true);
            _this.node.emit('move');
            _this._moving = false;
        }, this._time);
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
                return element.runAction(cc.sequence(cc.moveTo(_this2._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex), cc.callFunc(function () {
                    _this2._moving = false;
                })));
            });
            for (var i = 0; i < 4; i++) {
                _this2._tilesMatrix[rowIndex][i] = element.shift();
            }
        });
        this.scheduleOnce(function () {
            _this2.node.emit('combineRow', false);
            _this2.node.emit('move');
        }, this._time);
    },

    _moveDown: function _moveDown() {
        var _this3 = this;

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
                element.runAction(cc.moveTo(_this3._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex));
                _this3._moving = false;
            });
        });
        this.scheduleOnce(function () {
            _this3.node.emit('combineCollumn', true);
            _this3.node.emit('move');
        }, this._time);
    },

    _moveUp: function _moveUp() {
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
            collumn = numbers.concat(zeros);
            for (var _j2 = 0; _j2 < 4; _j2++) {
                this._tilesMatrix[_j2][i] = collumn.shift();
            }
        }
        this._tilesMatrix.forEach(function (element, rowIndex) {
            return element.forEach(function (element, collumnIndex) {
                element.runAction(cc.moveTo(_this4._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex));
                _this4._moving = false;
            });
        });
        this.scheduleOnce(function () {
            _this4.node.emit('combineCollumn', false);
            _this4.node.emit('move');
        }, this._time);
    },

    _combineRow: function _combineRow(directionRight) {
        var _this5 = this;

        cc.log('time to combine !!!');
        if (directionRight) {
            this._tilesMatrix.forEach(function (element) {
                element.forEach(function (element, index, array) {
                    if (_this5.skip) {
                        _this5.skip = false;
                        return;
                    }
                    // cc.log(element, this.nextElement);
                    _this5.nextElement = array[index + 1];
                    _this5.elementScript = element.getComponent('tilesScript');
                    if (_this5.nextElement !== undefined) _this5.nextElementScript = _this5.nextElement.getComponent('tilesScript');else return;
                    // cc.log('this still run', index);
                    // cc.log(this.elementScript.number, this.nextElementScript.number);
                    // cc.log(this.elementScript.number === this.nextElementScript.number);
                    if (_this5.elementScript.number === _this5.nextElementScript.number) {
                        _this5.skip = true;
                        var copyTile = element;
                        cc.log(copyTile);
                        _this5.nextElementScript.setNumber(_this5.nextElementScript.number *= 2);
                        _this5.nextElement.runAction(cc.sequence(cc.scaleTo(0.125, 1.25), cc.scaleTo(0.125, 1)));
                        element.active = false;
                        _this5.elementScript.setNumber(0);
                        var action = cc.sequence(cc.moveBy(0.125, 105, 0), cc.callFunc(function () {
                            copyTile.destroy();
                        }));
                        copyTile.runAction(action);
                    }
                });
            });

            this.node.emit('adjust', true);
            return;
        }

        this._tilesMatrix.forEach(function (element) {
            element.reverse().forEach(function (element, index, array) {
                // cc.log(element);
                if (_this5.skip) {
                    _this5.skip = false;
                    return;
                }
                cc.log(element, _this5.nextElement);
                _this5.nextElement = array[index + 1];
                _this5.elementScript = element.getComponent('tilesScript');
                if (_this5.nextElement !== undefined) _this5.nextElementScript = _this5.nextElement.getComponent('tilesScript');else return;
                // cc.log(this.elementScript.number, this.nextElementScript.number);
                // cc.log(this.elementScript.number === this.nextElementScript.number);
                if (_this5.elementScript.number === _this5.nextElementScript.number) {
                    _this5.skip = true;
                    var copyTile = element;
                    cc.log(copyTile);
                    _this5.nextElementScript.setNumber(_this5.nextElementScript.number *= 2);
                    _this5.nextElement.runAction(cc.sequence(cc.scaleTo(0.125, 1.25), cc.scaleTo(0.125, 1)));
                    element.active = false;
                    _this5.elementScript.setNumber(0);
                    var action = cc.sequence(cc.moveBy(0.125, -105, 0), cc.callFunc(function () {
                        copyTile.destroy();
                    }));
                    copyTile.runAction(action);
                }
            });
            element.reverse();
        });
        this.node.emit('adjust', false);
        return;
    },

    _combineCollumn: function _combineCollumn(directionDown) {
        var _this6 = this;

        if (directionDown) {
            for (var i = 0; i < 4; i++) {
                this.collumn = [];
                for (var j = 0; j < 4; j++) {
                    this.collumn.push(this._tilesMatrix[j][i]);
                }
                i === 3 ? cc.log(this.collumn) : null;
                this.collumn.forEach(function (element, index, array) {
                    if (_this6.skip || array[index + 1] === undefined) {
                        _this6.skip = false;
                        return;
                    }
                    _this6.nextElement = array[index + 1];
                    _this6.elementScript = element.getComponent('tilesScript');
                    if (_this6.nextElement !== undefined) _this6.nextElementScript = _this6.nextElement.getComponent('tilesScript');else return;
                    // cc.log(this.elementScript.number, this.nextElementScript.number);
                    // cc.log(this.elementScript.number === this.nextElementScript.number);
                    if (_this6.elementScript.number === _this6.nextElementScript.number) {
                        _this6.skip = true;
                        var copyTile = element;
                        cc.log(copyTile);
                        _this6.nextElementScript.setNumber(_this6.nextElementScript.number *= 2);
                        _this6.nextElement.runAction(cc.sequence(cc.scaleTo(0.125, 1.25), cc.scaleTo(0.125, 1)));
                        element.active = false;
                        _this6.elementScript.setNumber(0);
                        var action = cc.sequence(cc.moveBy(0.125, 0, -105), cc.callFunc(function () {
                            copyTile.destroy();
                        }));
                        copyTile.runAction(action);
                        // element.active = false;
                    }
                    return;
                });
            }
            return;
        }

        for (var _i = 0; _i < 4; _i++) {
            this.collumn = [];
            for (var _j3 = 0; _j3 < 4; _j3++) {
                this.collumn.push(this._tilesMatrix[_j3][_i]);
            }
            cc.log(this.collumn.reverse());
            this.collumn.forEach(function (element, index, array) {
                if (_this6.skip) {
                    _this6.skip = false;
                    return;
                }
                _this6.nextElement = array[index + 1];
                _this6.elementScript = element.getComponent('tilesScript');
                if (_this6.nextElement !== undefined) _this6.nextElementScript = _this6.nextElement.getComponent('tilesScript');else return;
                // cc.log(this.elementScript.number, this.nextElementScript.number);
                // cc.log(this.elementScript.number === this.nextElementScript.number);
                if (_this6.elementScript.number === _this6.nextElementScript.number) {
                    _this6.skip = true;
                    var copyTile = element;
                    cc.log(copyTile);
                    _this6.nextElementScript.setNumber(_this6.nextElementScript.number *= 2);
                    _this6.nextElement.runAction(cc.sequence(cc.scaleTo(0.125, 1.25), cc.scaleTo(0.125, 1)));
                    element.active = false;
                    _this6.elementScript.setNumber(0);
                    var action = cc.sequence(cc.moveBy(0.125, 0, -105), cc.callFunc(function () {
                        copyTile.destroy();
                    }));
                    copyTile.runAction(action);
                    // element.active = false;
                    _this6.skip = true;
                }
            });
            this.collumn.reverse();
        }
    },

    _generateRandomValue: function _generateRandomValue() {
        cc.log(this._tilesMatrix);
        do {
            this.randomCollumn = Math.floor(Math.random() * 4);
            this.randomRow = Math.floor(Math.random() * 4);
            if (this._tilesMatrix.every(function (element) {
                return element.every(function (element) {
                    return element.active;
                });
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
    },
    _setupGrid: function _setupGrid() {
        var numberIndex = 1;
        this._tilesMatrix.push([], [], [], []);
        for (var collumn = 0; collumn < 4; collumn++) {
            for (var row = 0; row < 4; row++) {
                var tile = cc.instantiate(this.tilePrefab);
                tile.active = Math.random() > 0.9 ? true : false;
                tile.on('mousedown', this._onClick, tile);
                tile.active ? tile.getComponent('tilesScript').setNumber(Math.random() > 0.5 ? 2 : 4) : tile.getComponent('tilesScript').setNumber(0);
                tile.name = 'tile ' + numberIndex++;
                tile.setPosition(cc.v2(-157.5 + 105 * row, 157.5 - 105 * collumn));
                this._tilesMatrix[Number(String((tile.getPosition().y - 157.5) * -1)[0])][Number(String(tile.getPosition().x + 157.5)[0])] = tile;
                this.node.addChild(tile);
            }
        }
    },


    _onClick: function _onClick() {
        this.script = this.getComponent('tilesScript');
        this.script.setNumber(2);
    },

    onLoad: function onLoad() {
        var _this7 = this;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
        this._setupGrid();
        this.node.on('move', this._generateRandomValue, this);
        this.node.on('right', this._moveRight, this);
        this.node.on('adjust', function (adjustRight) {
            _this7._tilesMatrix.forEach(function (element, rowIndex) {
                var numbers = element.filter(function (element) {
                    return element.active;
                });
                var zeros = element.filter(function (element) {
                    return !element.active;
                });
                adjustRight ? element = zeros.concat(numbers) : element = numbers.concat(zeros);
                element.forEach(function (element, collumnIndex) {
                    return element.runAction(cc.sequence(cc.moveTo(_this7._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex), cc.callFunc(function () {
                        cc.log('this run later');
                    })));
                });
                cc.log(_this7._tilesMatrix);
            });
        }, this);
        this.node.on('combineRow', this._combineRow, this);
        this.node.on('combineCollumn', this._combineCollumn, this);

        // this.node.on('mousedown', this._onClick, this);
    },
    start: function start() {},
    update: function update(dt) {}
});

cc._RF.pop();
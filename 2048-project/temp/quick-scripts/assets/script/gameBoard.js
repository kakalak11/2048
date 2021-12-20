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

cc.Class({
    extends: cc.Component,

    properties: {
        tilePrefab: cc.Prefab,
        winBoard: cc.Node,
        loseBoard: cc.Node,
        swipeSound: cc.AudioSource,
        combineSound: cc.AudioSource,
        _tilesMatrix: [],
        _moving: null,
        _time: 0.25 / 8,
        _check: true,
        _combined: false,
        _posistionChanged: null,
        _skip: false
    },

    // LIFE-CYCLE CALLBACKS:

    // _onKeyDown: function (event) {
    //     if (this._moving) return;
    //     this.swipeSound.play();
    //     this._moving = true;
    //     this._check = false;
    //     switch (event.keyCode) {
    //         case cc.macro.KEY.d:
    //             this._moveRow(true);
    //             this._combineRow(true);
    //             this.scheduleOnce(() => {
    //                 this._moveRow(true);
    //                 this._adjustPosition();
    //             }, this._time);
    //             break;
    //         case cc.macro.KEY.a:
    //             this._moveRow(false);
    //             this._combineRow(false);
    //             this.scheduleOnce(() => {
    //                 this._moveRow(false);
    //                 this._adjustPosition();
    //             }, this._time);
    //             break;
    //         case cc.macro.KEY.s:
    //             this._moveCollumn(true);
    //             this._combineCollumn(true);
    //             this.scheduleOnce(() => {
    //                 this._moveCollumn(true);
    //                 this._adjustPosition();
    //             }, this._time);
    //             break;
    //         case cc.macro.KEY.w:
    //             this._moveCollumn(false);
    //             this._combineCollumn(false);
    //             this.scheduleOnce(() => {
    //                 this._moveCollumn(false);
    //                 this._adjustPosition();
    //             }, this._time);
    //             break;
    //         case cc.macro.KEY.c:
    //             this.node.dispatchEvent(new cc.Event.EventCustom('lose', true));
    //             break;
    //         case cc.macro.KEY.space:
    //             console.clear();
    //             this._moving = false;
    //             break;
    //         default:
    //             this._moving = false;
    //             break;
    //     }
    // },

    //Move logic

    _moveRow: function _moveRow(directionRight) {
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

    //Combine logic

    _combineRow: function _combineRow(directionRight) {
        var _this2 = this;

        this._tilesMatrix.forEach(function (element, index) {
            directionRight ? _this2.array = element.reverse() : _this2.array = element;
            _this2.array.forEach(function (element, index, array) {
                if (_this2.skip) {
                    _this2.skip = false;
                    return;
                }
                _this2.nextElement = array[index + 1];
                _this2.elementScript = element.getComponent('tilesScript');
                if (_this2.nextElement === undefined) return;
                _this2.nextElementScript = _this2.nextElement.getComponent('tilesScript');
                if (_this2.elementScript.number === 0) return;
                if (_this2.elementScript.number === _this2.nextElementScript.number) {
                    _this2.skip = true;
                    _this2.elementScript.setNumber(_this2.elementScript.number *= 2);
                    element.runAction(cc.sequence(cc.scaleTo(_this2._time / 2, 1.25), cc.scaleTo(_this2._time / 2, 1)));
                    _this2.nextElementScript.moveCombine(element.getPosition(cc.v2()), _this2._time / 2);
                    _this2._combined = true;
                }
            });
            directionRight ? _this2.array.reverse() : null;
        });
        return;
    },

    _combineCollumn: function _combineCollumn(directionDown) {
        var _this3 = this;

        for (var i = 0; i < 4; i++) {
            this.collumn = [];
            for (var j = 0; j < 4; j++) {
                this.collumn.push(this._tilesMatrix[j][i]);
            }
            directionDown ? this.collumn.reverse() : null;
            this.collumn.forEach(function (element, index, array) {
                if (_this3.skip) {
                    _this3.skip = false;
                    return;
                }
                _this3.nextElement = array[index + 1];
                _this3.elementScript = element.getComponent('tilesScript');
                if (_this3.nextElement === undefined) return;
                _this3.nextElementScript = _this3.nextElement.getComponent('tilesScript');
                if (_this3.elementScript.number === 0) return;
                if (_this3.elementScript.number === _this3.nextElementScript.number) {
                    _this3.skip = true;
                    _this3.elementScript.setNumber(_this3.elementScript.number *= 2);
                    element.runAction(cc.sequence(cc.scaleTo(_this3._time / 2, 1.25), cc.scaleTo(_this3._time / 2, 1)));
                    _this3.nextElementScript.moveCombine(element.getPosition(cc.v2()), _this3._time / 2);
                    _this3._combined = true;
                }
            });
            directionDown ? this.collumn.reverse() : null;
        }
        return;
    },

    // Board logic

    _adjustPosition: function _adjustPosition() {
        var _this4 = this;

        this._tilesMatrix.forEach(function (element, rowIndex) {
            return element.forEach(function (element, collumnIndex) {
                if (element.active) {
                    var lastPos = element.getPosition(cc.v2());
                    _this4.action = cc.sequence(cc.moveTo(_this4._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex), cc.callFunc(function () {
                        var currentPos = element.getPosition(cc.v2());
                        if (Math.abs(Math.floor(lastPos.x - currentPos.x)) > 25 || Math.abs(Math.floor(lastPos.y - currentPos.y)) > 25) {
                            _this4._check = true;
                            // cc.log('last position', lastPos, 'current position', currentPos, element.name);
                            // cc.log('x change', Math.floor(lastPos.x - currentPos.x));
                            // cc.log('y change', Math.floor(lastPos.y - currentPos.y));
                        }
                    }));
                    element.runAction(_this4.action);
                    return;
                } else {
                    element.setPosition(cc.v2(-157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex));
                    return;
                }
            });
        });
        this.scheduleOnce(function () {
            if (_this4._combined) {
                _this4.combineSound.play();
                _this4._combined = false;
            }
            _this4._generateRandomValue();
            _this4.node.dispatchEvent(new cc.Event.EventCustom('updateScore', true));
            _this4.node.emit('canMove');
        }, this._time * 2);
        return;
    },

    _generateRandomValue: function _generateRandomValue() {
        var _this5 = this;

        if (!this._check) {
            this._moving = false;
            return;
        }
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
        // this.randomTile.once('position-changed', () => this._check = true, this);
        this.randomTile.active = true;
        this.randomTile.scale = 0;
        this.number.setNumber(Math.random() > 0.7 ? 4 : 2);
        this.randomTile.setPosition(cc.v2(-157.5 + 105 * this.randomCollumn, 157.5 - 105 * this.randomRow));
        this.randomTile.runAction(cc.sequence(cc.scaleTo(this._time, 1), cc.callFunc(function () {

            _this5.node.emit('checkWin');
            _this5.node.emit('checkLose');
        })));
        this._check = false;
    },
    _setupGrid: function _setupGrid(playing) {
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
        var numberIndex = 1;
        this._tilesMatrix.push([], [], [], []);
        for (var collumn = 0; collumn < 4; collumn++) {
            for (var row = 0; row < 4; row++) {
                this.tile = cc.instantiate(this.tilePrefab);
                this.tile.active = false;
                this.tile.on('mousedown', this._onClick, this.tile);
                this.tile.name = 'tile ' + numberIndex++;
                this.tile.setPosition(cc.v2(-157.5 + 105 * row, 157.5 - 105 * collumn));
                this._tilesMatrix[Number(String((this.tile.getPosition().y - 157.5) * -1)[0])][Number(String(this.tile.getPosition().x + 157.5)[0])] = this.tile;
                this.node.addChild(this.tile);
            }
        }
        if (playing) return;
        for (var i = 0; i < 2; i++) {
            this._check = true;
            this._generateRandomValue();
        }
        this.node.emit('canMove');
        this._check = false;
    },


    _checkWin: function _checkWin() {
        var _this6 = this;

        var win = false;
        this._tilesMatrix.flat().forEach(function (element) {
            return element.getComponent('tilesScript').number === 2048 ? win = true : null;
        });
        if (win) {
            cc.log('you have won');
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
            this.scheduleOnce(function () {
                _this6.node.dispatchEvent(new cc.Event.EventCustom('win', true));
                _this6.node.emit('canMove', false);
            }, 0.5);
            return true;
        }
        return false;
    },

    _checkLose: function _checkLose() {
        var _this7 = this;

        if (!this._tilesMatrix.flat().every(function (element) {
            return element.active;
        })) return;
        this.checkRow = this._tilesMatrix.every(function (element) {
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
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
            this.scheduleOnce(function () {
                _this7.node.dispatchEvent(new cc.Event.EventCustom('lose', true));
                _this7.node.emit('canMove', false);
            }, 0.5);
            return true;
        }
        return false;
    },

    _reset: function _reset() {
        this.node.emit('canMove');
        this.node.removeAllChildren(true);
        this._tilesMatrix = [];
        this.node.dispatchEvent(new cc.Event.EventCustom('updateScore', true));
        cc.log(this.node.children);
    },


    _onClick: function _onClick() {
        cc.log(this.name);
        this.script = this.getComponent('tilesScript');
        this.script.setNumber(2048);
        return;
    },

    _addEvent: function _addEvent() {
        var _this8 = this;

        this.node.on('moveRow', function (directionRight) {
            _this8.swipeSound.play();
            _this8._moveRow(directionRight);
            _this8._combineRow(directionRight);
            _this8.scheduleOnce(function () {
                _this8._moveRow(directionRight);
                _this8._adjustPosition();
            }, _this8._time);
        }, this);

        this.node.on('moveCollumn', function (directionDown) {
            _this8.swipeSound.play();
            _this8._moveCollumn(directionDown);
            _this8._combineCollumn(directionDown);
            _this8.scheduleOnce(function () {
                _this8._moveCollumn(directionDown);
                _this8._adjustPosition();
            }, _this8._time);
        }, this);
    },

    onLoad: function onLoad() {
        var _this9 = this;

        this._addEvent();
        this.node.on('checkWin', this._checkWin, this);
        this.node.on('checkLose', this._checkLose, this);
        this.node.on('move', function (event) {
            event.stopPropagation();
            _this9._check = true;
        }, this);
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
        
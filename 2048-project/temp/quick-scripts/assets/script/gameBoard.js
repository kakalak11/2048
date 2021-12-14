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
        _moving: null
    },

    // LIFE-CYCLE CALLBACKS:

    _onKeyDown: function _onKeyDown(event) {
        if (this._moving) return;
        switch (event.keyCode) {
            case cc.macro.KEY.right:
                this._moving = true;
                this.node.emit('right');
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
                this._generateRandomValue();
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
                    _this._moving = false;
                })));
            });
            for (var i = 0; i < 4; i++) {
                _this._tilesMatrix[rowIndex][i] = element.shift();
            }
        });
        this.node.emit('move');
        this.node.emit('combine');
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
                    _this2._moving = false;
                })));
            });
            for (var i = 0; i < 4; i++) {
                _this2._tilesMatrix[rowIndex][i] = element.shift();
            }
        });
        this.node.emit('move');
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
                element.runAction(cc.moveTo(0.25, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex));
                _this3._moving = false;
            });
        });
        this.node.emit('move');
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
                element.runAction(cc.moveTo(0.25, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex));
                _this4._moving = false;
            });
        });
        this.node.emit('move');
    },

    _combineTile: function _combineTile() {
        cc.log('time to combine !!!');
    },

    _generateRandomValue: function _generateRandomValue() {
        do {
            this.randomCollumn = Math.floor(Math.random() * 4);
            this.randomRow = Math.floor(Math.random() * 4);
            // cc.log('generate a new random');
            if (this._tilesMatrix.every(function (element) {
                return element.every(function (element) {
                    return element.active;
                });
            })) {
                return;
            }
        } while (this._tilesMatrix[this.randomRow][this.randomCollumn].active);
        this.randomTile = this._tilesMatrix[this.randomRow][this.randomCollumn];
        // cc.log(this.randomTile);
        this.randomTile.active = true;
        this.randomTile.scale = 0;
        this.randomTile.setPosition(cc.v2(-157.5 + 105 * this.randomCollumn, 157.5 - 105 * this.randomRow));
        this.randomTile.runAction(cc.scaleTo(0.25, 1));
        // cc.log(this._tilesMatrix);
    },
    _setupGrid: function _setupGrid() {
        var numberIndex = 1;
        this._tilesMatrix.push([], [], [], []);
        for (var collumn = 0; collumn < 4; collumn++) {
            for (var row = 0; row < 4; row++) {
                var tile = cc.instantiate(this.tilePrefab);
                tile.active = Math.random() > 0.9 ? true : false;
                tile.getComponent('tilesScript').setNumber(2);
                tile.name = 'tile ' + numberIndex++;
                tile.setPosition(cc.v2(-157.5 + 105 * row, 157.5 - 105 * collumn));
                // cc.log(Number(String(tile.getPosition().x + 157.5)[0]), Number(String((tile.getPosition().y - 157.5) * -1)[0]));
                this._tilesMatrix[Number(String((tile.getPosition().y - 157.5) * -1)[0])][Number(String(tile.getPosition().x + 157.5)[0])] = tile;
                this.node.addChild(tile);
            }
        }
    },
    onLoad: function onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
        this._setupGrid();
        this.node.on('move', this._generateRandomValue, this);
        this.node.on('right', this._moveRight, this);
        this.node.on('combine', this._combineTile, this);

        // this._tilesMatrix[0].forEach((element, index, array) => {
        //     this.nextElement = array[index + 1];
        //     cc.log(element, this.nextElement);
        //     this.elementScript = element.getComponent('tilesScript');
        //     if (this.nextElement) this.nextElementScript = this.nextElement.getComponent('tilesScript');
        //     else return;
        //     cc.log(this.elementScript.number, this.nextElementScript.number);
        //     cc.log(this.elementScript.number === this.nextElementScript.number);
        //     if (this.elementScript.number === this.nextElementScript.number) {
        //         this.nextElementScript.setNumber(this.nextElementScript.number *= 2);
        //         element.active = false;
        //     }
        // })
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
        
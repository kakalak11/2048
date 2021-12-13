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
                // this._showPostion();
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

        var _loop = function _loop(i) {
            var collumn = [];
            for (var j = 0; j < 4; j++) {
                collumn.push(_this3._tilesMatrix[j][i]);
            }
            var numbers = collumn.filter(function (element) {
                return element.active;
            });
            var zeros = collumn.filter(function (element) {
                return !element.active;
            });
            collumn = zeros.concat(numbers);
            collumn.forEach(function (element, index) {
                return element.runAction(cc.sequence(cc.moveTo(0.25, -157.5 + 105 * i, 157.5 - 105 * index), cc.callFunc(function () {
                    _this3._moving = false;
                })));
            });
            for (var _j = 0; _j < 4; _j++) {
                _this3._tilesMatrix[_j][i] = collumn.shift();
            }
        };

        for (var i = 0; i < 4; i++) {
            _loop(i);
        }
        this.node.emit('move');
    },

    _moveUp: function _moveUp() {
        var _this4 = this;

        var _loop2 = function _loop2(i) {
            var collumn = [];
            for (var j = 0; j < 4; j++) {
                collumn.push(_this4._tilesMatrix[j][i]);
            }
            var numbers = collumn.filter(function (element) {
                return element.active;
            });
            var zeros = collumn.filter(function (element) {
                return !element.active;
            });
            collumn = numbers.concat(zeros);
            collumn.forEach(function (element, index) {
                return element.runAction(cc.sequence(cc.moveTo(0.25, -157.5 + 105 * i, 157.5 - 105 * index), cc.callFunc(function () {
                    _this4._moving = false;
                })));
            });
            for (var _j2 = 0; _j2 < 4; _j2++) {
                _this4._tilesMatrix[_j2][i] = collumn.shift();
            }
        };

        for (var i = 0; i < 4; i++) {
            _loop2(i);
        }
        this.node.emit('move');
    },

    _showPostion: function _showPostion() {},


    _combineTiles: function _combineTiles() {
        this._tilesMatrix.forEach(function (element) {});
    },

    _generateRandomValue: function _generateRandomValue() {
        cc.log(this._tilesMatrix);
        var randomArray = [];
        this._tilesMatrix.forEach(function (element) {
            randomArray.push(element.filter(function (element) {
                return !element.active;
            }));
        });
        var randomIndex = Math.floor(Math.random() * randomArray.length);
        while (!randomArray[randomIndex].length) {
            randomIndex = Math.floor(Math.random() * randomArray.length);
            cc.log('generate new random');
            if (randomArray.every(function (element) {
                return !element.length;
            })) {
                this.node.emit('gameOver');
                cc.log('game over');
                return;
            }
        };
        var randomTile = randomArray[randomIndex][Math.floor(Math.random() * randomArray[randomIndex].length)];
        randomTile.active = true;
        randomTile.getComponent('tilesScript').setNumber(randomTile.getComponent('tilesScript').number);
        randomTile.scale = 0;
        randomTile.runAction(cc.scaleTo(0.25, 1).easing(cc.easeExponentialIn(0.25)));
        return;
    },
    _setupGrid: function _setupGrid() {
        var numberIndex = 1;
        this._tilesMatrix.push([], [], [], []);
        for (var _collumn = 0; _collumn < 4; _collumn++) {
            for (var row = 0; row < 4; row++) {
                var tile = cc.instantiate(this.tilePrefab);
                tile.active = Math.random() > 0.9 ? true : false;
                tile.getComponent('tilesScript').setNumber(numberIndex);
                tile.name = 'tile ' + numberIndex++;
                tile.setPosition(cc.v2(-157.5 + 105 * row, 157.5 - 105 * _collumn));
                // cc.log(Number(String(tile.getPosition().x + 157.5)[0]), Number(String((tile.getPosition().y - 157.5) * -1)[0]));
                this._tilesMatrix[Number(String((tile.getPosition().y - 157.5) * -1)[0])][Number(String(tile.getPosition().x + 157.5)[0])] = tile;
                this.node.addChild(tile);
            }
        }
    },
    onLoad: function onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
        this.node.on('move', this._generateRandomValue, this);
    },
    start: function start() {
        this._setupGrid();
    },
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
        
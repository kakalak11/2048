(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scenes/testScript/test.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4637dhzvQlAk5DmzV/fSdc6', 'test', __filename);
// scenes/testScript/test.js

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

var Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
        nodePrefab: cc.Prefab,
        _canMove: true,
        _tileArray: [],
        _moved: true
    },

    // LIFE-CYCLE CALLBACKS:

    _createTile: function _createTile(number) {
        this._tileArray.push([], [], [], []);
        var index = 0;
        for (var row = 0; row < number; row++) {
            for (var collumn = 0; collumn < number; collumn++) {
                this.tile = cc.instantiate(this.nodePrefab);
                this.tile.opacity = 0;
                this.tile.name = 'tile ' + (index + 1);
                // this.tile.on('mousedown', this._onClick, this.tile);
                this.node.addChild(this.tile);
                this._tileArray[row].push(this.tile);
                this.script = this.tile.getComponent('prefabScript');
                this.xPos = -157.5 + collumn * 105;
                this.yPos = 157.5 - row * 105;
                this.script._pos = cc.v2(this.xPos, this.yPos);
                this.script._index = index;
                index++;
            }
        }
        for (var i = 0; i < 2; i++) {
            do {
                this.random = Math.floor(Math.random() * 16);
            } while (this._tileArray.flat()[this.random].opacity !== 0);
            Emitter.instance.emit('setActive', this.random);
        }
        Emitter.instance.emit('setPosition', true);
    },

    _onKeyDown: function _onKeyDown(event) {
        if (!this._canMove) return;
        this._canMove = false;
        switch (event.keyCode) {
            case cc.macro.KEY.d:
                this._moveRow(true);
                this._combineRow(true);
                this._moveRow(true);
                Emitter.instance.emit('setPosition');
                this._generateRandomtile();
                break;
            case cc.macro.KEY.a:
                this._moveRow(false);
                this._combineRow(false);
                this._moveRow(false);
                Emitter.instance.emit('setPosition');
                this._generateRandomtile();
                break;
            case cc.macro.KEY.w:
                this._moveCollumn(false);
                this._combineCollumn(false);
                this._moveCollumn(false);
                Emitter.instance.emit('setPosition');
                this._generateRandomtile();
                break;
            case cc.macro.KEY.s:
                this._moveCollumn(true);
                this._combineCollumn(true);
                this._moveCollumn(true);
                Emitter.instance.emit('setPosition');
                this._generateRandomtile();
                break;
            default:
                this._canMove = true;
                break;
        }
    },

    _onClick: function _onClick() {
        if (!this.opacity) return;
        this.script = this.getComponent('prefabScript');
        this.script.number === 2 ? this.script.setNumber(4) : this.script.setNumber(2);
    },

    _moveRow: function _moveRow(moveRight) {
        var _this = this;

        this._tileArray.forEach(function (element, index) {
            _this.numbers = element.filter(function (element) {
                return element.opacity !== 0;
            });
            _this.zeros = element.filter(function (element) {
                return element.opacity === 0;
            });
            moveRight ? element = _this.zeros.concat(_this.numbers) : element = _this.numbers.concat(_this.zeros);
            element.forEach(function (element, index) {
                _this.script = element.getComponent('prefabScript');
                _this.script._pos.x = -157.5 + index * 105;
            });
            for (var collumn = 0; collumn < 4; collumn++) {
                _this._tileArray[index][collumn] = element.shift();
            }
        });
    },

    _moveCollumn: function _moveCollumn(moveDown) {
        var _this2 = this;

        for (var collumn = 0; collumn < 4; collumn++) {
            this.collumn = [];
            for (var row = 0; row < 4; row++) {
                this.collumn.push(this._tileArray[row][collumn]);
            }this.numbers = this.collumn.filter(function (element) {
                return element.opacity !== 0;
            });
            this.zeros = this.collumn.filter(function (element) {
                return element.opacity === 0;
            });
            moveDown ? this.collumn = this.zeros.concat(this.numbers) : this.collumn = this.numbers.concat(this.zeros);
            this.collumn.forEach(function (element, index) {
                _this2.script = element.getComponent('prefabScript');
                _this2.script._pos.y = 157.5 - index * 105;
            });
            for (var _row = 0; _row < 4; _row++) {
                this._tileArray[_row][collumn] = this.collumn.shift();
            }
        }
    },

    _combineRow: function _combineRow(combineRight) {
        var _this3 = this;

        this._tileArray.forEach(function (element, row) {
            combineRight ? element.reverse() : element;
            element.forEach(function (element, index, array) {
                if (_this3.skip) {
                    _this3.skip = false;
                    return;
                }
                _this3.currentScript = element.getComponent('prefabScript');
                if (array[index + 1] === undefined) return;
                _this3.nextElement = array[index + 1];
                _this3.nextScript = _this3.nextElement.getComponent('prefabScript');
                if (_this3.nextScript.number === 0 || _this3.currentScript === 0) return;
                if (_this3.currentScript.number === _this3.nextScript.number) {
                    Emitter.instance.emit('getCombine', { key: _this3.currentScript._index });
                    Emitter.instance.emit('setCombine', { key: _this3.nextScript._index, pos: _this3.currentScript._pos });
                    _this3.skip = true;
                    return;
                }
            });
            combineRight ? element.reverse() : null;
        });
    },

    _combineCollumn: function _combineCollumn(combineDown) {
        var _this4 = this;

        for (var collumn = 0; collumn < 4; collumn++) {
            this.collumn = [];
            for (var row = 0; row < 4; row++) {
                this.collumn.push(this._tileArray[row][collumn]);
            }combineDown ? this.collumn.reverse() : this.collumn;
            this.collumn.forEach(function (element, index, array) {
                if (_this4.skip) {
                    _this4.skip = false;
                    return;
                }
                _this4.currentElement = element;
                _this4.currentScript = _this4.currentElement.getComponent('prefabScript');
                if (array[index + 1] === undefined) return;
                _this4.nextElement = array[index + 1];
                _this4.nextScript = _this4.nextElement.getComponent('prefabScript');
                if (_this4.nextScript.number === 0 || _this4.currentScript === 0) return;
                if (_this4.currentScript.number === _this4.nextScript.number) {
                    Emitter.instance.emit('getCombine', { key: _this4.currentScript._index });
                    Emitter.instance.emit('setCombine', { key: _this4.nextScript._index, pos: _this4.currentScript._pos });
                    _this4.skip = true;
                    return;
                }
            });
            combineDown ? this.collumn.reverse() : null;
        }
    },

    _generateRandomtile: function _generateRandomtile() {
        if (!this._moved) return;
        do {
            this.random = Math.floor(Math.random() * 16);
            if (this._tileArray.flat().every(function (element) {
                return element.opacity !== 0;
            })) {
                return;
            }
        } while (this._tileArray.flat()[this.random].opacity !== 0);
        this.script = this._tileArray.flat()[this.random].getComponent('prefabScript');
        Emitter.instance.emit('setActive', this.script._index);
        this._moved = false;
        return;
    },

    _addEvent: function _addEvent() {
        var _this5 = this;

        Emitter.instance.registerEvent('setPosition', this._generateRandomtile.bind(this));
        this.node.on('moved', function () {
            _this5._moved = true;
            cc.log('move');
        }, this);
        this.node.on('canMove', function (event) {
            event.stopPropagation();
            _this5._canMove = true;
        }, this);
    },

    onLoad: function onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
        Emitter.instance = new Emitter();
        this._createTile(4);
        this._addEvent();
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
        //# sourceMappingURL=test.js.map
        
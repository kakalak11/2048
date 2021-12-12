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
            case cc.macro.KEY.down:
                this._moveDown();
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
        this.node.children.forEach(function (element, index) {
            // let collum = [];
            // for (let i = 0; i < 4; i++) {
            //     collum.push(this.node.children[i].children[index]);
            //     cc.log(this.node.children[i].children[index]);
            // }
            // // cc.log(collum);
            // let numbers = collum.filter(element => element.active);
            // let zeros = collum.filter(element => !element.active);
            // let newArray = zeros.concat(numbers);
            // // cc.log(newArray);
            // for (let i = 0; i < 4; i++) {
            //     // this.node.removeChild(this.node.children[i].children[index]);
            //     newArray[i].setParent(this.node.children[i]);
            // }
            // cc.log(this.node.children)
        });
        for (var i = 1; i < 4; i++) {
            this.node.children[i].children[0].setParent(this.node.children[0]);
            this.node.children[i].children[0].setParent(this.node.children[0]);
            this.node.children[i].children[0].setParent(this.node.children[0]);
            this.node.children[i].children[0].setParent(this.node.children[0]);
        }
        cc.log(this.node.children[0].children);
        this.node.children[0].children[0] = this.node.children[0].children[15];
        cc.log(this.node.children[0].children);
    },

    _setupGrid: function _setupGrid() {
        var _this = this;

        var numberIndex = 1;
        this.node.children.forEach(function (element, index) {
            for (var i = 0; i < 4; i++) {
                var tile = cc.instantiate(_this.tilePrefab);
                tile.active = Math.random() > 0.7 ? true : false;
                tile.setPosition(cc.v2(-415 / 2 + 50 + 105 * i, 0));
                tile.getComponent('tilesScript').setNumber(numberIndex);
                tile.name = 'tiles' + numberIndex++;
                element.addChild(tile);
            }
        });
        // cc.log(this.node.children.forEach(element => element.children.forEach(element => cc.log(element))));
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
        
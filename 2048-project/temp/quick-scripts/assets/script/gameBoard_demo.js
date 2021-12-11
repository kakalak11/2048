(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/gameBoard_demo.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f0d2eJjuW1CvKd7G3hEXqgV', 'gameBoard_demo', __filename);
// script/gameBoard_demo.js

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

var utilities = require('utils');

cc.Class({
    extends: cc.Component,

    properties: {
        tilesPrefab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:


    _onKeyDown: function _onKeyDown(event) {
        switch (event.keyCode) {
            case macro.KEY.space:
                this._moveDown();
                break;
        }
    },

    _moveDown: function _moveDown() {
        this.node.children.forEach(function (element) {
            element.y -= element.width + 5;
        });
        cc.log(this.node.children);
    },

    _tilesInit: function _tilesInit() {
        var tiles = cc.instantiate(this.tilesPrefab);
        tiles.color = Math.random() > 0.9 ? cc.Color.RED : cc.Color.WHITE;
        tiles.x -= 81.25 / 2;
        tiles.y -= 81.25 / 2;
        tiles;
        this.node.addChild(tiles);
    },

    onLoad: function onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
    },
    start: function start() {}
}

// update (dt) {},
);

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
        //# sourceMappingURL=gameBoard_demo.js.map
        
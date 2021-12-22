(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/loseBoardScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4e973i4LAhKiIcut4t1zfFh', 'loseBoardScript', __filename);
// script/loseBoardScript.js

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
        gameScore: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    _lose: function _lose() {
        this.node.getChildByName('score').getComponent(cc.Label).string = this.gameScore.getComponent(cc.Label).string;
        this.node.runAction(this.node.runAction(cc.moveTo(0.5, 0, 0).easing(cc.easeExponentialInOut(0.5))));
    },

    onClickReturnButton: function onClickReturnButton() {
        this.node.runAction(this.node.runAction(cc.moveTo(0.5, 0, -800).easing(cc.easeExponentialInOut(0.5))));
        Emitter.instance.emit('showMenu');
        Emitter.instance.emit('hideWindow');
    },

    onLoad: function onLoad() {
        this.node.on('loseBoard', this._lose, this);
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
        //# sourceMappingURL=loseBoardScript.js.map
        
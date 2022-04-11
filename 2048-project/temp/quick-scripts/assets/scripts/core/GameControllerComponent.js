(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/core/GameControllerComponent.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c0979Fw93ZI76TatrCWmuKP', 'GameControllerComponent', __filename);
// scripts/core/GameControllerComponent.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameControllerComponent = /** @class */ (function (_super) {
    __extends(GameControllerComponent, _super);
    function GameControllerComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameControllerComponent.prototype.onLoad = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    GameControllerComponent.prototype.onKeyDown = function (event) {
        var keyCode = event.keyCode;
        switch (keyCode) {
            case cc.macro.KEY.left || cc.macro.KEY.a:
                console.log('go left');
                break;
        }
    };
    GameControllerComponent.prototype.onKeyUp = function () {
    };
    GameControllerComponent = __decorate([
        ccclass('GameControllerComponent')
    ], GameControllerComponent);
    return GameControllerComponent;
}(cc.Component));
exports.default = GameControllerComponent;

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
        //# sourceMappingURL=GameControllerComponent.js.map
        
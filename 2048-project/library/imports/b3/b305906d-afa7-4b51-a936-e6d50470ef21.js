"use strict";
cc._RF.push(module, 'b3059Btr6dLUak25tUEcO8h', 'SpritePoolManager');
// scenes/testScene/testScript/SpritePoolManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SpritePoolManager = /** @class */ (function (_super) {
    __extends(SpritePoolManager, _super);
    function SpritePoolManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpritePoolManager.prototype.onLoad = function () {
        var _this = this;
        resources.load("RavenmoreIconPack.02.2014/512/" + assetName, cc.SpriteFrame, function (err, spriteFrame) {
            _this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    };
    SpritePoolManager = __decorate([
        ccclass('SpritePoolManager')
    ], SpritePoolManager);
    return SpritePoolManager;
}(cc.Component));
exports.default = SpritePoolManager;

cc._RF.pop();
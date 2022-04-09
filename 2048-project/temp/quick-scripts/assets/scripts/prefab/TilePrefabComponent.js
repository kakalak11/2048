(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/prefab/TilePrefabComponent.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '311cdTQ+3lHNZBjLdnM6kaA', 'TilePrefabComponent', __filename);
// scripts/prefab/TilePrefabComponent.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TilePrefabComponent = /** @class */ (function (_super) {
    __extends(TilePrefabComponent, _super);
    function TilePrefabComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sprite = null;
        _this.label = null;
        _this._value = null;
        _this._color = null;
        return _this;
    }
    TilePrefabComponent.prototype.onLoad = function () {
        this.node.on('INIT', this.init, this);
    };
    TilePrefabComponent.prototype.init = function (_a) {
        var value = _a.value, color = _a.color;
        this._value = value;
        this._color = color;
        this.label.string = this._value;
        this.sprite.node.color = this._color;
    };
    __decorate([
        property(cc.Sprite)
    ], TilePrefabComponent.prototype, "sprite", void 0);
    __decorate([
        property(cc.Label)
    ], TilePrefabComponent.prototype, "label", void 0);
    TilePrefabComponent = __decorate([
        ccclass
    ], TilePrefabComponent);
    return TilePrefabComponent;
}(cc.Component));
exports.default = TilePrefabComponent;

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
        //# sourceMappingURL=TilePrefabComponent.js.map
        
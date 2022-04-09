"use strict";
cc._RF.push(module, '311cdTQ+3lHNZBjLdnM6kaA', 'TilePrefabComponent');
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
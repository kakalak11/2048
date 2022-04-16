"use strict";
cc._RF.push(module, 'e96b4uBFXdDUrFrCBGwQz/1', 'GameDirector');
// scripts/core/GameDirector.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PoolFactory_1 = require("../common/PoolFactory");
var getGameConfig_1 = require("../common/getGameConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameDirector = /** @class */ (function (_super) {
    __extends(GameDirector, _super);
    function GameDirector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.poolFactory = null;
        _this.gameManager = null;
        return _this;
    }
    GameDirector.prototype.onLoad = function () {
        console.log(getGameConfig_1.default);
    };
    GameDirector.prototype.start = function () {
        this.gameManager.emit('INIT', this.poolFactory, this.node.config);
    };
    __decorate([
        property(PoolFactory_1.default)
    ], GameDirector.prototype, "poolFactory", void 0);
    __decorate([
        property(cc.Node)
    ], GameDirector.prototype, "gameManager", void 0);
    GameDirector = __decorate([
        ccclass('GameDirector')
    ], GameDirector);
    return GameDirector;
}(cc.Component));
exports.default = GameDirector;

cc._RF.pop();
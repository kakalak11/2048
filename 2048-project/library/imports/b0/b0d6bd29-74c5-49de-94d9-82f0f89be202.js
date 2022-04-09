"use strict";
cc._RF.push(module, 'b0d6b0pdMVJ3pTZgvD4m+IC', 'GameManager');
// scripts/core/GameManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManager = /** @class */ (function (_super) {
    __extends(GameManager, _super);
    function GameManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gameTable = null;
        return _this;
    }
    GameManager.prototype.onLoad = function () {
        this.node.on('INIT', this.init, this);
        this.node.on('GAME_SETUP', this.gameSetup, this);
    };
    GameManager.prototype.init = function (poolFactory, config) {
        this.poolFactory = poolFactory;
        this.config = config;
        this.gameTable.emit('INIT', poolFactory, config);
    };
    GameManager.prototype.gameSetup = function () {
        this.gameTable.emit('TABLE_SETUP');
    };
    __decorate([
        property(cc.Node)
    ], GameManager.prototype, "gameTable", void 0);
    GameManager = __decorate([
        ccclass('GameManager')
    ], GameManager);
    return GameManager;
}(cc.Component));
exports.default = GameManager;

cc._RF.pop();
"use strict";
cc._RF.push(module, '1fcb3xmlMxLmZ2r/Y5iY/PB', 'GameTable');
// scripts/core/GameTable.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameTable = /** @class */ (function (_super) {
    __extends(GameTable, _super);
    function GameTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tilesHolder = null;
        _this.prefabName = 'TILE_PREFAB';
        return _this;
    }
    GameTable.prototype.onLoad = function () {
        this.node.on('INIT', this.init, this);
        this.node.on('TABLE_SETUP', this.tableSetup, this);
    };
    ;
    GameTable.prototype.init = function (poolFactory, config) {
        this.poolFactory = poolFactory;
        this.config = config;
    };
    ;
    GameTable.prototype.tableSetup = function () {
        // const { TABLE_FORMAT } = this.config;
        this.randomGenerateTile();
        this.randomGenerateTile();
    };
    ;
    GameTable.prototype.randomGenerateTile = function () {
        var TABLE_CONFIG = this.config.TABLE_CONFIG;
        var STEP = TABLE_CONFIG.STEP, FORMAT = TABLE_CONFIG.FORMAT;
        var randomX = Math.floor(Math.random() * FORMAT.length) * STEP;
        var randomY = Math.floor(Math.random() * FORMAT[0]) * STEP;
        var object = this.poolFactory.getObject(this.prefabName);
        object.parent = this.tilesHolder;
        object.active = true;
        object.setPosition(randomX, randomY);
    };
    ;
    __decorate([
        property(cc.Node)
    ], GameTable.prototype, "tilesHolder", void 0);
    __decorate([
        property(String)
    ], GameTable.prototype, "prefabName", void 0);
    GameTable = __decorate([
        ccclass('GameTable')
    ], GameTable);
    return GameTable;
}(cc.Component));
exports.default = GameTable;

cc._RF.pop();
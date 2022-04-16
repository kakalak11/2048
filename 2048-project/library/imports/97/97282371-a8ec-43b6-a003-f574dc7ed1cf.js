"use strict";
cc._RF.push(module, '97282NxqOxDtqAD9XTcftHP', 'TileController');
// scripts/common/TileController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TileController = /** @class */ (function (_super) {
    __extends(TileController, _super);
    function TileController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeMove = 1;
        _this.distanceMove = 100;
        _this.directionList = [];
        _this.isInvokable = true;
        _this.isIdle = null;
        return _this;
    }
    TileController.prototype.onLoad = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.schedule(this.executeNextMove, 1);
    };
    ;
    TileController.prototype.onKeyDown = function (event) {
    };
    ;
    TileController.prototype.onKeyUp = function (event) {
        var direction = null;
        switch (event.keyCode) {
            case cc.macro.KEY.d:
                direction = cc.Vec2.RIGHT;
                break;
            case cc.macro.KEY.a:
                direction = cc.Vec2.RIGHT.mul(-1);
                break;
            case cc.macro.KEY.w:
                direction = cc.Vec2.UP;
                break;
            case cc.macro.KEY.s:
                direction = cc.Vec2.UP.mul(-1);
                break;
        }
        ;
    };
    ;
    TileController.prototype.executeNextMove = function (direction) {
        if (direction) {
            this.directionList.push(direction);
            return;
        }
        if (!this.directionList || this.directionList.length === 0) {
            this.isIdle = true;
            return;
        }
        var directionCommand = this.directionList.shift();
        this.moveTiles(directionCommand);
    };
    TileController.prototype.moveTiles = function (direction) {
        var _this = this;
        this.node.children.forEach(function (tile) {
            cc.tween(tile)
                .by(_this.timeMove, direction.mul(_this.distanceMove))
                .start();
        }, this);
    };
    __decorate([
        property(cc.Integer)
    ], TileController.prototype, "timeMove", void 0);
    __decorate([
        property(cc.Integer)
    ], TileController.prototype, "distanceMove", void 0);
    TileController = __decorate([
        ccclass('TileController')
    ], TileController);
    return TileController;
}(cc.Component));
exports.default = TileController;

cc._RF.pop();
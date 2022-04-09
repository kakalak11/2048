"use strict";
cc._RF.push(module, 'f4918CWTRVPeYLRi00t9BQG', 'getGameConfig');
// scripts/common/getGameConfig.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewClass.prototype.onLoad = function () {
        this.node.config = {
            TILE_COLOR: {
                GRAY: cc.Color.GRAY,
                RED: cc.Color.RED,
                GREEN: cc.Color.GREEN,
                BLUE: cc.Color.BLUE,
                YELLOW: cc.Color.YELLOW,
                ORANGE: cc.Color.ORANGE,
                CYAN: cc.Color.CYAN,
                MAGENTA: cc.Color.MAGENTA,
                BLACK: cc.Color.BLACK
            },
            TABLE_CONFIG: {
                FORMAT: [4, 4, 4, 4],
                STEP: 76.5,
                WIDTH: 
            }
        };
    };
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;
//{-114,114},{-114,37.5}

cc._RF.pop();
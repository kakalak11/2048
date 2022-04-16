(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/common/getGameConfig.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f4918CWTRVPeYLRi00t9BQG', 'getGameConfig', __filename);
// scripts/common/getGameConfig.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var getGameConfig = /** @class */ (function (_super) {
    __extends(getGameConfig, _super);
    function getGameConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    getGameConfig.prototype.onLoad = function () {
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
                STEP: 84,
                START_POS: cc.v2(-126, 126),
            }
        };
    };
    getGameConfig = __decorate([
        ccclass('getGameConfig')
    ], getGameConfig);
    return getGameConfig;
}(cc.Component));
exports.default = getGameConfig;

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
        //# sourceMappingURL=getGameConfig.js.map
        
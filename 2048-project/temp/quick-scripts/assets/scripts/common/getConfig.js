(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/common/getConfig.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8ea7d3IKkhKlYqqOOukICmK', 'getConfig', __filename);
// scripts/common/getConfig.js

"use strict";

cc.Class({
    extends: cc.Component,

    onLoad: function onLoad() {
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
            }

        };
    }
});

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
        //# sourceMappingURL=getConfig.js.map
        
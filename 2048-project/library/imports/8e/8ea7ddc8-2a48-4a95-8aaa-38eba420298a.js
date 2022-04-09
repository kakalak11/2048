"use strict";
cc._RF.push(module, '8ea7d3IKkhKlYqqOOukICmK', 'getConfig');
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
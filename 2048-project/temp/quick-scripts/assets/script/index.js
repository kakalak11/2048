(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/index.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '32419cbowRGgaeDalQ4zUq7', 'index', __filename);
// script/index.js

"use strict";

function gameplay(array, reverse) {
    if (reverse) array = array.reverse();
    console.log(array);
    slide(array);
    console.log(array);
    combine(array);
    console.log(array);
    slide(array);
    console.log(array);

    function slide(array) {
        for (var i = 0; i < array.length; i++) {
            if (!array[i]) continue;
            if (array[i + 1] === undefined) break;
            if (!array[i + 1]) {
                array[i + 1] = array[i];
                array[i] = 0;
            }
        }
    }

    function combine(array) {
        for (var i = 0; i < array.length; i++) {
            if (!array[i]) continue;
            if (array[i + 1] === undefined) break;
            if (array[i + 1] === array[i]) {
                array[i + 1] *= 2;
                array[i] = 0;
            }
        }
    }
    if (reverse) return array.reverse();
    return array;
}

var array = [2, 2, 0, 0];

// console.log(gameplay([0, 0, 2, 2]));

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
        //# sourceMappingURL=index.js.map
        
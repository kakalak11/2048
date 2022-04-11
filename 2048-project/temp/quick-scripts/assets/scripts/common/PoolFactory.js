(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/common/PoolFactory.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0d6cfky0/xOUKekbI9CUvuf', 'PoolFactory', __filename);
// scripts/common/PoolFactory.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PoolFactoryComponent = /** @class */ (function () {
    function PoolFactoryComponent() {
        this.prefabName = '';
        this.prefab = null;
        this.initialCount = 5;
    }
    __decorate([
        property({ displayName: 'Prefab Name', visible: true })
    ], PoolFactoryComponent.prototype, "prefabName", void 0);
    __decorate([
        property({ type: cc.Prefab, displayName: 'Prefab', visible: true })
    ], PoolFactoryComponent.prototype, "prefab", void 0);
    __decorate([
        property({ displayName: 'Initial Count', visible: true })
    ], PoolFactoryComponent.prototype, "initialCount", void 0);
    PoolFactoryComponent = __decorate([
        ccclass('PoolFactoryComponent')
    ], PoolFactoryComponent);
    return PoolFactoryComponent;
}());
;
var PoolFactory = /** @class */ (function (_super) {
    __extends(PoolFactory, _super);
    function PoolFactory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.poolPrefabList = [];
        _this.pools = null;
        return _this;
    }
    PoolFactory.prototype.onLoad = function () {
        this.pools = [];
        for (var i = 0; i < this.poolPrefabList.length; i++) {
            var compName = this.poolPrefabList[i].prefabName;
            var aPool = new cc.NodePool(compName);
            for (var j = 0; j < this.poolPrefabList[i].initialCount; j++) {
                var obj = cc.instantiate(this.poolPrefabList[i].prefab);
                obj.name = compName;
                obj.active = false;
                aPool.put(obj);
            }
            var poolObject = {
                prefabName: this.poolPrefabList[i].prefabName,
                objectPrefab: this.poolPrefabList[i].prefab,
                pool: aPool,
            };
            this.pools[i] = poolObject;
        }
        this.node.poolFactory = this;
    };
    ;
    PoolFactory.prototype.getObject = function (_prefabName) {
        var obj = null;
        for (var i = 0; i < this.pools.length; i++) {
            var _a = this.pools[i], prefabName = _a.prefabName, prefab = _a.prefab, pool = _a.pool;
            if (prefabName == _prefabName) {
                if (pool.size() > 0) {
                    obj = pool.get();
                }
                else {
                    obj = cc.instantiate(prefab);
                    obj.name = prefabName;
                    obj.active = false;
                }
                break;
            }
        }
        return obj;
    };
    ;
    PoolFactory.prototype.removeObject = function (node) {
        var name = node.name;
        for (var i = 0; i < this.pools.length; i++) {
            var _a = this.pools[i], prefabName = _a.prefabName, pool = _a.pool;
            if (name == prefabName) {
                node.active = false;
                pool.put(node);
                break;
            }
        }
    };
    ;
    PoolFactory.prototype.onDestroy = function () {
        for (var i = 0; i < this.pools.length; i++) {
            var pool = this.pools[i].pool;
            if (pool) {
                pool.clear();
            }
            this.poolPrefabList[i].prefab = null;
        }
        this.pools = [];
        this.pools = null;
        this.poolPrefabList = [];
        this.poolPrefabList = null;
        this.node.poolFactory = null;
    };
    ;
    __decorate([
        property({ type: PoolFactoryComponent })
    ], PoolFactory.prototype, "poolPrefabList", void 0);
    PoolFactory = __decorate([
        ccclass
    ], PoolFactory);
    return PoolFactory;
}(cc.Component));
exports.default = PoolFactory;

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
        //# sourceMappingURL=PoolFactory.js.map
        
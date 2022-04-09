const { ccclass, property } = cc._decorator;

@ccclass('PoolFactoryComponent')
class PoolFactoryComponent {
    @property({ displayName: 'Prefab Name', visible: true })
    prefabName: string = '';

    @property({ type: cc.Prefab, displayName: 'Prefab', visible: true })
    prefab: cc.Prefab = null;

    @property({ displayName: 'Initial Count', visible: true })
    initialCount: number = 5;
    objectPrefab: any = null;
}

interface PoolObject {
    prefabName: string,
    objectPrefab: cc.Prefab,
    pool: cc.NodePool,
};

@ccclass
export default class PoolFactory extends cc.Component {

    @property({ type: PoolFactoryComponent })
    poolPrefabList: PoolFactoryComponent[] = [];

    pools: PoolObject[] = null;
    
    onLoad() {
        this.pools = [];
        for (let i = 0; i < this.poolPrefabList.length; i++) {
            let compName = this.poolPrefabList[i].prefabName;
            const aPool = new cc.NodePool(compName);

            for (let j = 0; j < this.poolPrefabList[i].initialCount; j++) {
                let obj = cc.instantiate(this.poolPrefabList[i].objectPrefab);
                obj.name = compName;
                obj.active = false;
                aPool.put(obj);
            }
            const poolObject: PoolObject = {
                prefabName: this.poolPrefabList[i].prefabName,
                objectPrefab: this.poolPrefabList[i].objectPrefab,
                pool: aPool,
            };
            this.pools[i] = poolObject;
        }
        this.node.poolFactory = this;
    };

    getObject(_prefabName): cc.Node {
        let obj: cc.Node = null;
        for (let i = 0; i < this.pools.length; i++) {
            const { prefabName, objectPrefab, pool } = this.pools[i];
            if (prefabName == _prefabName) {
                if (pool.size() > 0) {
                    obj = pool.get();
                } else {
                    obj = cc.instantiate(objectPrefab);
                    obj.name = prefabName;
                    obj.active = false;
                }
                break;
            }
        }
        return obj;
    };

    removeObject(node): void {
        let name = node.name;
        for (let i = 0; i < this.pools.length; i++) {
            const { prefabName, pool } = this.pools[i];
            if (name == prefabName) {
                node.active = false;
                pool.put(node);
                break;
            }
        }
    };

    onDestroy() {
        for (let i = 0; i < this.pools.length; i++) {
            const { pool } = this.pools[i];
            if (pool) {
                pool.clear();
            }
            this.poolPrefabList[i].objectPrefab = null;
        }
        this.pools = [];
        this.pools = null;
        this.poolPrefabList = [];
        this.poolPrefabList = null;
        this.node.poolFactory = null;
    };
}

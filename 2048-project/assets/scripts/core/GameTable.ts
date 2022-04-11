import PoolFactory from "../common/PoolFactory";

const { ccclass, property } = cc._decorator;

@ccclass('GameTable')
export default class GameTable extends cc.Component {
    @property(cc.Node)
    tilesHolder: cc.Node = null;

    @property(String)
    prefabName: string = 'TILE_PREFAB';

    poolFactory: PoolFactory;
    config: any;

    protected onLoad(): void {
        this.node.on('INIT', this.init, this);
        this.node.on('TABLE_SETUP', this.tableSetup, this);
    };

    init(poolFactory, config) {
        this.poolFactory = poolFactory;
        this.config = config;
    };

    tableSetup() {
        // const { TABLE_FORMAT } = this.config;

        this.randomGenerateTile();
        this.randomGenerateTile();
    };

    randomGenerateTile() {
        const { TABLE_CONFIG } = this.config;
        const { STEP, FORMAT } = TABLE_CONFIG;
        const randomX = Math.floor(Math.random() * FORMAT.length) * STEP;
        const randomY = Math.floor(Math.random() * FORMAT[0]) * STEP;

        const object = this.poolFactory.getObject(this.prefabName);
        object.parent = this.tilesHolder;
        object.active = true;
        object.setPosition(randomX, randomY);
    };
}

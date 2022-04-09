import PoolFactory from "../common/PoolFactory";

const { ccclass, property } = cc._decorator;

@ccclass('GameTable')
export default class GameTable extends cc.Component {
    @property(cc.Node)
    tilesHolder: cc.Node = null;

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
        const { TABLE_FORMAT } = this.config;

        
    };
}

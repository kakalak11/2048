import PoolFactory from "../common/PoolFactory";

const { ccclass, property } = cc._decorator;

@ccclass('GameManager')
export default class GameManager extends cc.Component {

    @property(cc.Node)
    gameTable: cc.Node = null;

    poolFactory: PoolFactory;
    config: any;

    onLoad() {
        this.node.on('INIT', this.init, this);
        this.node.on('GAME_SETUP', this.gameSetup, this)
    }

    protected init(poolFactory, config): void {
        this.poolFactory = poolFactory;
        this.config = config;

        this.gameTable.emit('INIT', poolFactory, config);
        this.gameSetup();
    }

    gameSetup() {
        this.gameTable.emit('TABLE_SETUP')
    }
}

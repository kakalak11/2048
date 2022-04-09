import PoolFactory from "../common/PoolFactory";

const {ccclass, property} = cc._decorator;

@ccclass('GameDirector')
export default class GameDirector extends cc.Component {

    @property(PoolFactory)
    poolFactory: PoolFactory = null;

    @property(cc.Node)
    gameManager: cc.Node = null;

    onLoad() {

    }

    start() {
        this.gameManager.emit('INIT', this.poolFactory);
    }
}

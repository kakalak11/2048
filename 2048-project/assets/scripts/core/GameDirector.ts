import PoolFactory from "../common/PoolFactory";
import getGameConfig from "../common/getGameConfig";

const { ccclass, property } = cc._decorator;

@ccclass('GameDirector')
export default class GameDirector extends cc.Component {

    @property(PoolFactory)
    poolFactory: PoolFactory = null;

    @property(cc.Node)
    gameManager: cc.Node = null;

    onLoad() {
        console.log(getGameConfig);
    }

    start() {
        this.gameManager.emit('INIT', this.poolFactory, (this.node as any).config);
    }
}

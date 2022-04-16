const { ccclass, property } = cc._decorator;

@ccclass('TileController')
export default class TileController extends cc.Component {

    @property(cc.Integer)
    timeMove: number = 1;

    @property(cc.Integer)
    distanceMove: number = 100;

    directionList: cc.Vec2[] = [];
    isInvokable: boolean = true;
    isIdle: boolean = null;

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.schedule(this.executeNextMove, 1);
    };

    onKeyDown(event) {

    };

    onKeyUp(event) {
        let direction: cc.Vec2 = null;
        switch (event.keyCode) {
            case cc.macro.KEY.d:
                direction = cc.Vec2.RIGHT;
                break;
            case cc.macro.KEY.a:
                direction = cc.Vec2.RIGHT.mul(-1);
                break;
            case cc.macro.KEY.w:
                direction = cc.Vec2.UP;
                break;
            case cc.macro.KEY.s:
                direction = cc.Vec2.UP.mul(-1);
                break;
        };
    };

    executeNextMove(direction?) {
        if (direction) {
            this.directionList.push(direction)
            return;
        }
        if (!this.directionList || this.directionList.length === 0) {
            this.isIdle = true;
            return;
        }
        const directionCommand = this.directionList.shift();
        this.moveTiles(directionCommand);
    }

    moveTiles(direction: cc.Vec2) {
        this.node.children.forEach(tile => {
            cc.tween(tile)
                .by(this.timeMove, direction.mul(this.distanceMove))
                .start();
        }, this);

    }
}

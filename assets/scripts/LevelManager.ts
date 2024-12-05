import { _decorator, Animation, bezier, BlockInputEvents, Component, ITweenOption, Node, tween, UIOpacity, v2, Vec2, Vec3 } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

function tweenBezier2DTo(target: Node, duration: number, c1: Vec2, c2: Vec2, to: Vec2, opts?: ITweenOption) {
    if (target['bezierX']) target['bezierX'].stop();
    if (target['bezierY']) target['bezierY'].stop();

    let c0x = c1.x, c0y = c1.y,
        c1x = c2.x, c1y = c2.y;
    const _targetX = { value: target.getPosition().x };
    const _targetY = { value: target.getPosition().y };
    const aOpts: ITweenOption = opts || Object.create(null);
    aOpts.progress = function (startX: number, endX: number, currentX: number, t: number) {
        currentX = bezier(startX, c0x, c1x, endX, t);
        return currentX;
    }
    aOpts.onUpdate = function () {
        if (target && target.position) {
            target.setPosition(new Vec3(_targetX.value, target.position.y, target.position.z));
        }
    }
    const bOpts: ITweenOption = opts || Object.create(null);
    bOpts.progress = function (startY: number, endY: number, currentY: number, t: number) {
        currentY = bezier(startY, c0y, c1y, endY, t);
        return currentY;
    }
    bOpts.onUpdate = function () {
        if (target && target.position) {
            target.setPosition(new Vec3(target.position.x, _targetY.value, target.position.z));
        }
    }
    target['bezierX'] = tween(_targetX)
        .to(duration, { value: to.x }, aOpts)
        .call(() => {
            target['bezierX'] = null;
        })
        .start();
    target['bezierY'] = tween(_targetY)
        .to(duration, { value: to.y }, bOpts)
        .call(() => {
            target['bezierY'] = null;
        })
        .start();
}

@ccclass('LevelManager')
export class LevelManager extends Component {

    @property(Node) gradient: Node;
    @property(Node) content: Node;
    @property(Node) levelUI: Node;

    protected start(): void {
        this.node.on("UPDATE_LEVEL", this.updateLevel, this);
        this.node.on("RESET_LEVEL", this.resetLevel, this);
        // this.showAnimationLevelUp(this.levelUI.children[2]);
    }

    resetLevel() {
        this.levelUI.children.forEach((node) => {
            node.active = false;
        });
    }

    updateLevel(levelIndex) {
        levelIndex = Math.min(levelIndex, this.levelUI.children.length - 1);

        if (!this.levelUI.children[levelIndex].active) {
            return this.showAnimationLevelUp(this.levelUI.children[levelIndex]);
        }
        this.levelUI.children.forEach((node, index) => {
            if (index > levelIndex) {
                node.active = false;
            } else {
                node.active = true;
            }
        });

    }

    showAnimationLevelUp(levelTile) {
        GameManager.instance.isShowingPopup = true;
        this.gradient.getComponent(BlockInputEvents).enabled = true;
        this.gradient.getComponent(UIOpacity).opacity = 0;
        this.content.getComponent(UIOpacity).opacity = 0;
        levelTile.active = true;
        levelTile.getComponent(UIOpacity).opacity = 0;
        const originalPos = levelTile.getPosition();
        levelTile.setPosition(v2(0, 0));
        const point1 = v2(originalPos.x / 3 * 1, 75);
        const point2 = v2(originalPos.x / 3 * 2, 75);

        const highlightLevelTween = tween(levelTile.getComponent(UIOpacity))
            .to(0.5, { opacity: 255 })
            .call(() => {
                levelTile.getComponent(Animation).play("levelUpAnim");
            })
            .delay(1.2)
            .call(() => {
                levelTile.getComponent(Animation).play("levelUpAnim");
            })
            .delay(1)
            .call(() => {
                tweenBezier2DTo(levelTile, 0.3, point1, point2, originalPos);
            })
            .delay(0.3)
            .call(() => {
                levelTile.getComponent(Animation).play("landingAnim");
            });

        tween(this.gradient.getComponent(UIOpacity))
            .to(0.5, { opacity: 255 })
            .call(() => {
                tween(this.content.getComponent(UIOpacity))
                    .to(0.5, { opacity: 255 })
                    .start();
            })
            .delay(0.5)
            .call(() => {
                highlightLevelTween.start();
            })
            .delay(2.7)
            .call(() => {
                tween(this.content.getComponent(UIOpacity))
                    .to(0.5, { opacity: 0 })
                    .start();
            })
            .to(0.5, { opacity: 0 })
            .call(() => {
                this.gradient.getComponent(BlockInputEvents).enabled = false;
                GameManager.instance.isShowingPopup = false;
            })
            .start()
    }

}


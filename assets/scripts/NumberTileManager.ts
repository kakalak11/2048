import { _decorator, Component, Node, Sprite, SpriteFrame, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NumberTileManager')
export class NumberTileManager extends Component {

    @property(SpriteFrame) numberSpriteFrames: SpriteFrame[] = [];

    updateValue(value) {
        const spriteIndex = Math.log2(value) - 1;
        this.node.getComponent(Sprite).spriteFrame = this.numberSpriteFrames[spriteIndex];
        this.node.getComponent(Animation).play();
    }

}


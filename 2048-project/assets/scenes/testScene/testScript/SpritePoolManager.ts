const { ccclass, property } = cc._decorator;

@ccclass('SpritePoolManager')
export default class SpritePoolManager extends cc.Component {



    onLoad() {
        resources.load(`RavenmoreIconPack.02.2014/512/${assetName}`, cc.SpriteFrame, (err, spriteFrame) => {
            this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    }
}

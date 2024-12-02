import { _decorator, Component, Label, Node, Sprite, tween, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LosePopup')
export class LosePopup extends Component {

    @property(Node) fadeInList: Node[] = [];
    @property(Label) loseScore: Label;

    start() {
        this.node.on("SHOW_LOSE_POPUP", this.showLosePopup, this);
    }

    showLosePopup(score = 0) {
        this.node.active = true;
        this.node.getComponent(UIOpacity).opacity = 0;
        tween(this.node.getComponent(UIOpacity))
            .to(0.5, { opacity: 255 })
            .start();

        let delay = 0;
        this.fadeInList.forEach(node => {
            delay += 0.5;

            const opacityComp = node.getComponent(UIOpacity) || node.addComponent(UIOpacity);
            if (opacityComp) {
                opacityComp.opacity = 0;

                tween(opacityComp)
                    .delay(delay)
                    .to(0.3, { opacity: 255 })
                    .start();
            }
        });

        this.loseScore.string = score.toString();
    }

}


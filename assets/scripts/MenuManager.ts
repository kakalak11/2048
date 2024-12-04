import { _decorator, BlockInputEvents, Button, Component, Label, Node, tween, UIOpacity } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('MenuManager')
export class MenuManager extends Component {

    @property(Node) playButton: Node;

    start() {
        this.node.on("SHOW_POPUP", this.showPopup, this);
        this.node.on("HIDE_POPUP", this.hidePopup, this);

        this.showPopup(true);
    }

    hidePopup() {
        this.node.active = true;
        const opacityComp = this.node.getComponent(UIOpacity);
        const buttonComps = this.node.getComponentsInChildren(Button);

        if (opacityComp) {
            tween(opacityComp)
                .to(0.5, { opacity: 0 })
                .call(() => {
                    this.node.getComponentInChildren(BlockInputEvents).enabled = false;
                })
                .start()
        }

        if (buttonComps) {
            buttonComps.forEach(button => button.interactable = false);
        }
    }

    showPopup(isStartGame) {
        this.node.active = true;
        const opacityComp = this.node.getComponent(UIOpacity);
        const buttonComps = this.node.getComponentsInChildren(Button);
        this.node.getComponentInChildren(BlockInputEvents).enabled = true;

        if (GameManager.instance && GameManager.instance.isPlaying) {
            this.playButton.getComponentInChildren(Label).string = "Resume";
        } else {
            this.playButton.getComponentInChildren(Label).string = "Play";
        }
        if (isStartGame) {
            if (opacityComp) opacityComp.opacity = 255;
            if (buttonComps) {
                buttonComps.forEach(button => button.interactable = true);
            }
        } else {
            if (opacityComp) {
                tween(opacityComp)
                    .to(0.5, { opacity: 255 })
                    .call(() => {
                        if (buttonComps) {
                            buttonComps.forEach(button => button.interactable = true);
                        }
                    })
                    .start()
            }
        }
    }
}


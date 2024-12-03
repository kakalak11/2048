import { _decorator, BlockInputEvents, Component, instantiate, Label, Node, Prefab, sys, tween, UIOpacity } from 'cc';
import { STORAGE_KEY } from './HighscoreStorage';
const { ccclass, property } = _decorator;

@ccclass('HighscorePopup')
export class HighscorePopup extends Component {

    @property(Node) dataTable: Node;
    @property(Prefab) dataCell: Prefab;

    start() {
        this.node.on("SHOW_POPUP", this.showPopup, this);
        this.node.on("HIDE_POPUP", this.hidePopup, this);
    }

    showPopup() {
        let highscoreData = JSON.parse(sys.localStorage.getItem(STORAGE_KEY)) || [];
        // let highscoreData = [{ name: "kakalak", score: 100000 }, { name: "hihi", score: 5000 }, { name: "haha", score: 20000 }];
        highscoreData.sort((a, b) => b.score - a.score);
        highscoreData = highscoreData.slice(0, 6);
        this.dataTable.removeAllChildren();
        highscoreData.forEach(data => {
            const dataCell = instantiate(this.dataCell);
            dataCell.setParent(this.dataTable);

            dataCell.getComponentsInChildren(Label).forEach((label, index) => {
                if (index == 0) {
                    label.string = data.name;
                } else {
                    label.string = data.score as any;
                }
            });
        })

        this.node.getComponent(UIOpacity).opacity = 0;
        this.node.getComponentInChildren(BlockInputEvents).enabled = true;
        tween(this.node.getComponent(UIOpacity))
            .to(0.5, { opacity: 255 })
            .start();
    }

    hidePopup() {
        tween(this.node.getComponent(UIOpacity))
            .to(0.5, { opacity: 0 })
            .call(() => {
                this.node.getComponentInChildren(BlockInputEvents).enabled = false;
            })
            .start();
    }

}


import { _decorator, Component, Node, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelManager')
export class LevelManager extends Component {

    protected start(): void {
        this.node.on("UPDATE_LEVEL", this.updateLevel, this);
    }

    updateLevel(levelIndex) {
        this.node.children.forEach((node, index) => {
            if (index > levelIndex) {
                node.active = false;
            } else {
                node.active = true;
            }
        })
    }

}


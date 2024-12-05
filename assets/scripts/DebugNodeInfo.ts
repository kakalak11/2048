import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DebugNodeInfo')
export class DebugNodeInfo extends Component {

    @property(Node) targetNode: Node;

    _label: Label;

    start() {
        this._label = this.node.getComponent(Label);
    }

    update(dt: number): void {
        if (!this.targetNode) {
            this._label.string = "No target !";
            return;
        }

        if (this._label) {
            this._label.string = `Node position:\nx: ${Math.floor(this.targetNode.getPosition().x)}, y: ${Math.floor(this.targetNode.getPosition().y)}`
        }
    }

}


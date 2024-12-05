import { _decorator, Component, EventMouse, Node, UITransform, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DragAndDrop')
export class DragAndDrop extends Component {

    @property(Node) target: Node;
    _isDragging: boolean;

    protected start(): void {
        this.node.on(Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.node.on(Node.EventType.MOUSE_UP, this.onMouseUp, this);
        this.node.on(Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
    }

    onMouseDown(event: EventMouse) {
        this._isDragging = true;
        this.setPositionTarget(event.getLocation());
    }

    onMouseMove(event: EventMouse) {
        if (this._isDragging) {
            this.setPositionTarget(event.getLocation());
        }
    }

    onMouseUp(event: EventMouse) {
        this._isDragging = false;
    }

    setPositionTarget(worldPos) {
        const mouseWorldPos = v3(worldPos.x, worldPos.y, 0);
        this.target.setWorldPosition(mouseWorldPos);
    }

}


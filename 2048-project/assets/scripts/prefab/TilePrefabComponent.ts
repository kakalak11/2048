const { ccclass, property } = cc._decorator;

@ccclass
export default class TilePrefabComponent extends cc.Component {
    @property(cc.Sprite)
    sprite: cc.Sprite = null;
    @property(cc.Label)
    label: cc.Label = null;

    _value: string = null;
    _color: cc.Color = null;

    onLoad() {
        this.node.on('INIT', this.init, this);
    }

    private init({ value, color }): void {
        this._value = value;
        this._color = color;

        this.label.string = this._value;
        this.sprite.node.color = this._color;
    }
}

const {ccclass, property} = cc._decorator;

@ccclass('GameControllerComponent')
export default class GameControllerComponent extends cc.Component {

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event) {
        const keyCode = event.keyCode;

        switch (keyCode) {
            case cc.macro.KEY.left || cc.macro.KEY.a:
                console.log('go left');
                break;
        }
    }
    
    onKeyUp() {
        
    }
}

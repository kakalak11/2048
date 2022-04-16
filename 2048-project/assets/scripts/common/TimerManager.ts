const { ccclass, property } = cc._decorator;

const MAX_FPS = 60;
const FRAME_TIME = 0.0167;

interface Time {
    timeString: string,
    minute: number,
    second: number,
    milisecond: number,
};

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    minuteLabel: cc.Label = null;

    @property(cc.Label)
    secondLabel: cc.Label = null;

    @property(cc.Label)
    milisecondLabel: cc.Label = null;

    @property(cc.Button)
    startButton: cc.Button = null;

    @property(cc.Button)
    resetButton: cc.Button = null;

    minute: number = 0;
    second: number = 0;
    miliSecond: number = 0;
    private _temp: number = 0;
    isStart: boolean = null;
    isPause: boolean = null;
    timeList: Time[] = [];

    onLoad() {
        this.minute = 0;
        this.second = 0;
        this.miliSecond = 0;
        this._temp = 0;
    };

    onClickStart() {
        if (!this.isStart || this.isPause) {
            this.isStart = true;
            this.isPause = false;
        }
    };

    onClickPause() {
        if (this.isStart && !this.isPause) {
            this.isPause = true;
        } else {
            this.onClickStart();
        }
    };

    onClickSave() {
        const timeObject: Time = {
            timeString: `${this.minuteLabel.string}:${this.secondLabel.string}:${this.milisecondLabel.string}`,
            minute: this.minute,
            second: this.second,
            milisecond: this.miliSecond,
        };
        this.timeList.push(timeObject);
    };

    onClickReset() {
        this.minute = 0;
        this.second = 0;
        this.miliSecond = 0;
        this._temp = 0;
        this.isStart = null;

        this.minuteLabel.string = '00';
        this.secondLabel.string = '00';
        this.milisecondLabel.string = '00';
    };

    protected update(dt: number): void {
        if (!this.isStart || this.isPause) return;
        this.calculateTime(dt);
        this.minuteLabel.string = this.minute.toString().length > 1 ? this.minute.toString() : '0' + this.minute.toString();
        this.secondLabel.string = this.second.toString().length > 1 ? this.second.toString() : '0' + this.second.toString();
        this.milisecondLabel.string = this.formatTime(this.miliSecond).length > 1 ? this.formatTime(this.miliSecond) : '0' + this.formatTime(this.miliSecond);
    };

    calculateTime(deltaTime) {
        this._temp += FRAME_TIME;
        this.miliSecond += FRAME_TIME;

        // reset the temp value to 0 and increment second by 1
        if (this._temp >= 1) {
            this._temp = 0;
            this.miliSecond = 0;
            this.second++;
        }

        if (this.second >= 60) {
            this.second = 0;
            this.minute++;
        }
    };

    formatTime(value) {
        let _value = value;
        const valueString = value.toString();
        if (valueString.length > 2) {
            const dotIndex = valueString.indexOf('.') + 1;
            _value = valueString.substring(dotIndex, dotIndex + 2);
        }
        return _value;
    };
}

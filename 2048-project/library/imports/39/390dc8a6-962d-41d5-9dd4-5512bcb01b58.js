"use strict";
cc._RF.push(module, '390dcimli1B1Z3UVRK8sBtY', 'TimerManager');
// scenes/testScene/testScript/TimerManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MAX_FPS = 60;
var FRAME_TIME = 0.0167;
;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.minuteLabel = null;
        _this.secondLabel = null;
        _this.milisecondLabel = null;
        _this.startButton = null;
        _this.resetButton = null;
        _this.minute = 0;
        _this.second = 0;
        _this.miliSecond = 0;
        _this._temp = 0;
        _this.isStart = null;
        _this.isPause = null;
        _this.timeList = [];
        return _this;
    }
    NewClass.prototype.onLoad = function () {
        this.minute = 0;
        this.second = 0;
        this.miliSecond = 0;
        this._temp = 0;
    };
    ;
    NewClass.prototype.onClickStart = function () {
        if (!this.isStart || this.isPause) {
            this.isStart = true;
            this.isPause = false;
        }
    };
    ;
    NewClass.prototype.onClickPause = function () {
        if (this.isStart && !this.isPause) {
            this.isPause = true;
        }
        else {
            this.onClickStart();
        }
    };
    ;
    NewClass.prototype.onClickSave = function () {
        var timeObject = {
            timeString: this.minuteLabel.string + ":" + this.secondLabel.string + ":" + this.milisecondLabel.string,
            minute: this.minute,
            second: this.second,
            milisecond: this.miliSecond,
        };
        this.timeList.push(timeObject);
    };
    ;
    NewClass.prototype.onClickReset = function () {
        this.minute = 0;
        this.second = 0;
        this.miliSecond = 0;
        this._temp = 0;
        this.isStart = null;
        this.minuteLabel.string = '00';
        this.secondLabel.string = '00';
        this.milisecondLabel.string = '00';
    };
    ;
    NewClass.prototype.update = function (dt) {
        if (!this.isStart || this.isPause)
            return;
        this.calculateTime(dt);
        this.minuteLabel.string = this.minute.toString().length > 1 ? this.minute.toString() : '0' + this.minute.toString();
        this.secondLabel.string = this.second.toString().length > 1 ? this.second.toString() : '0' + this.second.toString();
        this.milisecondLabel.string = this.formatTime(this.miliSecond).length > 1 ? this.formatTime(this.miliSecond) : '0' + this.formatTime(this.miliSecond);
    };
    ;
    NewClass.prototype.calculateTime = function (deltaTime) {
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
    ;
    NewClass.prototype.formatTime = function (value) {
        var _value = value;
        var valueString = value.toString();
        if (valueString.length > 2) {
            var dotIndex = valueString.indexOf('.') + 1;
            _value = valueString.substring(dotIndex, dotIndex + 2);
        }
        return _value;
    };
    ;
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "minuteLabel", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "secondLabel", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "milisecondLabel", void 0);
    __decorate([
        property(cc.Button)
    ], NewClass.prototype, "startButton", void 0);
    __decorate([
        property(cc.Button)
    ], NewClass.prototype, "resetButton", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();
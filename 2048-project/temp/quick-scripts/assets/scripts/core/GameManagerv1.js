(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/core/GameManagerv1.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fe645UIuPVNPaHu3pSB0/bM', 'GameManagerv1', __filename);
// scripts/core/GameManagerv1.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Emitter = require('mEmitter');
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.score = null;
        _this.bestScoreNumber = null;
        _this.gameTable = null;
        _this.leaderBoard = null;
        _this.winBoard = null;
        _this.turnNumber = null;
        _this._playing = null;
        return _this;
    }
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "score", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "bestScoreNumber", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "gameTable", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "leaderBoard", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "winBoard", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "turnNumber", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;
// cc.Class({
//     extends: cc.Component,
//     properties: {
//         score: cc.Node,
//         bestScoreNumber: cc.Label,
//         gameBoard: cc.Node,
//         leaderBoard: cc.Node,
//         winBoard: cc.Node,
//         loseBoard: cc.Node,
//         turnNumber: cc.Label,
//         _playing: false,
//     },
//     // LIFE-CYCLE CALLBACKS:
//     onClickPlayButton: function () {
//         Emitter.instance.emit('showWindow');
//         if (!this._playing) {
//             Emitter.instance.emit('start');
//         }
//         Emitter.instance.emit('canMove');
//         Emitter.instance.emit('playing');
//     },
//     onClickMenuButton: function () {
//         Emitter.instance.emit('hideWindow');
//         Emitter.instance.emit('canMove', false);
//     },
//     _scoreUpdate: function (data) {
//         this.gameMatrix = this.gameBoard.getComponent('gameBoard')._tilesMatrix.flat();
//         if (!this.gameMatrix) {
//             this.score.getComponent('cc.Label').string = 0;
//             return;
//         }
//         this.scoreNumber = 0;
//         this.gameMatrix.forEach(element => this.scoreNumber += element.getComponent('tilesScript').number);
//         this.score.getComponent('cc.Label').string = this.scoreNumber;
//         this.turnNumber.string = `Turn: ${data}`;
//         return;
//     },
//     _win: function () {
//         this.winBoard.emit('winBoard');
//         Emitter.instance.emit('sound', 'gameWin');
//         Emitter.instance.emit('notPlaying');
//     },
//     _lose: function () {
//         this.loseBoard.emit('loseBoard');
//         Emitter.instance.emit('sound', 'gameOver')
//         Emitter.instance.emit('notPlaying');
//     },
//     onClickContinueButton: function () {
//         this.gameBoard.getComponent('gameBoard')._reset();
//         if (this._playing) Emitter.instance.emit('notPlaying');
//         Emitter.instance.emit('start');
//         Emitter.instance.emit('canMove');
//         Emitter.instance.emit('playing');
//         return;
//     },
//     onClickUndo() {
//         Emitter.instance.emit('undo');
//         Emitter.instance.emit('sound', 'undo');
//     },
//     _show: function () {
//         this.node.runAction(cc.moveTo(0.5, 0, 0).easing(cc.easeExponentialInOut(0.5)));
//     },
//     _hide: function () {
//         this.node.runAction(cc.moveTo(0.5, -500, 0).easing(cc.easeExponentialInOut(0.5)));
//     },
//     onLoad() {
//         Emitter.instance.registerEvent('updateScore', this._scoreUpdate.bind(this));
//         Emitter.instance.registerEvent('lose', this._lose.bind(this));
//         Emitter.instance.registerEvent('win', this._win.bind(this));
//         this.leaderBoardScript = this.leaderBoard.getComponent('leaderBoardScript');
//         this.leaderBoardScript.active = false;
//         this.bestScoreNumber.string = this.leaderBoardScript._bestScore;
//         Emitter.instance.registerEvent('showWindow', this._show.bind(this));
//         Emitter.instance.registerEvent('hideWindow', this._hide.bind(this));
//         Emitter.instance.registerEvent('playing', () => this._playing = true);
//         Emitter.instance.registerEvent('notPlaying', () => this._playing = false);
//         console.warn(cc.sys.isBrowser);
//     },
//     start() {
//     },
//     // update (dt) {},
// });

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GameManagerv1.js.map
        
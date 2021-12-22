// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        score: cc.Node,
        bestScoreNumber: cc.Label,
        gameBoard: cc.Node,
        leaderBoard: cc.Node,
        winBoard: cc.Node,
        loseBoard: cc.Node,
        _playing: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onClickPlayButton: function () {
        Emitter.instance.emit('showWindow');
        if (!this._playing) {
            Emitter.instance.emit('start');
        }
        Emitter.instance.emit('canMove');
        Emitter.instance.emit('playing');
    },

    onClickMenuButton: function () {
        Emitter.instance.emit('hideWindow');
    },

    _scoreUpdate: function () {
        this.gameMatrix = this.gameBoard.getComponent('gameBoard')._tilesMatrix.flat();
        if (!this.gameMatrix) {
            this.score.getComponent('cc.Label').string = 0;
            return;
        }
        this.scoreNumber = 0;
        this.gameMatrix.forEach(element => this.scoreNumber += element.getComponent('tilesScript').number);
        this.score.getComponent('cc.Label').string = this.scoreNumber;
        return;
    },

    _win: function () {
        this.winBoard.emit('winBoard');
        Emitter.instance.emit('notPlaying');
    },

    _lose: function () {
        this.loseBoard.emit('loseBoard');
        Emitter.instance.emit('notPlaying');
    },

    onClickReturnButton: function () {
        this.gameBoard.getComponent('gameBoard')._reset();
        if (this._playing) Emitter.instance.emit('notPlaying');
        Emitter.instance.emit('start');
        Emitter.instance.emit('canMove');
        Emitter.instance.emit('playing');
        return;
    },

    _show: function () {
        this.node.runAction(cc.moveTo(0.5, 0, 0).easing(cc.easeExponentialInOut(0.5)));
    },

    _hide: function () {
        this.node.runAction(cc.moveTo(0.5, -500, 0).easing(cc.easeExponentialInOut(0.5)));
    },

    onLoad() {
        this.node.on('updateScore', this._scoreUpdate, this);
        this.node.on('win', this._win, this);
        this.node.on('lose', this._lose, this);
        this.leaderBoardScript = this.leaderBoard.getComponent('leaderBoardScript');
        this.leaderBoardScript.active = false;
        cc.log(this.leaderBoardScript._bestScore);
        this.bestScoreNumber.string = this.leaderBoardScript._bestScore;

        Emitter.instance.registerEvent('showWindow', this._show.bind(this));
        Emitter.instance.registerEvent('hideWindow', this._hide.bind(this));
        Emitter.instance.registerEvent('playing', () => this._playing = true);
        Emitter.instance.registerEvent('notPlaying', () => this._playing = false);

    },

    start() {

    },

    // update (dt) {},
});

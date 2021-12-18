// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        menuNode: cc.Node,
        score: cc.Node,
        gameBoard: cc.Node,
        _playing: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onClickPlayButton: function () {
        cc.log('gamestart', this.gameBoard);
        this.gameBoard.getComponent('gameBoard')._setupGrid(this._playing);
        this._playing = true;
    },

    _scoreUpdate: function () {
        this.gameMatrix = this.gameBoard.getComponent('gameBoard')._tilesMatrix.flat();
        this.scoreNumber = 0;
        this.gameMatrix.forEach(element => this.scoreNumber += element.getComponent('tilesScript').number);
        this.score.getComponent('cc.Label').string = this.scoreNumber;
    },

    _win: function () {

    },

    onLoad() {
        this.node.on('updateScore', this._scoreUpdate, this);
        this.node.on('win', this._win, this);
    },

    start() {

    },

    // update (dt) {},
});

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const Emitter = require('event');

cc.Class({
    extends: cc.Component,

    properties: {
        tilePrefab: cc.Prefab,
        winBoard: cc.Node,
        loseBoard: cc.Node,
        swipeSound: cc.AudioSource,
        _tilesMatrix: [],
        _moving: null,
        _time: 0.25 / 8,
        _check: true,
        _combined: false,
        _posistionChanged: null,
        _skip: false,
    },

    // LIFE-CYCLE CALLBACKS:

    _onKeyDown: function (event) {
        this.node.emit('checkWin');
        this.node.emit('checkLose');
        if (this._moving) return;
        this.swipeSound.play();
        this._moving = true;
        this._check = false;
        switch (event.keyCode) {
            case cc.macro.KEY.d:
                this._moveRow(true);
                this._combineRow(true);
                this.scheduleOnce(() => {
                    this._moveRow(true);
                    this._adjustPosition();
                    this._moving = false;
                }, this._time);
                break;
            case cc.macro.KEY.a:
                this._moveRow(false);
                this._combineRow(false);
                this.scheduleOnce(() => {
                    this._moveRow(false);
                    this._adjustPosition();
                    this._moving = false;
                }, this._time);
                break;
            case cc.macro.KEY.s:
                this._moveCollumn(true);
                this._combineCollumn(true);
                this.scheduleOnce(() => {
                    this._moveCollumn(true);
                    this._adjustPosition();
                    this._moving = false;
                }, this._time);
                break;
            case cc.macro.KEY.w:
                this._moveCollumn(false);
                this._combineCollumn(false);
                this.scheduleOnce(() => {
                    this._moveCollumn(false);
                    this._adjustPosition();
                    this._moving = false;
                }, this._time);
                break;
            case cc.macro.KEY.c:
                this.node.dispatchEvent(new cc.Event.EventCustom('lose', true));
                break;
            case cc.macro.KEY.space:
                console.clear();
                this._moving = false;
                break;
            default:
                this._moving = false;
                break;
        }
    },

    //Move logic

    _moveRow: function (directionRight) {
        this._tilesMatrix.forEach((element, rowIndex) => {
            let numbers = element.filter(element => element.active);
            let zeros = element.filter(element => !element.active);
            directionRight ? element = zeros.concat(numbers) : element = numbers.concat(zeros);
            for (let i = 0; i < 4; i++) this._tilesMatrix[rowIndex][i] = element.shift();
        });
        return;
    },

    _moveCollumn: function (directionDown, adjust) {
        for (let i = 0; i < 4; i++) {
            let collumn = [];
            for (let j = 0; j < 4; j++) collumn.push(this._tilesMatrix[j][i]);
            let numbers = collumn.filter(element => element.active);
            let zeros = collumn.filter(element => !element.active);
            directionDown ? collumn = zeros.concat(numbers) : collumn = numbers.concat(zeros);
            for (let j = 0; j < 4; j++) this._tilesMatrix[j][i] = collumn.shift();
        }
        return;
    },

    //Combine logic

    _combineRow: function (directionRight) {
        this._tilesMatrix.forEach((element, index) => {
            directionRight ? this.array = element.reverse() : this.array = element;
            this.array.forEach((element, index, array) => {
                if (this.skip) {
                    this.skip = false;
                    return;
                }
                this.nextElement = array[index + 1];
                this.elementScript = element.getComponent('tilesScript');
                if (this.nextElement === undefined) return;
                this.nextElementScript = this.nextElement.getComponent('tilesScript');
                if (this.elementScript.number === 0) return;
                if (this.elementScript.number === this.nextElementScript.number) {
                    this.skip = true;
                    this.elementScript.setNumber(this.elementScript.number *= 2);
                    element.runAction(cc.sequence(cc.scaleTo(this._time / 2, 1.25), cc.scaleTo(this._time / 2, 1)));
                    this.nextElementScript.moveCombine(element.getPosition(cc.v2()), this._time / 2);
                    this._combined = true;
                }
            });
            directionRight ? this.array.reverse() : null;
        });
        return;
    },

    _combineCollumn: function (directionDown) {
        for (let i = 0; i < 4; i++) {
            this.collumn = [];
            for (let j = 0; j < 4; j++) {
                this.collumn.push(this._tilesMatrix[j][i]);
            }
            directionDown ? this.collumn.reverse() : null;
            this.collumn.forEach((element, index, array) => {
                if (this.skip) {
                    this.skip = false;
                    return;
                }
                this.nextElement = array[index + 1];
                this.elementScript = element.getComponent('tilesScript');
                if (this.nextElement === undefined) return;
                this.nextElementScript = this.nextElement.getComponent('tilesScript');
                if (this.elementScript.number === 0) return;
                if (this.elementScript.number === this.nextElementScript.number) {
                    this.skip = true;
                    this.elementScript.setNumber(this.elementScript.number *= 2);
                    element.runAction(cc.sequence(cc.scaleTo(this._time / 2, 1.25), cc.scaleTo(this._time / 2, 1)));
                    this.nextElementScript.moveCombine(element.getPosition(cc.v2()), this._time / 2);
                    this._combined = true;
                }
            });
            directionDown ? this.collumn.reverse() : null;
        }
        return;
    },

    _adjustPosition: function () {
        this._tilesMatrix.forEach((element, rowIndex) => element.forEach((element, collumnIndex) => {
            if (element.active) {
                let lastPos = element.getPosition(cc.v2());
                this.action = cc.sequence(
                    cc.moveTo(this._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex),
                    cc.callFunc(() => {
                        let currentPos = element.getPosition(cc.v2());
                        if (Math.abs(Math.floor(lastPos.x - currentPos.x)) > 25 || Math.abs(Math.floor(lastPos.y - currentPos.y)) > 25) {
                            this._check = true;
                            cc.log('last position', lastPos, 'current position', currentPos, element.name);
                            cc.log('x change', Math.floor(lastPos.x - currentPos.x));
                            cc.log('y change', Math.floor(lastPos.y - currentPos.y));
                        }
                    }),
                );
                element.runAction(this.action);
                return;
            } else {
                element.setPosition(cc.v2(-157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex));
                return;
            }
        }));
        this.scheduleOnce(() => {
            this._generateRandomValue();
            this.node.dispatchEvent(new cc.Event.EventCustom('updateScore', true));
        }, this._time*2);
        return;
    },

    _generateRandomValue() {
        cc.log(this._check);
        if (!this._check) return;
        do {
            this.randomCollumn = Math.floor(Math.random() * 4);
            this.randomRow = Math.floor(Math.random() * 4);
            if (this._tilesMatrix.flat().every(element => element.active)) {
                return;
            }
        } while (this._tilesMatrix[this.randomRow][this.randomCollumn].active);
        this.randomTile = this._tilesMatrix[this.randomRow][this.randomCollumn];
        this.number = this.randomTile.getComponent('tilesScript');
        // this.randomTile.once('position-changed', () => this._check = true, this);
        this.randomTile.active = true;
        this.randomTile.scale = 0;
        this.number.setNumber(Math.random() > 0.7 ? 4 : 2);
        this.randomTile.setPosition(cc.v2(-157.5 + 105 * this.randomCollumn, 157.5 - 105 * this.randomRow));
        this.randomTile.runAction(cc.scaleTo(this._time, 1));
        this._check = false;
    },

    _setupGrid(playing) {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
        let numberIndex = 1;
        this._tilesMatrix.push([], [], [], []);
        for (let collumn = 0; collumn < 4; collumn++) {
            for (let row = 0; row < 4; row++) {
                this.tile = cc.instantiate(this.tilePrefab);
                this.tile.active = false;
                this.tile.on('mousedown', this._onClick, this.tile);
                this.tile.name = `tile ${numberIndex++}`;
                this.tile.setPosition(cc.v2(-157.5 + 105 * row, 157.5 - 105 * collumn));
                this._tilesMatrix[Number(String((this.tile.getPosition().y - 157.5) * -1)[0])][Number(String(this.tile.getPosition().x + 157.5)[0])] = this.tile;
                this.node.addChild(this.tile);
            }
        }
        if (playing) return;
        for (let i = 0; i < 2; i++) {
            this._check = true;
            this._generateRandomValue();
        }
        cc.log(this._tilesMatrix);
        this._check = false;
    },

    _checkWin: function () {
        let win = false;
        this._tilesMatrix.flat().forEach(element => element.getComponent('tilesScript').number === 2048 ? win = true : null);
        if (win) {
            cc.log('you have won');
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
            this.scheduleOnce(() => {
                this.node.dispatchEvent(new cc.Event.EventCustom('win', true));
            }, 0.5);
            return true;
        }
        return false;
    },

    _checkLose: function () {
        if (!this._tilesMatrix.flat().every(element => element.active)) return;
        this.checkRow = this._tilesMatrix.every((element) => {
            if (element.every((element, index, array) => {
                if (array[index + 1] === undefined) return true;
                this.number = element.getComponent('tilesScript').number;
                this.nextNumber = array[index + 1].getComponent('tilesScript').number;
                if (this.number !== this.nextNumber) return true;
                return false;
            })) return true;
            return false;
        });
        this.checkCollumn = this._tilesMatrix.flat().every((element, index, array) => {
            if (array[index + 4] === undefined) return true;
            this.number = element.getComponent('tilesScript').number;
            this.nextNumber = array[index + 4].getComponent('tilesScript').number;
            if (this.number !== this.nextNumber) return true;
            return false;
        });
        if (this.checkCollumn && this.checkRow) {
            cc.log('you have lost');
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
            this.scheduleOnce(() => {
                this.node.dispatchEvent(new cc.Event.EventCustom('lose', true));
            }, 0.5);
            return true;
        }
        return false;
    },

    _reset() {
        this._tilesMatrix = [];
        this.node.children.splice(1, 16);
        this.node.dispatchEvent(new cc.Event.EventCustom('updateScore', true));
        cc.log(this.node.children);
    },

    _onClick: function () {
        cc.log(this.name);
        this.script = this.getComponent('tilesScript');
        this.script.setNumber(this.script.number === 2 ? 4 : 2);
        // this.script.setNumber(2048);
        return;
        cc.log(this.getPosition(cc.v2()));
    },

    onLoad() {
        this.node.on('checkWin', this._checkWin, this);
        this.node.on('checkLose', this._checkLose, this);
        this.node.on('move', (event) => {
            event.stopPropagation();
            this._check = true;
        }, this);
    },

    start() {
    },

    update(dt) {
    },
});

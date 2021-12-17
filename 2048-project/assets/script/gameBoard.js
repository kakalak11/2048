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
        _tilesMatrix: [],
        _moving: null,
        _time: 0.25,
        _check: true,
        _combined: false,
        _posistionChanged: null,
        _skip: false,
    },

    // LIFE-CYCLE CALLBACKS:

    _onKeyDown: function (event) {
        if (this._moving) return;
        this._moving = true;
        switch (event.keyCode) {
            case cc.macro.KEY.d:
                this._moveRow(true);
                break;
            case cc.macro.KEY.a:
                this._moveRow(false);
                break;
            case cc.macro.KEY.s:
                this._moveCollumn(true);
                break;
            case cc.macro.KEY.w:
                this._moveCollumn(false);
                break;
            case cc.macro.KEY.space:
                this._adjustPosition();
                console.clear();
                break;
            default:
                this._moving = false;
                break;
        }
    },

    _moveRow: function (directionRight, adjust) {
        this._tilesMatrix.forEach((element, rowIndex) => {
            let numbers = element.filter(element => element.active);
            let zeros = element.filter(element => !element.active);
            directionRight ? element = zeros.concat(numbers) : element = numbers.concat(zeros);
            for (let i = 0; i < 4; i++) this._tilesMatrix[rowIndex][i] = element.shift();
        });
        if (!adjust) this._combineRow(directionRight);
        this._adjustPosition();
        if (adjust) this._generateRandomValue();

        return;
        this.scheduleOnce(() => {
            this.node.emit('move');
        }, this._time);
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
        if (!adjust) this._combineCollumn(directionDown);
        this._adjustPosition();
        if (adjust) this._generateRandomValue();

        return;
        this.scheduleOnce(() => {
            this.node.emit('combineCollumn', directionDown);
            this.node.emit('move');
        }, this._time);
    },

    _adjustPosition: function () {
        this._tilesMatrix.forEach((element, rowIndex) => element.forEach((element, collumnIndex) => {
            this.action = cc.sequence(
                cc.moveTo(this._time / 2, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex).easing(cc.easeCubicActionInOut(this._time / 2)),
                cc.callFunc(() => this._moving = false),
            );
            element.runAction(this.action);
        }));
        return;
    },

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
                    let copyTile = this.nextElement;
                    this.elementScript.setNumber(this.elementScript.number *= 2);
                    element.runAction(cc.sequence(cc.scaleTo(this._time / 2, 1.25), cc.scaleTo(this._time / 2, 1)));
                    this.nextElement.active = false;
                    this.nextElementScript.setNumber(0);
                    let action = cc.sequence(
                        cc.moveBy(this._time, element.getPosition(cc.v2())),
                        cc.callFunc(() => {
                            copyTile.destroy();
                        }),
                    );
                    copyTile.runAction(action);
                    this._combined = true;
                }
            });
            directionRight ? this.array.reverse() : null;
        });
        this.scheduleOnce(() => this._moveRow(directionRight, true), this._time / 2);
        this._combined && !this._check ? this._generateRandomValue(true) : this._combined = false;
        return;
    },

    //  2  -  2  -  2  - 0  => move =>  0  -  2  -  2  -  2  => reverse =>  2  -  2  -  2  -  0  => combine =>  4  -  0  -  2  -  0  => reverse 

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
                    let copyTile = this.nextElement;
                    this.elementScript.setNumber(this.elementScript.number *= 2);
                    element.runAction(cc.sequence(cc.scaleTo(this._time / 2, 1.25), cc.scaleTo(this._time / 2, 1)));
                    this.nextElement.active = false;
                    this.nextElementScript.setNumber(0);
                    let action = cc.sequence(
                        cc.moveTo(this._time, element.getPosition(cc.v2())),
                        cc.callFunc(() => {
                            copyTile.destroy();
                        }),
                    );
                    copyTile.runAction(action);
                    // this.node.emit('position-changed');
                    this._combined = true;

                }
            });
            directionDown ? this.collumn.reverse() : null;
        }
        this.scheduleOnce(() => this._moveCollumn(directionDown, true), this._time / 2);
        this._combined && !this._check ? this._generateRandomValue(true) : this._combined = false;
        return;
    },

    _generateRandomValue(bypass = false) {
        if (this._skip) {
            this._skip = false;
            this._check = false;
            return;
        }
        cc.warn('bypass is ', bypass);
        cc.warn('check is ', this._check);
        if (bypass) {
            this._check = true;
            this._skip = bypass;
        }
        cc.log('===========');
        if (!this._check) return;
        do {
            this.randomCollumn = Math.floor(Math.random() * 4);
            this.randomRow = Math.floor(Math.random() * 4);
            if (this._tilesMatrix.every(element => element.every(element => element.active))) {
                this.node.emit('checkLose');
                return;
            }
        } while (this._tilesMatrix[this.randomRow][this.randomCollumn].active);
        this.randomTile = this._tilesMatrix[this.randomRow][this.randomCollumn];
        this.number = this.randomTile.getComponent('tilesScript');
        this.randomTile.active = true;
        this.randomTile.scale = 0;
        this.number.setNumber(Math.random() > 0.7 ? 4 : 2);
        this.randomTile.setPosition(cc.v2(-157.5 + 105 * this.randomCollumn, 157.5 - 105 * this.randomRow));
        this.randomTile.runAction(cc.sequence(cc.scaleTo(this._time, 1), cc.callFunc(() => null)));
        // this.scheduleOnce(() => this._check = false, this._time);
        this._check = false;
        this._combined = false;
    },

    _setupGrid() {
        let numberIndex = 1;
        this._tilesMatrix.push([], [], [], []);
        for (let collumn = 0; collumn < 4; collumn++) {
            for (let row = 0; row < 4; row++) {
                this.tile = cc.instantiate(this.tilePrefab);
                this.tile.active = false;
                this.tile.on('mousedown', this._onClick, this.tile);
                // tile.active ? tile.getComponent('tilesScript').setNumber(Math.random() > 0.5 ? 2 : 4) : tile.getComponent('tilesScript').setNumber(0);
                this.tile.name = `tile ${numberIndex++}`;
                this.tile.setPosition(cc.v2(-157.5 + 105 * row, 157.5 - 105 * collumn));
                this.tile.on('position-changed', () => {
                    if (this._check) return;
                    this._check = true;
                }, this);
                this._tilesMatrix[Number(String((this.tile.getPosition().y - 157.5) * -1)[0])][Number(String(this.tile.getPosition().x + 157.5)[0])] = this.tile;
                this.node.addChild(this.tile);
            }
        }
        for (let i = 0; i < 2; i++) {
            this._check = true;
            this._generateRandomValue();
        }
        this._check = false;
    },

    _addEvent: function () {
        // this.node.on('move', this._generateRandomValue, this);
        this.node.on('adjustRow', (adjustRight) => {
            this._tilesMatrix.forEach((element, rowIndex) => {
                let numbers = element.filter(element => element.active);
                let zeros = element.filter(element => !element.active);
                adjustRight ? element = zeros.concat(numbers) : element = numbers.concat(zeros);
                element.forEach((element, collumnIndex) => element.runAction(cc.sequence(cc.moveTo(this._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex), cc.callFunc(() => {
                }))));
                for (let i = 0; i < 4; i++) {
                    this._tilesMatrix[rowIndex][i] = element.shift();
                }
            });
            this.node.emit('checkWin');
        }, this);
        this.node.on('adjustCollumn', (adjustDown) => {
            for (let i = 0; i < 4; i++) {
                let collumn = [];
                for (let j = 0; j < 4; j++) {
                    collumn.push(this._tilesMatrix[j][i]);
                }
                let numbers = collumn.filter(element => element.active);
                let zeros = collumn.filter(element => !element.active);
                adjustDown ? collumn = zeros.concat(numbers) : collumn = numbers.concat(zeros);
                for (let j = 0; j < 4; j++) {
                    this._tilesMatrix[j][i] = collumn.shift();
                }
            }
            this._tilesMatrix.forEach((element, rowIndex) => element.forEach((element, collumnIndex) => {
                element.runAction(cc.moveTo(this._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex));
            }));
            this.node.emit('checkWin');
        });
        this.node.on('combineRow', this._combineRow, this);
        this.node.on('combineCollumn', this._combineCollumn, this);
        this.node.on('checkWin', this._checkWin, this);
        this.node.on('checkLose', this._checkLose, this);
    },

    _checkWin: function () {
        // !this._combined && this._check ? this._check = false : null;
        // cc.log(this._check);
        this._combined && !this._check ? this._generateRandomValue(true) : null;
        this._check ? this._generateRandomValue() : null;
        this._check && !this._combined ? this._check = false : null;
        this._combined = false;
        // this._check ? this._check = false : null;
        let win = false;
        this._tilesMatrix.flat().forEach(element => {
            element.getComponent('tilesScript').number === 2048 ? win = true : null;
        })
        win ? cc.log('you have won') : null;
        return;
    },

    _checkLose: function () {
        this.checkRow = this._tilesMatrix.every((element, index, array) => {
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
            cc.log('you lose')
            return false;
        });
        if (this.checkCollumn && this.checkRow) return true;
        return false;
    },

    _onClick: function () {
        cc.log(this.name);
        this.script = this.getComponent('tilesScript');
        this.script.setNumber(this.script.number === 2 ? 4 : 2);
        return;
        cc.log(this.getPosition(cc.v2()));
    },

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
        this._setupGrid();
        this._addEvent();
    },

    start() {

        // this.schedule(() => console.clear(), 1);
    },

    update(dt) {
        // cc.log('check is ', this._check);
    },
});

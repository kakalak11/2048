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
        _time: 0.125,
        _check: null,
    },

    // LIFE-CYCLE CALLBACKS:

    _onKeyDown: function (event) {
        if (this._moving) return;
        switch (event.keyCode) {
            case cc.macro.KEY.right || cc.macro.KEY.d:
                this._moving = true;
                this.node.emit('right')
                // this._moveRight();
                break;
            case cc.macro.KEY.left || cc.macro.KEY.a:
                this._moving = true;
                this._moveLeft();
                break;
            case cc.macro.KEY.down || cc.macro.KEY.s:
                this._moving = true;
                this._moveDown();
                break;
            case cc.macro.KEY.up || cc.macro.KEY.w:
                this._moving = true;
                this._moveUp();
                break;
            case cc.macro.KEY.space:
                cc.log(this._tilesMatrix.every((element, index, array) => {
                    if (element.every((element, index, array) => {
                        if (array[index + 1] === undefined) return true;
                        this.number = element.getComponent('tilesScript').number;
                        this.nextNumber = array[index + 1].getComponent('tilesScript').number;
                        if (this.number !== this.nextNumber) return true;
                        return false;
                    })) return true;
                    return false;
                }));
                break;
        }
    },

    _moveRight: function () {
        this._tilesMatrix.forEach((element, rowIndex) => {
            let numbers = element.filter(element => element.active);
            let zeros = element.filter(element => !element.active);
            element = zeros.concat(numbers);
            element.forEach((element, collumnIndex) => element.runAction(cc.sequence(cc.moveTo(this._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex), cc.callFunc(() => {
            }))));
            cc.log()
            for (let i = 0; i < 4; i++) {
                this._tilesMatrix[rowIndex][i] = element.shift();
            }
        });
        this.scheduleOnce(() => {
            this.node.emit('combineRow', true);
            this.node.emit('move');

        }, this._time);

    },

    _moveLeft: function () {
        this._tilesMatrix.forEach((element, rowIndex) => {
            let numbers = element.filter(element => element.active);
            let zeros = element.filter(element => !element.active);
            element = numbers.concat(zeros);
            element.forEach((element, collumnIndex) => element.runAction(cc.sequence(cc.moveTo(this._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex), cc.callFunc(() => {
            }))));
            for (let i = 0; i < 4; i++) {
                this._tilesMatrix[rowIndex][i] = element.shift();
            }
        });
        this.scheduleOnce(() => {
            this.node.emit('combineRow', false);
            this.node.emit('move');

        }, this._time);
    },

    _moveDown: function () {
        for (let i = 0; i < 4; i++) {
            let collumn = [];
            for (let j = 0; j < 4; j++) {
                collumn.push(this._tilesMatrix[j][i]);
            }
            let numbers = collumn.filter(element => element.active);
            let zeros = collumn.filter(element => !element.active);
            collumn = zeros.concat(numbers);
            for (let j = 0; j < 4; j++) {
                this._tilesMatrix[j][i] = collumn.shift();
            }
        }
        this._tilesMatrix.forEach((element, rowIndex) => element.forEach((element, collumnIndex) => {
            element.runAction(cc.moveTo(this._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex));

        }));
        this.scheduleOnce(() => {
            this.node.emit('combineCollumn', true);
            this.node.emit('move');
        }, this._time);
    },

    _moveUp: function () {
        for (let i = 0; i < 4; i++) {
            let collumn = [];
            for (let j = 0; j < 4; j++) {
                collumn.push(this._tilesMatrix[j][i]);
            }
            let numbers = collumn.filter(element => element.active);
            let zeros = collumn.filter(element => !element.active);
            collumn = numbers.concat(zeros);
            for (let j = 0; j < 4; j++) {
                this._tilesMatrix[j][i] = collumn.shift();
            }
        }
        this._tilesMatrix.forEach((element, rowIndex) => element.forEach((element, collumnIndex) => {
            element.runAction(cc.moveTo(this._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex));

        }));
        this.scheduleOnce(() => {
            this.node.emit('combineCollumn', false);
            this.node.emit('move');
        }, this._time);
    },

    //  2  -  2  -  2  - 0  => move =>  0  -  2  -  2  -  2  => reverse =>  2  -  2  -  2  -  0  => combine =>  4  -  0  -  2  -  0  => reverse 

    _combineRow: function (directionRight) {
        if (directionRight) {
            this._tilesMatrix.forEach(element => {
                element.reverse().forEach((element, index, array) => {
                    if (this.skip) {
                        this.skip = false;
                        return;
                    }
                    this.nextElement = array[index + 1];
                    this.elementScript = element.getComponent('tilesScript');
                    if (this.nextElement === undefined) return;
                    this.nextElementScript = this.nextElement.getComponent('tilesScript');
                    if (this.elementScript.number === this.nextElementScript.number) {
                        this.skip = true;
                        let copyTile = this.nextElement;
                        this.elementScript.setNumber(this.elementScript.number *= 2);
                        element.runAction(cc.sequence(cc.scaleTo(0.125, 1.25), cc.scaleTo(0.125, 1)));
                        this.nextElement.active = false;
                        this.nextElementScript.setNumber(0);
                        let action = cc.sequence(
                            cc.moveBy(0.125, element.getPosition(cc.v2())),
                            cc.callFunc(() => {
                                copyTile.destroy();
                            }),
                        );
                        copyTile.runAction(action);

                    }
                });
                element.reverse();
            });
            this.node.emit('adjustRow', true);
            return;
        }

        this._tilesMatrix.forEach(element => {
            element.forEach((element, index, array) => {
                if (this.skip) {
                    this.skip = false;
                    return;
                }
                this.nextElement = array[index + 1];
                this.elementScript = element.getComponent('tilesScript');
                if (this.nextElement === undefined) return;
                this.nextElementScript = this.nextElement.getComponent('tilesScript');
                if (this.elementScript.number === this.nextElementScript.number) {
                    this.skip = true;
                    let copyTile = this.nextElement;
                    this.elementScript.setNumber(this.elementScript.number *= 2);
                    element.runAction(cc.sequence(cc.scaleTo(0.125, 1.25), cc.scaleTo(0.125, 1)));
                    this.nextElement.active = false;
                    this.nextElementScript.setNumber(0);
                    let action = cc.sequence(
                        cc.moveBy(0.125, element.getPosition(cc.v2())),
                        cc.callFunc(() => {
                            copyTile.destroy();
                        }),
                    );
                    copyTile.runAction(action);

                }
            });
        });
        this.node.emit('adjustRow', false);
        return;
    },

    _combineCollumn: function (directionDown) {
        if (directionDown) {
            for (let i = 0; i < 4; i++) {
                this.collumn = [];
                for (let j = 0; j < 4; j++) {
                    this.collumn.push(this._tilesMatrix[j][i]);
                }
                this.collumn.reverse().forEach((element, index, array) => {
                    if (this.skip) {
                        this.skip = false;
                        return;
                    }
                    this.nextElement = array[index + 1];
                    this.elementScript = element.getComponent('tilesScript');
                    if (this.nextElement === undefined) return;
                    this.nextElementScript = this.nextElement.getComponent('tilesScript');
                    if (this.elementScript.number === this.nextElementScript.number) {
                        this.skip = true;
                        let copyTile = this.nextElement;
                        // copyTile.setPosition(element.getPosition(cc.v2()));
                        this.elementScript.setNumber(this.elementScript.number *= 2);
                        element.runAction(cc.sequence(cc.scaleTo(0.125, 1.25), cc.scaleTo(0.125, 1)));
                        this.nextElement.active = false;
                        this.nextElementScript.setNumber(0);
                        let action = cc.sequence(
                            cc.moveTo(0.125, element.getPosition(cc.v2())),
                            cc.callFunc(() => {
                                copyTile.destroy();
                            }),
                        );
                        copyTile.runAction(action);
                    }
                });
                this.collumn.reverse();
            }
            this.node.emit('adjustCollumn', true);
            return;
        }



        for (let i = 0; i < 4; i++) {
            this.collumn = [];
            for (let j = 0; j < 4; j++) {
                this.collumn.push(this._tilesMatrix[j][i]);
            }
            this.collumn.forEach((element, index, array) => {
                if (this.skip) {
                    this.skip = false;
                    return;
                }
                this.nextElement = array[index + 1];
                this.elementScript = element.getComponent('tilesScript');
                if (this.nextElement === undefined) return;
                this.nextElementScript = this.nextElement.getComponent('tilesScript');
                if (this.elementScript.number === this.nextElementScript.number) {
                    this.skip = true;
                    let copyTile = this.nextElement;
                    // copyTile.setPosition(element.getPosition(cc.v2()));
                    this.elementScript.setNumber(this.elementScript.number *= 2);
                    element.runAction(cc.sequence(cc.scaleTo(0.125, 1.25), cc.scaleTo(0.125, 1)));
                    this.nextElement.active = false;
                    this.nextElementScript.setNumber(0);
                    let action = cc.sequence(
                        cc.moveTo(0.125, element.getPosition(cc.v2())),
                        cc.callFunc(() => {
                            copyTile.destroy();
                        }),
                    );
                    copyTile.runAction(action);
                }
            });
        }
        this.node.emit('adjustCollumn', false);
        return;
    },

    _generateRandomValue() {
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
        this.randomTile.runAction(cc.sequence(cc.scaleTo(this._time, 1), cc.callFunc(() => this._check = false)));
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
                this.tile.on('position-changed', () => this._check = true, this);
                this._tilesMatrix[Number(String((this.tile.getPosition().y - 157.5) * -1)[0])][Number(String(this.tile.getPosition().x + 157.5)[0])] = this.tile;
                this.node.addChild(this.tile);
            }
        }
        this._check = true;
        // this._generateRandomValue();
        // this._generateRandomValue();
        for (let i = 0; i < 16; i++) this._generateRandomValue();
        this._check = false;
    },

    _addEvent: function () {
        this.node.on('move', this._generateRandomValue, this);
        this.node.on('right', this._moveRight, this);
        this.node.on('adjustRow', (adjustRight) => {
            this._tilesMatrix.forEach((element, rowIndex) => {
                let numbers = element.filter(element => element.active);
                let zeros = element.filter(element => !element.active);
                adjustRight ? element = zeros.concat(numbers) : element = numbers.concat(zeros);
                element.forEach((element, collumnIndex) => element.runAction(cc.sequence(cc.moveTo(this._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex), cc.callFunc(() => {
                    this._moving = false;
                }))));
                for (let i = 0; i < 4; i++) {
                    this._tilesMatrix[rowIndex][i] = element.shift();
                }
            });
            this.node.emit('checkWin');
            // cc.log(this._tilesMatrix[0]);
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
                this._moving = false;
            }));
            this.node.emit('checkWin');
        });
        this.node.on('combineRow', this._combineRow, this);
        this.node.on('combineCollumn', this._combineCollumn, this);
        this.node.on('checkWin', this._checkWin, this);
        this.node.on('checkLose', this._checkLose, this);
    },

    _checkWin: function () {
        let win = false;
        this._tilesMatrix.flat().forEach(element => {
            element.getComponent('tilesScript').number === 2048 ? win = true : null;
        })
        win ? cc.log('you have won') : null;
    },

    _checkLose: function () {

    },

    _onClick: function () {
        cc.log(this.getPosition(cc.v2()));
        this.script = this.getComponent('tilesScript');
        this.script.setNumber(this.script.number === 2 ? 4 : 2);
    },

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
        this._setupGrid();
        this._addEvent();


    },

    start() {

    },

    update(dt) {

    },
});

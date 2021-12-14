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
    },

    // LIFE-CYCLE CALLBACKS:

    _onKeyDown: function (event) {
        if (this._moving) return;
        switch (event.keyCode) {
            case cc.macro.KEY.right:
                this._moving = true;
                this.node.emit('right')
                break;
            case cc.macro.KEY.left:
                this._moving = true;
                this._moveLeft();
                break;
            case cc.macro.KEY.down:
                this._moving = true;
                this._moveDown();
                break;
            case cc.macro.KEY.up:
                this._moving = true;
                this._moveUp();
                break;
            case cc.macro.KEY.space:
                this._generateRandomValue();
                break;
            case cc.macro.KEY.c:
                this.node.emit('combine', true);
                break;
            case cc.macro.KEY.v:
                this.node.emit('combine', false);
                break;
        }
    },

    _moveRight: function () {
        this._tilesMatrix.forEach((element, rowIndex) => {
            let numbers = element.filter(element => element.active);
            let zeros = element.filter(element => !element.active);
            element = zeros.concat(numbers);
            element.forEach((element, collumnIndex) => element.runAction(cc.sequence(cc.moveTo(0.25, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex), cc.callFunc(() => {
                this._moving = false;
            }))));
            for (let i = 0; i < 4; i++) {
                this._tilesMatrix[rowIndex][i] = element.shift();
            }
        });
        this.node.emit('move');
    },

    _moveLeft: function () {
        this._tilesMatrix.forEach((element, rowIndex) => {
            let numbers = element.filter(element => element.active);
            let zeros = element.filter(element => !element.active);
            element = numbers.concat(zeros);
            element.forEach((element, collumnIndex) => element.runAction(cc.sequence(cc.moveTo(0.25, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex), cc.callFunc(() => {
                this._moving = false;
            }))));
            for (let i = 0; i < 4; i++) {
                this._tilesMatrix[rowIndex][i] = element.shift();
            }
        });
        this.node.emit('move');
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
            element.runAction(cc.moveTo(0.25, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex));
            this._moving = false;
        }));
        this.node.emit('move');
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
            element.runAction(cc.moveTo(0.25, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex));
            this._moving = false;
        }));
        this.node.emit('move');
    },

    _combineHorizon: function (directionRight) {
        cc.log('time to combine !!!');
        cc.log(directionRight);
        if (directionRight) {
            this._tilesMatrix.forEach(element => {
                element.forEach((element, index, array) => {
                    while (this.skip) {
                        this.skip = false;
                        return;
                    }
                    cc.log(element, this.nextElement);
                    this.nextElement = array[index + 1];
                    this.elementScript = element.getComponent('tilesScript');
                    if (this.nextElement) this.nextElementScript = this.nextElement.getComponent('tilesScript');
                    else return;
                    cc.log(this.elementScript.number, this.nextElementScript.number);
                    cc.log(this.elementScript.number === this.nextElementScript.number);
                    if (this.elementScript.number === this.nextElementScript.number) {
                        this.nextElementScript.setNumber(this.nextElementScript.number *= 2);
                        this.elementScript.setNumber(0);
                        element.active = false;
                        this.skip = true;
                    }
                });
            });
            return;
        }

        this._tilesMatrix.forEach(element => {
            element.reverse().forEach((element, index, array) => {
                cc.log(element);
                while (this.skip) {
                    this.skip = false;
                    return;
                }
                cc.log(element, this.nextElement);
                this.nextElement = array[index + 1];
                this.elementScript = element.getComponent('tilesScript');
                if (this.nextElement) this.nextElementScript = this.nextElement.getComponent('tilesScript');
                else return;
                cc.log(this.elementScript.number, this.nextElementScript.number);
                cc.log(this.elementScript.number === this.nextElementScript.number);
                if (this.elementScript.number === this.nextElementScript.number) {
                    this.nextElementScript.setNumber(this.nextElementScript.number *= 2);
                    this.elementScript.setNumber(0);
                    element.active = false;
                    this.skip = true;
                }
            });
            element.reverse();
        });
    },

    _combineVertical: function () {
        for (let i = 0; i < 4; i++) {
            this.collumn = [];
            for (let j = 0; j < 4; j++) {
                this.collumn.push(this._tilesMatrix[i][j]);
            }
            this.collumn.forEach((element, index, array) => {

            });
        }
    },

    _generateRandomValue() {
        do {
            this.randomCollumn = Math.floor(Math.random() * 4);
            this.randomRow = Math.floor(Math.random() * 4);
            if (this._tilesMatrix.every(element => element.every(element => element.active))) {
                return;
            }
        } while (this._tilesMatrix[this.randomRow][this.randomCollumn].active);
        this.randomTile = this._tilesMatrix[this.randomRow][this.randomCollumn];
        this.number = this.randomTile.getComponent('tilesScript');
        this.randomTile.active = true;
        this.randomTile.scale = 0;
        this.number.setNumber(Math.random() > 0.7 ? 4 : 2);
        this.randomTile.setPosition(cc.v2(-157.5 + 105 * this.randomCollumn, 157.5 - 105 * this.randomRow));
        this.randomTile.runAction(cc.scaleTo(0.25, 1));
    },

    _setupGrid() {
        let numberIndex = 1;
        this._tilesMatrix.push([], [], [], []);
        for (let collumn = 0; collumn < 4; collumn++) {
            for (let row = 0; row < 4; row++) {
                let tile = cc.instantiate(this.tilePrefab);
                tile.active = Math.random() > 0.9 ? true : false;
                tile.active ? tile.getComponent('tilesScript').setNumber(Math.random() > 0.5 ? 2 : 4) : tile.getComponent('tilesScript').setNumber(0);
                tile.name = `tile ${numberIndex++}`;
                tile.setPosition(cc.v2(-157.5 + 105 * row, 157.5 - 105 * collumn));
                this._tilesMatrix[Number(String((tile.getPosition().y - 157.5) * -1)[0])][Number(String(tile.getPosition().x + 157.5)[0])] = tile;
                this.node.addChild(tile);
            }
        }
    },

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
        this._setupGrid();
        this.node.on('move', this._generateRandomValue, this);
        this.node.on('right', this._moveRight, this);
        this.node.on('combine', this._combineTile, this);
    },

    start() {
    },

    update(dt) {

    },
});

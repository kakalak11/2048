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
                this._moveRight();
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
                this._showPostion();
                break;
        }
    },

    _moveRight: function () {
        this._tilesMatrix.forEach((element, rowIndex) => {
            let numbers = element.filter(element => element.active);
            let zeros = element.filter(element => !element.active);
            element = zeros.concat(numbers);
            element.forEach((element, collumnIndex) => element.runAction(cc.sequence(cc.moveTo(0.25, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex), cc.callFunc(() => this._moving = false))));
            for (let i = 0; i < 4; i++) {
                this._tilesMatrix[rowIndex][i] = element.shift();
            }
        });
        cc.log(this._tilesMatrix);
    },

    _moveLeft: function () {
        this._tilesMatrix.forEach((element, rowIndex) => {
            let numbers = element.filter(element => element.active);
            let zeros = element.filter(element => !element.active);
            element = numbers.concat(zeros);
            element.forEach((element, collumnIndex) => element.runAction(cc.sequence(cc.moveTo(0.25, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex), cc.callFunc(() => this._moving = false))));
            for (let i = 0; i < 4; i++) {
                this._tilesMatrix[rowIndex][i] = element.shift();
            }
        });
        cc.log(this._tilesMatrix);
    },

    _moveDown: function () {
        for (let i = 0; i < 4; i++) {
            let collumn = [];
            for (let j = 0; j < 4; j++) {
                collumn.push(this._tilesMatrix[j][i]);
            }
            cc.log(collumn);
            let numbers = collumn.filter(element => element.active);
            let zeros = collumn.filter(element => !element.active);
            collumn = zeros.concat(numbers);
            cc.log(collumn);
            collumn.forEach((element, index) => element.runAction(cc.sequence(cc.moveTo(0.25, -157.5 + 105 * i, 157.5 - 105 * index), cc.callFunc(() => this._moving = false))));
            for (let j = 0; j < 4; j++) {
                this._tilesMatrix[j][i] = collumn.shift();
            }
        }
        cc.log(this._tilesMatrix);
    },

    _moveUp: function () {
        for (let i = 0; i < 4; i++) {
            let collumn = [];
            for (let j = 0; j < 4; j++) {
                collumn.push(this._tilesMatrix[j][i]);
            }
            cc.log(collumn);
            let numbers = collumn.filter(element => element.active);
            let zeros = collumn.filter(element => !element.active);
            collumn = numbers.concat(zeros);
            cc.log(collumn);
            collumn.forEach((element, index) => element.runAction(cc.sequence(cc.moveTo(0.25, -157.5 + 105 * i, 157.5 - 105 * index), cc.callFunc(() => this._moving = false))));
            for (let j = 0; j < 4; j++) {
                this._tilesMatrix[j][i] = collumn.shift();
            }
        }
        cc.log(this._tilesMatrix);
    },

    _showPostion: function () {
        // this._tilesRows.forEach(element => element.forEach(element => cc.log(element.name, Math.floor((element.getPosition().x + 157.5) / 100), Math.floor((element.getPosition().y + 157.5) / 100))));
        this._tilesRows.forEach(element => {
            element.forEach(element => {
                // this._tilesRows[Math.floor((element.getPosition().x + 157.5) / 100)][Math.floor((element.getPosition().y + 157.5) / 100)] = element;
                // this._tilesCollumns[Math.floor((element.getPosition().y + 157.5) / 100)][Math.floor((element.getPosition().x + 157.5) / 100)] = element;
                // cc.log(Math.floor((element.getPosition().x + 157.5) / 100), Math.floor((element.getPosition().y + 157.5) / 100))
            })
        });
        cc.log(this._tilesCollumns, this._tilesRows);
    },

    _setupGrid() {
        let numberIndex = 1;
        this._tilesMatrix.push([], [], [], []);
        for (let collumn = 0; collumn < 4; collumn++) {
            for (let row = 0; row < 4; row++) {
                let tile = cc.instantiate(this.tilePrefab);
                tile.active = Math.random() > 0.7 ? true : false;
                tile.name = `tile ${numberIndex}`;
                tile.getComponent('tilesScript').setNumber(numberIndex++);
                tile.setPosition(cc.v2(-157.5 + 105 * row, 157.5 - 105 * collumn));
                // cc.log(Number(String(tile.getPosition().x + 157.5)[0]), Number(String((tile.getPosition().y - 157.5) * -1)[0]));
                this._tilesMatrix[Number(String((tile.getPosition().y - 157.5) * -1)[0])][Number(String(tile.getPosition().x + 157.5)[0])] = tile;
                this.node.addChild(tile);
            }
        }
    },

    _generateRandomValue() {
        let randomTile = this.node.children[parseInt(Math.random() * 3)].children[parseInt(Math.random() * 3)];
        cc.log(randomTile);
    },

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
    },

    start() {
        this._setupGrid();
    },

    update(dt) { },
});

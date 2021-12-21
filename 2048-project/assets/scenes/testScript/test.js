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
        nodePrefab: cc.Prefab,
        _canMove: true,
        _tileArray: [],
        _moved: true,
    },

    // LIFE-CYCLE CALLBACKS:

    _createTile: function (number) {
        this._tileArray.push([], [], [], []);
        let index = 0;
        for (let row = 0; row < number; row++) {
            for (let collumn = 0; collumn < number; collumn++) {
                this.tile = cc.instantiate(this.nodePrefab);
                this.tile.opacity = 0;
                this.tile.name = `tile ${index + 1}`;
                // this.tile.on('mousedown', this._onClick, this.tile);
                this.node.addChild(this.tile);
                this._tileArray[row].push(this.tile);
                this.script = this.tile.getComponent('prefabScript');
                this.xPos = -157.5 + collumn * 105;
                this.yPos = 157.5 - row * 105;
                this.script._pos = cc.v2(this.xPos, this.yPos);
                this.script._index = index;
                index++;
            }
        }
        for (let i = 0; i < 2; i++) {
            do {
                this.random = Math.floor(Math.random() * 16);
            } while (this._tileArray.flat()[this.random].opacity !== 0)
            Emitter.instance.emit('setActive', this.random);
        }
        Emitter.instance.emit('setPosition', true);
    },

    _onKeyDown: function (event) {
        if (!this._canMove) return;
        this._canMove = false;
        switch (event.keyCode) {
            case cc.macro.KEY.d:
                this._moveRow(true);
                this._combineRow(true);
                this._moveRow(true);
                Emitter.instance.emit('setPosition');
                this._generateRandomtile();
                break;
            case cc.macro.KEY.a:
                this._moveRow(false);
                this._combineRow(false);
                this._moveRow(false);
                Emitter.instance.emit('setPosition');
                this._generateRandomtile();
                break;
            case cc.macro.KEY.w:
                this._moveCollumn(false);
                this._combineCollumn(false);
                this._moveCollumn(false);
                Emitter.instance.emit('setPosition');
                this._generateRandomtile();
                break;
            case cc.macro.KEY.s:
                this._moveCollumn(true);
                this._combineCollumn(true);
                this._moveCollumn(true);
                Emitter.instance.emit('setPosition');
                this._generateRandomtile();
                break;
            default:
                this._canMove = true;
                break;
        }
    },

    _onClick: function () {
        if (!this.opacity) return;
        this.script = this.getComponent('prefabScript');
        this.script.number === 2 ? this.script.setNumber(4) : this.script.setNumber(2);
    },

    _moveRow: function (moveRight) {
        this._tileArray.forEach((element, index) => {
            this.numbers = element.filter(element => element.opacity !== 0);
            this.zeros = element.filter(element => element.opacity === 0);
            moveRight ? element = this.zeros.concat(this.numbers) : element = this.numbers.concat(this.zeros);
            element.forEach((element, index) => {
                this.script = element.getComponent('prefabScript');
                this.script._pos.x = -157.5 + index * 105;
            });
            for (let collumn = 0; collumn < 4; collumn++) this._tileArray[index][collumn] = element.shift();
        });
    },

    _moveCollumn: function (moveDown) {
        for (let collumn = 0; collumn < 4; collumn++) {
            this.collumn = [];
            for (let row = 0; row < 4; row++) this.collumn.push(this._tileArray[row][collumn]);
            this.numbers = this.collumn.filter(element => element.opacity !== 0);
            this.zeros = this.collumn.filter(element => element.opacity === 0);
            moveDown ? this.collumn = this.zeros.concat(this.numbers) : this.collumn = this.numbers.concat(this.zeros);
            this.collumn.forEach((element, index) => {
                this.script = element.getComponent('prefabScript');
                this.script._pos.y = 157.5 - index * 105;
            });
            for (let row = 0; row < 4; row++)this._tileArray[row][collumn] = this.collumn.shift();
        }
    },

    _combineRow: function (combineRight) {
        this._tileArray.forEach((element, row) => {
            combineRight ? element.reverse() : element;
            element.forEach((element, index, array) => {
                if (this.skip) {
                    this.skip = false;
                    return;
                }
                this.currentScript = element.getComponent('prefabScript');
                if (array[index + 1] === undefined) return;
                this.nextElement = array[index + 1];
                this.nextScript = this.nextElement.getComponent('prefabScript');
                if (this.nextScript.number === 0 || this.currentScript === 0) return;
                if (this.currentScript.number === this.nextScript.number) {
                    Emitter.instance.emit('getCombine', { key: this.currentScript._index });
                    Emitter.instance.emit('setCombine', { key: this.nextScript._index, pos: this.currentScript._pos });
                    this.skip = true;
                    return;
                }
            });
            combineRight ? element.reverse() : null;
        });
    },

    _combineCollumn: function (combineDown) {
        for (let collumn = 0; collumn < 4; collumn++) {
            this.collumn = [];
            for (let row = 0; row < 4; row++)this.collumn.push(this._tileArray[row][collumn]);
            combineDown ? this.collumn.reverse() : this.collumn;
            this.collumn.forEach((element, index, array) => {
                if (this.skip) {
                    this.skip = false;
                    return;
                }
                this.currentElement = element;
                this.currentScript = this.currentElement.getComponent('prefabScript');
                if (array[index + 1] === undefined) return;
                this.nextElement = array[index + 1];
                this.nextScript = this.nextElement.getComponent('prefabScript');
                if (this.nextScript.number === 0 || this.currentScript === 0) return;
                if (this.currentScript.number === this.nextScript.number) {
                    Emitter.instance.emit('getCombine', { key: this.currentScript._index });
                    Emitter.instance.emit('setCombine', { key: this.nextScript._index, pos: this.currentScript._pos })
                    this.skip = true;
                    return;
                }
            });
            combineDown ? this.collumn.reverse() : null;
        }
    },

    _generateRandomtile: function () {
        if (!this._moved) return;
        do {
            this.random = Math.floor(Math.random() * 16);
            if (this._tileArray.flat().every(element => element.opacity !== 0)) {
                return;
            }
        } while (this._tileArray.flat()[this.random].opacity !== 0);
        this.script = this._tileArray.flat()[this.random].getComponent('prefabScript');
        Emitter.instance.emit('setActive', this.script._index);
        this._moved = false;
        return;
    },

    _addEvent: function () {
        Emitter.instance.registerEvent('setPosition', this._generateRandomtile.bind(this));
        this.node.on('moved', () => {
            this._moved = true;
            cc.log('move');
        }, this);
        this.node.on('canMove', (event) => {
            event.stopPropagation();
            this._canMove = true;
        }, this);
    },

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
        this._createTile(4);
        this._addEvent();

    },

    start() {

    },

    update(dt) {

    },
});

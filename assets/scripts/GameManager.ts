import { _decorator, Component, EventKeyboard, Input, input, instantiate, KeyCode, Node, Prefab, tween, Vec2, Vec3 } from 'cc';
import { NumberTileManager } from './NumberTileManager';
const { ccclass, property } = _decorator;

const TABLE_WIDTH = 512, TABLE_HEIGHT = 512;
const TABLE_FORMAT = [4, 4, 4, 4];
const ROW_SIZE = TABLE_HEIGHT / TABLE_FORMAT.length;
const COL_SIZE = TABLE_WIDTH / TABLE_FORMAT[0];
const MOVE_SPEED = 0.1;

function getPosition(col, row) {
    const startX = (-TABLE_FORMAT.length / 2 + 0.5) * COL_SIZE;
    const startY = (TABLE_FORMAT[0] / 2 - 0.5) * ROW_SIZE;

    return new Vec3(startX + COL_SIZE * col, startY - ROW_SIZE * row, 0);
}

function moveNumberToPos(numberTile, newPos) {
    return new Promise((resolve, _) => {
        numberTile['moveTween'] = tween(numberTile)
            .to(MOVE_SPEED * 2, { position: newPos })
            .call(() => {
                numberTile['moveTween'] = null;
                resolve(numberTile);
            })
            .start();
    });
}

@ccclass('GameManager')
export class GameManager extends Component {

    @property(Node) table: Node;
    @property(Prefab) numberTilePrefab: Prefab;

    tableData: any[][];
    canMove: boolean = true;

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.tableData = new Array(TABLE_FORMAT.length).fill([]).map((_, index) => new Array(TABLE_FORMAT[index]).fill(null));
        this.spawnRandomTile({ randomCol: 2, randomRow: 2 });
        this.spawnRandomTile({ randomCol: 1, randomRow: 1 });
        this.spawnRandomTile({ randomCol: 2, randomRow: 1 });
        console.table(this.tableData);
    }

    onKeyDown(event: EventKeyboard) {
        if (!this.canMove) return;
        let allPromises;

        switch (event.keyCode) {
            case KeyCode.SPACE:
                allPromises = this.moveDown();
                break;
            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:
                allPromises = this.moveLeft();
                break;
            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
                allPromises = this.moveRight();
                break;
            case KeyCode.KEY_S:
            case KeyCode.ARROW_DOWN:
                allPromises = this.moveDown();
                break;
            case KeyCode.KEY_W:
            case KeyCode.ARROW_UP:
                allPromises = this.moveUp();
                break;
        }

        if (allPromises && allPromises.length > 0) {
            this.canMove = false;

            Promise.all(allPromises)
                .then(() => {
                    this.canMove = true;
                });
        }
    }

    spawnRandomTile(data) {
        const numberTile = instantiate(this.numberTilePrefab);
        const { randomCol, randomRow } = data || this.getRandomColRow();
        const randomPos = getPosition(randomCol, randomRow);
        const randomValue = Math.random() > 0.5 ? 2 : 4;

        numberTile.setParent(this.table);
        numberTile.setPosition(randomPos);
        numberTile.getComponent(NumberTileManager).updateValue(randomValue);
        numberTile['value'] = randomValue;
        numberTile['col'] = randomCol;
        numberTile['row'] = randomRow;

        this.tableData[randomCol][randomRow] = numberTile;
    }

    getRandomColRow() {
        let randomCol = Math.floor(TABLE_FORMAT.length * Math.random());
        let randomRow = Math.floor(TABLE_FORMAT[0] * Math.random());

        while (this.tableData[randomCol][randomRow] !== null) {
            randomCol = Math.floor(TABLE_FORMAT.length * Math.random());
            randomRow = Math.floor(TABLE_FORMAT[0] * Math.random());
        }

        return { randomCol, randomRow };
    }

    moveDown() {
        let promises = [];
        for (let col = 0; col < TABLE_FORMAT.length; col++) {
            for (let row = TABLE_FORMAT[col] - 1; row >= 0; row--) {
                if (!this.tableData[col][row]) continue;
                const numberTile = this.tableData[col][row];

                let nextRow = row;
                while (this.tableData[col][nextRow + 1] === null) {
                    nextRow++;
                }

                this.tableData[col][row] = null;
                this.tableData[col][nextRow] = numberTile;

                const newPos = getPosition(col, nextRow);
                promises.push(moveNumberToPos(numberTile, newPos));
            }
        }

        return promises;
    }

    moveUp() {
        let promises = [];

        for (let col = 0; col < TABLE_FORMAT.length; col++) {
            for (let row = 0; row < TABLE_FORMAT[col]; row++) {
                if (!this.tableData[col][row]) continue;
                const numberTile = this.tableData[col][row];

                let nextRow = row;
                while (this.tableData[col][nextRow - 1] === null) {
                    nextRow--;
                }

                this.tableData[col][row] = null;
                this.tableData[col][nextRow] = numberTile;

                const newPos = getPosition(col, nextRow);
                promises.push(moveNumberToPos(numberTile, newPos));
            }
        }

        return promises;
    }

    moveRight() {
        let promises = [];

        for (let row = 0; row < TABLE_FORMAT[0]; row++) {
            for (let col = TABLE_FORMAT.length; col >= 0; col--) {
                if (!this.tableData[col] || !this.tableData[col][row]) continue;
                const numberTile = this.tableData[col][row];

                let nextCol = col;
                while (this.tableData[nextCol + 1] && this.tableData[nextCol + 1][row] === null) {
                    nextCol++;
                }

                this.tableData[col][row] = null;
                this.tableData[nextCol][row] = numberTile;

                const newPos = getPosition(nextCol, row);
                promises.push(moveNumberToPos(numberTile, newPos));
            }
        }

        return promises;
    }

    moveLeft() {
        let promises = [];

        for (let row = 0; row < TABLE_FORMAT[0]; row++) {
            for (let col = 0; col < TABLE_FORMAT.length; col++) {
                if (!this.tableData[col] || !this.tableData[col][row]) continue;
                const numberTile = this.tableData[col][row];

                let nextCol = col;
                while (this.tableData[nextCol - 1] && this.tableData[nextCol - 1][row] === null) {
                    nextCol--;
                }

                this.tableData[col][row] = null;
                this.tableData[nextCol][row] = numberTile;

                const newPos = getPosition(nextCol, row);
                promises.push(moveNumberToPos(numberTile, newPos));
            }
        }

        return promises;
    }
}


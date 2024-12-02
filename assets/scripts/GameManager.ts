import { _decorator, Component, EventKeyboard, Input, input, instantiate, KeyCode, Label, Node, Prefab, tween, Vec2, Vec3 } from 'cc';
import { NumberTileManager } from './NumberTileManager';
const { ccclass, property } = _decorator;

const TABLE_WIDTH = 512, TABLE_HEIGHT = 512;
const TABLE_FORMAT = [4, 4, 4, 4];
const ROW_SIZE = TABLE_HEIGHT / TABLE_FORMAT.length;
const COL_SIZE = TABLE_WIDTH / TABLE_FORMAT[0];
const MAX_TILES = TABLE_FORMAT.length * TABLE_FORMAT[0];
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

function canAddUp(nextNumberTile, numberTile) {
    return nextNumberTile && nextNumberTile.canAdd && nextNumberTile !== numberTile && nextNumberTile.value == numberTile.value;
}

@ccclass('GameManager')
export class GameManager extends Component {

    @property(Node) table: Node;
    @property(Prefab) numberTilePrefab: Prefab;

    @property(Label) highscoreLabel: Label;
    @property(Label) scoreLabel: Label;

    @property(Node) losePopup: Node;

    tableData: any[][];
    canMove: boolean = true;
    currentScore: Number = 0;

    protected onLoad(): void {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        this.tableData = new Array(TABLE_FORMAT.length).fill([]).map((_, index) => new Array(TABLE_FORMAT[index]).fill(null));
    }

    start() {
        this.spawnRandomTile();
        this.spawnRandomTile();
        // this.testLoseCondition();

        this.losePopup.emit("SHOW_LOSE_POPUP", 5000);
    }

    testLoseCondition() {
        let value = 2;
        for (let col = 0; col < TABLE_FORMAT.length; col++) {
            for (let row = 0; row < TABLE_FORMAT[col]; row++) {
                this.spawnRandomTile({ randomCol: col, randomRow: row, value });
                value *= 2;
            }
        }
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
                    this.spawnRandomTile();
                    this.updateScore();
                    if (this.isLost()) {
                        this.losePopup.emit("SHOW_LOSE_POPUP", this.currentScore);
                    } else {

                    }
                });

        } else if (this.isLost()) {
            console.log("You lose");
            this.canMove = false;
            this.losePopup.emit("SHOW_LOSE_POPUP", this.currentScore);
        }
    }

    updateScore() {
        this.currentScore = globalThis._.flatten(this.tableData).reduce((acc, curr) => {
            if (!curr) return acc;
            return acc + curr.value;
        }, 0);

        this.scoreLabel.string = this.currentScore.toString();
    }

    isLost() {
        let availableMove = 0;
        for (let col = 0; col < TABLE_FORMAT.length; col++) {
            for (let row = 0; row < TABLE_FORMAT[col]; row++) {
                if (!this.tableData[col][row]) continue;

                const currVal = this.tableData[col][row].value;
                // up
                if (this.tableData[col - 1] && this.tableData[col - 1][row] && this.tableData[col - 1][row].value == currVal) {
                    availableMove++;
                }
                // down
                if (this.tableData[col + 1] && this.tableData[col + 1][row] && this.tableData[col + 1][row].value == currVal) {
                    availableMove++;
                }
                // left
                if (this.tableData[col] && this.tableData[col][row - 1] && this.tableData[col][row - 1].value == currVal) {
                    availableMove++;
                }
                // right
                if (this.tableData[col] && this.tableData[col][row + 1] && this.tableData[col][row + 1].value == currVal) {
                    availableMove++;
                }
            }
        }

        const isFullTable = globalThis._.flatten(this.tableData).filter(element => element !== null).length >= MAX_TILES;

        return availableMove == 0 && isFullTable;
    }

    spawnRandomTile(data = null) {
        const numberTile: any = instantiate(this.numberTilePrefab);
        const { randomCol, randomRow, value } = data || this.getRandomColRow();
        const randomPos = getPosition(randomCol, randomRow);
        let randomValue = Math.random() > 0.5 ? 2 : 4;
        // let randomValue = 2;
        if (value) {
            randomValue = value;
        }

        numberTile.setParent(this.table);
        numberTile.setPosition(randomPos);
        numberTile.manager = numberTile.getComponent(NumberTileManager);
        numberTile.value = randomValue;
        numberTile.col = randomCol;
        numberTile.row = randomRow;
        numberTile.canAdd = true;

        numberTile.manager.updateValue(randomValue);
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
                let nextNumberTile = this.tableData[col][nextRow + 1];
                while (nextNumberTile === null || canAddUp(nextNumberTile, numberTile)) {
                    nextRow++;
                    nextNumberTile = this.tableData[col][nextRow + 1];
                }

                nextNumberTile = this.tableData[col][nextRow];
                const isAddUp = canAddUp(nextNumberTile, numberTile);
                const newPos = getPosition(col, nextRow);

                if (isAddUp) {
                    this.tableData[col][row] = null;
                    const newValue = numberTile['value'] * 2;

                    numberTile.setSiblingIndex(0);
                    nextNumberTile.value = newValue;
                    nextNumberTile.canAdd = false;

                    promises.push(
                        moveNumberToPos(numberTile, newPos)
                            .then(() => {
                                nextNumberTile.manager.updateValue(newValue);
                                nextNumberTile.canAdd = true;
                                numberTile.destroy();
                            })
                    );
                } else {
                    this.tableData[col][row] = null;
                    this.tableData[col][nextRow] = numberTile;
                    if (row == nextRow) continue;
                    promises.push(moveNumberToPos(numberTile, newPos));
                }
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
                let nextNumberTile = this.tableData[col][nextRow - 1];
                while (nextNumberTile === null || canAddUp(nextNumberTile, numberTile)) {
                    nextRow--;
                    nextNumberTile = this.tableData[col][nextRow - 1];
                }

                nextNumberTile = this.tableData[col][nextRow];
                const isAddUp = canAddUp(nextNumberTile, numberTile);
                const newPos = getPosition(col, nextRow);

                if (isAddUp) {
                    this.tableData[col][row] = null;
                    const newValue = numberTile['value'] * 2;

                    numberTile.setSiblingIndex(0);
                    nextNumberTile.value = newValue;
                    nextNumberTile.canAdd = false;

                    promises.push(
                        moveNumberToPos(numberTile, newPos)
                            .then(() => {
                                nextNumberTile.manager.updateValue(newValue);
                                nextNumberTile.canAdd = true;
                                numberTile.destroy();
                            })
                    );
                } else {
                    this.tableData[col][row] = null;
                    this.tableData[col][nextRow] = numberTile;
                    if (row == nextRow) continue;
                    promises.push(moveNumberToPos(numberTile, newPos));
                }
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
                let nextNumberTile = this.tableData[nextCol + 1] && this.tableData[nextCol + 1][row];
                while (nextNumberTile === null || canAddUp(nextNumberTile, numberTile)) {
                    nextCol++;
                    nextNumberTile = this.tableData[nextCol + 1] && this.tableData[nextCol + 1][row];
                }

                nextNumberTile = this.tableData[nextCol][row];
                const isAddUp = canAddUp(nextNumberTile, numberTile);
                const newPos = getPosition(nextCol, row);

                if (isAddUp) {
                    this.tableData[col][row] = null;
                    const newValue = numberTile['value'] * 2;
                    nextNumberTile.value = newValue;
                    nextNumberTile.canAdd = false;

                    numberTile.setSiblingIndex(0);
                    promises.push(
                        moveNumberToPos(numberTile, newPos)
                            .then(() => {
                                nextNumberTile.manager.updateValue(newValue);
                                nextNumberTile.canAdd = true;
                                numberTile.destroy();
                            })
                    );
                } else {
                    this.tableData[col][row] = null;
                    this.tableData[nextCol][row] = numberTile;
                    if (col == nextCol) continue;
                    promises.push(moveNumberToPos(numberTile, newPos));
                }
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
                let nextNumberTile = this.tableData[nextCol - 1] && this.tableData[nextCol - 1][row];
                while (nextNumberTile === null || canAddUp(nextNumberTile, numberTile)) {
                    nextCol--;
                    nextNumberTile = this.tableData[nextCol - 1] && this.tableData[nextCol - 1][row];
                }

                nextNumberTile = this.tableData[nextCol][row];
                const isAddUp = canAddUp(nextNumberTile, numberTile);
                const newPos = getPosition(nextCol, row);

                if (isAddUp) {
                    this.tableData[col][row] = null;
                    const newValue = numberTile['value'] * 2;
                    nextNumberTile.value = newValue;
                    nextNumberTile.canAdd = false;

                    numberTile.setSiblingIndex(0);
                    promises.push(
                        moveNumberToPos(numberTile, newPos)
                            .then(() => {
                                nextNumberTile.manager.updateValue(newValue);
                                nextNumberTile.canAdd = true;
                                numberTile.destroy();
                            })
                    );
                } else {
                    this.tableData[col][row] = null;
                    this.tableData[nextCol][row] = numberTile;
                    if (col == nextCol) continue;
                    promises.push(moveNumberToPos(numberTile, newPos));
                }
            }
        }

        return promises;
    }
}


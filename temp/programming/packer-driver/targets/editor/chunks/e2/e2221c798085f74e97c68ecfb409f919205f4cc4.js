System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Input, input, instantiate, KeyCode, Node, Prefab, tween, Vec3, NumberTileManager, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, TABLE_WIDTH, TABLE_HEIGHT, TABLE_FORMAT, ROW_SIZE, COL_SIZE, MOVE_SPEED, GameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function getPosition(col, row) {
    const startX = (-TABLE_FORMAT.length / 2 + 0.5) * COL_SIZE;
    const startY = (TABLE_FORMAT[0] / 2 - 0.5) * ROW_SIZE;
    return new Vec3(startX + COL_SIZE * col, startY - ROW_SIZE * row, 0);
  }

  function _reportPossibleCrUseOfNumberTileManager(extras) {
    _reporterNs.report("NumberTileManager", "./NumberTileManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Input = _cc.Input;
      input = _cc.input;
      instantiate = _cc.instantiate;
      KeyCode = _cc.KeyCode;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      NumberTileManager = _unresolved_2.NumberTileManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "32b6ecKNlxNiKiDHNCAOUQe", "GameManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'EventKeyboard', 'Input', 'input', 'instantiate', 'KeyCode', 'Node', 'Prefab', 'tween', 'Vec2', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);
      TABLE_WIDTH = 512;
      TABLE_HEIGHT = 512;
      TABLE_FORMAT = [4, 4, 4, 4];
      ROW_SIZE = TABLE_HEIGHT / TABLE_FORMAT.length;
      COL_SIZE = TABLE_WIDTH / TABLE_FORMAT[0];
      MOVE_SPEED = 0.1;

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property(Node), _dec3 = property(Prefab), _dec(_class = (_class2 = class GameManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "table", _descriptor, this);

          _initializerDefineProperty(this, "numberTilePrefab", _descriptor2, this);

          this.tableData = void 0;
        }

        start() {
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          this.tableData = new Array(TABLE_FORMAT.length).fill([]).map((_, index) => new Array(TABLE_FORMAT[index]).fill(null));
          this.spawnRandomTile({
            randomCol: 2,
            randomRow: 2
          });
          this.spawnRandomTile({
            randomCol: 1,
            randomRow: 1
          });
          console.table(this.tableData);
        }

        onKeyDown(event) {
          switch (event.keyCode) {
            case KeyCode.SPACE:
              this.moveDown();
              break;

            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:
              this.moveLeft();
              break;

            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
              this.moveRight();
              break;

            case KeyCode.KEY_S:
            case KeyCode.ARROW_DOWN:
              this.moveDown();
              break;

            case KeyCode.KEY_W:
            case KeyCode.ARROW_UP:
              this.moveUp();
              break;
          }
        }

        spawnRandomTile(data) {
          const numberTile = instantiate(this.numberTilePrefab);
          const {
            randomCol,
            randomRow
          } = data || this.getRandomColRow();
          const randomPos = getPosition(randomCol, randomRow);
          const randomValue = Math.random() > 0.5 ? 2 : 4;
          numberTile.setParent(this.table);
          numberTile.setPosition(randomPos);
          numberTile.getComponent(_crd && NumberTileManager === void 0 ? (_reportPossibleCrUseOfNumberTileManager({
            error: Error()
          }), NumberTileManager) : NumberTileManager).updateValue(randomValue);
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

          return {
            randomCol,
            randomRow
          };
        }

        moveDown() {
          let promises = [];

          for (let col = 0; col < TABLE_FORMAT.length; col++) {
            for (let row = 0; row < TABLE_FORMAT[col]; row++) {
              if (!this.tableData[col][row]) continue;
              const numberTile = this.tableData[col][row];
              let nextRow = row;

              while (this.tableData[col][nextRow + 1] === null) {
                nextRow++;
              }

              this.tableData[col][row] = null;
              this.tableData[col][nextRow] = numberTile;
              const newPos = getPosition(col, nextRow);
              promises.push(this.moveNumberToPos(numberTile, newPos));
            }
          }

          return Promise.all(promises).then(() => {
            console.table(this.tableData);
          });
        }

        moveUp() {
          let promises = [];

          for (let col = 0; col < TABLE_FORMAT.length; col++) {
            for (let row = TABLE_FORMAT[col] - 1; row >= 0; row--) {
              if (!this.tableData[col][row]) continue;
              const numberTile = this.tableData[col][row];
              let nextRow = row;

              while (this.tableData[col][nextRow - 1] === null) {
                nextRow--;
              }

              this.tableData[col][row] = null;
              this.tableData[col][nextRow] = numberTile;
              const newPos = getPosition(col, nextRow);
              promises.push(this.moveNumberToPos(numberTile, newPos));
            }
          }

          return Promise.all(promises).then(() => {
            console.table(this.tableData);
          });
        }

        moveRight() {
          let promises = [];

          for (let row = 0; row < TABLE_FORMAT[0]; row++) {
            for (let col = 0; col < TABLE_FORMAT.length; col++) {
              if (!this.tableData[col] || !this.tableData[col][row]) continue;
              const numberTile = this.tableData[col][row];
              let nextCol = col;

              while (this.tableData[nextCol + 1] && this.tableData[nextCol + 1][row] === null) {
                nextCol++;
              }

              this.tableData[col][row] = null;
              this.tableData[nextCol][row] = numberTile;
              const newPos = getPosition(nextCol, row);
              promises.push(this.moveNumberToPos(numberTile, newPos));
            }
          }

          return Promise.all(promises).then(() => {
            console.table(this.tableData);
          });
        }

        moveLeft() {
          let promises = [];

          for (let row = 0; row < TABLE_FORMAT[0]; row++) {
            for (let col = TABLE_FORMAT.length; col >= 0; col--) {
              if (!this.tableData[col] || !this.tableData[col][row]) continue;
              const numberTile = this.tableData[col][row];
              let nextCol = col;

              while (this.tableData[nextCol - 1] && this.tableData[nextCol - 1][row] === null) {
                nextCol--;
              }

              this.tableData[col][row] = null;
              this.tableData[nextCol][row] = numberTile;
              const newPos = getPosition(nextCol, row);
              promises.push(this.moveNumberToPos(numberTile, newPos));
            }
          }

          return Promise.all(promises).then(() => {
            console.table(this.tableData);
          });
        }

        moveNumberToPos(numberTile, newPos) {
          return new Promise((resolve, _) => {
            numberTile['moveTween'] = tween(numberTile).to(MOVE_SPEED * 2, {
              position: newPos
            }).call(() => {
              numberTile['moveTween'] = null;
              resolve(numberTile);
            }).start();
          });
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "table", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "numberTilePrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e2221c798085f74e97c68ecfb409f919205f4cc4.js.map
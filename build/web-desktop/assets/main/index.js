System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Canvas, UITransform, instantiate, Label, Color, RichText, Toggle, Button, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      Color = module.Color;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugViewRuntimeControl, _Component);

        function DebugViewRuntimeControl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "compositeModeToggle", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "singleModeToggle", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "EnableAllCompositeModeButton", _descriptor3, _assertThisInitialized(_this));

          _this._single = 0;
          _this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct Internal Specular', 'Env Internal Specular', 'Internal All', 'Fog'];
          _this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'Internal Specular', 'TT'];
          _this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          _this.compositeModeToggleList = [];
          _this.singleModeToggleList = [];
          _this.miscModeToggleList = [];
          _this.textComponentList = [];
          _this.labelComponentList = [];
          _this.textContentList = [];
          _this.hideButtonLabel = void 0;
          _this._currentColorIndex = 0;
          _this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          _this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
          return _this;
        }

        var _proto = DebugViewRuntimeControl.prototype;

        _proto.start = function start() {
          // get canvas resolution
          var canvas = this.node.parent.getComponent(Canvas);

          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }

          var uiTransform = this.node.parent.getComponent(UITransform);
          var halfScreenWidth = uiTransform.width * 0.5;
          var halfScreenHeight = uiTransform.height * 0.5;
          var x = -halfScreenWidth + halfScreenWidth * 0.1,
              y = halfScreenHeight - halfScreenHeight * 0.1;
          var width = 200,
              height = 20; // new nodes

          var miscNode = this.node.getChildByName('MiscMode');
          var buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          var titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles'; // title

          for (var i = 0; i < 2; i++) {
            var newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;

            var _labelComponent = newLabel.getComponent(Label);

            _labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            _labelComponent.color = Color.WHITE;
            _labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = _labelComponent;
          }

          y -= height; // single

          var currentRow = 0;

          for (var _i = 0; _i < this.strSingle.length; _i++, currentRow++) {
            if (_i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }

            var newNode = _i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            var textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[_i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[_i] = newNode;
          }

          x += width; // buttons

          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          var labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent; // misc

          y -= 40;

          for (var _i2 = 0; _i2 < this.strMisc.length; _i2++) {
            var _newNode = instantiate(this.compositeModeToggle);

            _newNode.setPosition(x, y - height * _i2, 0.0);

            _newNode.setScale(0.5, 0.5, 0.5);

            _newNode.parent = miscNode;

            var _textComponent = _newNode.getComponentInChildren(RichText);

            _textComponent.string = this.strMisc[_i2];
            this.textComponentList[this.textComponentList.length] = _textComponent;
            this.textContentList[this.textContentList.length] = _textComponent.string;

            var toggleComponent = _newNode.getComponent(Toggle);

            toggleComponent.isChecked = _i2 ? true : false;

            _newNode.on(Toggle.EventType.TOGGLE, _i2 ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);

            this.miscModeToggleList[_i2] = _newNode;
          } // composite


          y -= 150;

          for (var _i3 = 0; _i3 < this.strComposite.length; _i3++) {
            var _newNode2 = _i3 ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;

            _newNode2.setPosition(x, y - height * _i3, 0.0);

            _newNode2.setScale(0.5, 0.5, 0.5);

            _newNode2.parent = this.compositeModeToggle.parent;

            var _textComponent2 = _newNode2.getComponentInChildren(RichText);

            _textComponent2.string = this.strComposite[_i3];
            this.textComponentList[this.textComponentList.length] = _textComponent2;
            this.textContentList[this.textContentList.length] = _textComponent2.string;

            _newNode2.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);

            this.compositeModeToggleList[_i3] = _newNode2;
          }
        };

        _proto.isTextMatched = function isTextMatched(textUI, textDescription) {
          var tempText = new String(textUI);
          var findIndex = tempText.search('>');

          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        };

        _proto.toggleSingleMode = function toggleSingleMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        };

        _proto.toggleCompositeMode = function toggleCompositeMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        };

        _proto.toggleLightingWithAlbedo = function toggleLightingWithAlbedo(toggle) {
          var debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        };

        _proto.toggleCSMColoration = function toggleCSMColoration(toggle) {
          var debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        };

        _proto.enableAllCompositeMode = function enableAllCompositeMode(button) {
          var debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);

          for (var i = 0; i < this.compositeModeToggleList.length; i++) {
            var _toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);

            _toggleComponent.isChecked = true;
          }

          var toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        };

        _proto.hideUI = function hideUI(button) {
          var titleNode = this.node.getChildByName('Titles');
          var activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        };

        _proto.changeTextColor = function changeTextColor(button) {
          this._currentColorIndex++;

          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }

          for (var i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }

          for (var _i4 = 0; _i4 < this.labelComponentList.length; _i4++) {
            this.labelComponentList[_i4].color = this.color[this._currentColorIndex];
          }
        };

        _proto.onLoad = function onLoad() {};

        _proto.update = function update(deltaTime) {};

        return DebugViewRuntimeControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DebugNodeInfo.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Label, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "c31ee8kJEpLEqzAIKNdGYAK", "DebugNodeInfo", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DebugNodeInfo = exports('DebugNodeInfo', (_dec = ccclass('DebugNodeInfo'), _dec2 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugNodeInfo, _Component);

        function DebugNodeInfo() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "targetNode", _descriptor, _assertThisInitialized(_this));

          _this._label = void 0;
          return _this;
        }

        var _proto = DebugNodeInfo.prototype;

        _proto.start = function start() {
          this._label = this.node.getComponent(Label);
        };

        _proto.update = function update(dt) {
          if (!this.targetNode) {
            this._label.string = "No target !";
            return;
          }

          if (this._label) {
            this._label.string = "Node position:\nx: " + Math.floor(this.targetNode.getPosition().x) + ", y: " + Math.floor(this.targetNode.getPosition().y);
          }
        };

        return DebugNodeInfo;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "targetNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DragAndDrop.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, v3, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      v3 = module.v3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "0d8e92ddQJEb7WseFfSU/iV", "DragAndDrop", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DragAndDrop = exports('DragAndDrop', (_dec = ccclass('DragAndDrop'), _dec2 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DragAndDrop, _Component);

        function DragAndDrop() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "target", _descriptor, _assertThisInitialized(_this));

          _this._isDragging = void 0;
          return _this;
        }

        var _proto = DragAndDrop.prototype;

        _proto.start = function start() {
          this.node.on(Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
          this.node.on(Node.EventType.MOUSE_UP, this.onMouseUp, this);
          this.node.on(Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
        };

        _proto.onMouseDown = function onMouseDown(event) {
          this._isDragging = true;
          this.setPositionTarget(event.getLocation());
        };

        _proto.onMouseMove = function onMouseMove(event) {
          if (this._isDragging) {
            this.setPositionTarget(event.getLocation());
          }
        };

        _proto.onMouseUp = function onMouseUp(event) {
          this._isDragging = false;
        };

        _proto.setPositionTarget = function setPositionTarget(worldPos) {
          var mouseWorldPos = v3(worldPos.x, worldPos.y, 0);
          this.target.setWorldPosition(mouseWorldPos);
        };

        return DragAndDrop;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './NumberTileManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Prefab, Label, input, Input, NodePool, instantiate, KeyCode, Vec3, tween, v3, Component, NumberTileManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Prefab = module.Prefab;
      Label = module.Label;
      input = module.input;
      Input = module.Input;
      NodePool = module.NodePool;
      instantiate = module.instantiate;
      KeyCode = module.KeyCode;
      Vec3 = module.Vec3;
      tween = module.tween;
      v3 = module.v3;
      Component = module.Component;
    }, function (module) {
      NumberTileManager = module.NumberTileManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _class3;

      cclegacy._RF.push({}, "32b6ecKNlxNiKiDHNCAOUQe", "GameManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var TABLE_WIDTH = 512,
          TABLE_HEIGHT = 512;
      var TABLE_FORMAT = [4, 4, 4, 4];
      var ROW_SIZE = TABLE_HEIGHT / TABLE_FORMAT.length;
      var COL_SIZE = TABLE_WIDTH / TABLE_FORMAT[0];
      var MAX_TILES = TABLE_FORMAT.length * TABLE_FORMAT[0];
      var MOVE_SPEED = 0.1;

      function getPosition(col, row) {
        var startX = (-TABLE_FORMAT.length / 2 + 0.5) * COL_SIZE;
        var startY = (TABLE_FORMAT[0] / 2 - 0.5) * ROW_SIZE;
        return new Vec3(startX + COL_SIZE * col, startY - ROW_SIZE * row, 0);
      }

      function moveNumberToPos(numberTile, newPos) {
        return new Promise(function (resolve, _) {
          numberTile['moveTween'] = tween(numberTile).to(MOVE_SPEED * 2, {
            position: newPos
          }).call(function () {
            numberTile['moveTween'] = null;
            resolve(numberTile);
          }).start();
        });
      }

      function canAddUp(nextNumberTile, numberTile) {
        return nextNumberTile && nextNumberTile.canAdd && nextNumberTile !== numberTile && nextNumberTile.value == numberTile.value;
      }

      function shaking(node, _ref) {
        var _ref$duration = _ref.duration,
            duration = _ref$duration === void 0 ? 0.16 : _ref$duration,
            _ref$distance = _ref.distance,
            distance = _ref$distance === void 0 ? 10 : _ref$distance,
            _ref$repeat = _ref.repeat,
            repeat = _ref$repeat === void 0 ? 1 : _ref$repeat;
        if (!node["originalPos"]) node["originalPos"] = node.getPosition();
        var dur = duration / 8;
        var shake = tween().by(dur, {
          position: v3(0, distance)
        }).by(dur, {
          position: v3(0, -distance)
        }).by(dur, {
          position: v3(0, -distance)
        }).by(dur, {
          position: v3(0, distance)
        }).by(dur, {
          position: v3(distance, 0)
        }).by(dur, {
          position: v3(-distance, 0)
        }).by(dur, {
          position: v3(-distance, 0)
        }).by(dur, {
          position: v3(distance, 0)
        }).call(function () {
          node.setPosition(node["originalPos"]);
          node["tweenShake"] = null;
        });
        var tweenShake = tween(node).repeat(repeat, shake);

        if (node["tweenShake"]) {
          node["tweenShake"].stop();
          node.setPosition(node["originalPos"]);
        }

        node["tweenShake"] = tweenShake;
        node["tweenShake"].start();
        return tweenShake;
      }

      var GameManager = exports('GameManager', (_dec = ccclass('GameManager'), _dec2 = property(Node), _dec3 = property(Prefab), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(Node), _dec7 = property(Node), _dec8 = property(Node), _dec9 = property(Node), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameManager, _Component);

        function GameManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "table", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "numberTilePrefab", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "highscoreLabel", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "scoreLabel", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "losePopup", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "winPopup", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "menuPopup", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "levelManager", _descriptor8, _assertThisInitialized(_this));

          _this.tableData = void 0;
          _this.canMove = true;
          _this.currentScore = 0;
          _this.isPlaying = false;
          _this.pool = void 0;
          _this.currentHighestValue = 64;
          _this.currentRandomLevel = 0;
          _this.isShowingPopup = void 0;
          return _this;
        }

        var _proto = GameManager.prototype;

        _proto.onLoad = function onLoad() {
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          this.tableData = new Array(TABLE_FORMAT.length).fill([]).map(function (_, index) {
            return new Array(TABLE_FORMAT[index]).fill(null);
          });
          this.pool = new NodePool();

          for (var i = 0; i < 16; i++) {
            var numberTile = instantiate(this.numberTilePrefab);
            this.pool.put(numberTile);
          }
        };

        _proto.start = function start() {
          // this.gameStart();
          // this.testLoseCondition();
          // this.testWinCondition();
          GameManager.instance = this;
        };

        _proto.testWinCondition = function testWinCondition() {
          this.isPlaying = true;
          this.spawnRandomTile({
            value: 2048
          });
        };

        _proto.testLoseCondition = function testLoseCondition() {
          this.isPlaying = true;
          var value = 2;

          for (var col = 0; col < TABLE_FORMAT.length; col++) {
            for (var row = 0; row < TABLE_FORMAT[col]; row++) {
              this.spawnRandomTile({
                randomCol: col,
                randomRow: row,
                value: value
              });
              value *= 2;
            }
          }

          this.updateScore();
        };

        _proto.onKeyDown = function onKeyDown(event) {
          var _this2 = this;

          if (!this.canMove || this.isShowingPopup) return;
          var allPromises;

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
            Promise.all(allPromises).then(function () {
              _this2.spawnRandomTile();

              _this2.updateScore();

              if (_this2.isWin()) {
                _this2.winPopup.emit("SHOW_POPUP", _this2.currentScore);

                _this2.isPlaying = true;
              } else if (_this2.isLost()) {
                _this2.losePopup.emit("SHOW_POPUP", _this2.currentScore);

                _this2.isPlaying = true;
              } else {
                _this2.canMove = true;
              }
            });
          } else if (this.isLost()) {
            console.log("You lose");
            this.canMove = false;
            this.isPlaying = true;
            this.losePopup.emit("SHOW_POPUP", this.currentScore);
          } else {
            // nothing move, shake the table to let user know
            shaking(this.node, {});
          }
        };

        _proto.updateScore = function updateScore() {
          this.currentScore = globalThis._.flatten(this.tableData).reduce(function (acc, curr) {
            if (!curr) return acc;
            return acc + curr.value;
          }, 0);
          this.scoreLabel.string = this.currentScore.toString();
        };

        _proto.isWin = function isWin() {
          return globalThis._.flatten(this.tableData).findIndex(function (numberTile) {
            return numberTile && numberTile.value === 2048;
          }) > -1;
        };

        _proto.isLost = function isLost() {
          var isFullTable = globalThis._.flatten(this.tableData).filter(function (element) {
            return element !== null;
          }).length >= MAX_TILES;
          if (!isFullTable) return;
          var availableMove = 0;

          for (var col = 0; col < TABLE_FORMAT.length; col++) {
            for (var row = 0; row < TABLE_FORMAT[col]; row++) {
              if (!this.tableData[col][row]) continue;
              var currVal = this.tableData[col][row].value; // up

              if (this.tableData[col - 1] && this.tableData[col - 1][row] && this.tableData[col - 1][row].value == currVal) {
                availableMove++;
              } // down


              if (this.tableData[col + 1] && this.tableData[col + 1][row] && this.tableData[col + 1][row].value == currVal) {
                availableMove++;
              } // left


              if (this.tableData[col] && this.tableData[col][row - 1] && this.tableData[col][row - 1].value == currVal) {
                availableMove++;
              } // right


              if (this.tableData[col] && this.tableData[col][row + 1] && this.tableData[col][row + 1].value == currVal) {
                availableMove++;
              }
            }
          }

          return availableMove == 0;
        };

        _proto.getNumberTile = function getNumberTile() {
          if (this.pool.size() > 0) {
            return this.pool.get();
          } else {
            return instantiate(this.numberTilePrefab);
          }
        };

        _proto.removeNumberTile = function removeNumberTile(node) {
          node.setParent(null);
          this.pool.put(node);
        };

        _proto.spawnRandomTile = function spawnRandomTile(data) {
          if (data === void 0) {
            data = null;
          }

          var numberTile = this.getNumberTile();

          var _Object$assign = Object.assign({}, this.getRandomColRow(), data),
              randomCol = _Object$assign.randomCol,
              randomRow = _Object$assign.randomRow,
              value = _Object$assign.value;

          var randomPos = getPosition(randomCol, randomRow);
          var randomPool = [2, 4].concat([8, 16, 32, 64].slice(0, this.currentRandomLevel));
          var randomValue = randomPool[Math.floor(randomPool.length * Math.random())]; // let randomValue = 2;

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
        };

        _proto.getRandomColRow = function getRandomColRow() {
          var randomCol = Math.floor(TABLE_FORMAT.length * Math.random());
          var randomRow = Math.floor(TABLE_FORMAT[0] * Math.random());

          while (this.tableData[randomCol][randomRow] !== null) {
            randomCol = Math.floor(TABLE_FORMAT.length * Math.random());
            randomRow = Math.floor(TABLE_FORMAT[0] * Math.random());
          }

          return {
            randomCol: randomCol,
            randomRow: randomRow
          };
        };

        _proto.addUpTile = function addUpTile(nextNumberTile, numberTile, newPos) {
          var _this3 = this;

          var newValue = numberTile['value'] * 2;

          if (newValue > this.currentHighestValue) {
            this.currentHighestValue = newValue;
            this.levelManager.emit("UPDATE_LEVEL", this.currentRandomLevel);
            this.currentRandomLevel++;
          }

          nextNumberTile.value = newValue;
          nextNumberTile.canAdd = false;
          return moveNumberToPos(numberTile, newPos).then(function () {
            nextNumberTile.manager.updateValue(newValue);
            nextNumberTile.canAdd = true;

            _this3.removeNumberTile(numberTile);
          });
        };

        _proto.moveDown = function moveDown() {
          var promises = [];

          for (var col = 0; col < TABLE_FORMAT.length; col++) {
            for (var row = TABLE_FORMAT[col] - 1; row >= 0; row--) {
              if (!this.tableData[col][row]) continue;
              var numberTile = this.tableData[col][row];
              var nextRow = row;
              var nextNumberTile = this.tableData[col][nextRow + 1];

              while (nextNumberTile === null || canAddUp(nextNumberTile, numberTile)) {
                nextRow++;
                nextNumberTile = this.tableData[col][nextRow + 1];
              }

              nextNumberTile = this.tableData[col][nextRow];
              this.tableData[col][row] = null;
              var isAddUp = canAddUp(nextNumberTile, numberTile);
              var newPos = getPosition(col, nextRow);

              if (isAddUp) {
                promises.push(this.addUpTile(nextNumberTile, numberTile, newPos));
              } else {
                this.tableData[col][nextRow] = numberTile;
                if (row == nextRow) continue;
                promises.push(moveNumberToPos(numberTile, newPos));
              }
            }
          }

          return promises;
        };

        _proto.moveUp = function moveUp() {
          var promises = [];

          for (var col = 0; col < TABLE_FORMAT.length; col++) {
            for (var row = 0; row < TABLE_FORMAT[col]; row++) {
              if (!this.tableData[col][row]) continue;
              var numberTile = this.tableData[col][row];
              var nextRow = row;
              var nextNumberTile = this.tableData[col][nextRow - 1];

              while (nextNumberTile === null || canAddUp(nextNumberTile, numberTile)) {
                nextRow--;
                nextNumberTile = this.tableData[col][nextRow - 1];
              }

              nextNumberTile = this.tableData[col][nextRow];
              this.tableData[col][row] = null;
              var isAddUp = canAddUp(nextNumberTile, numberTile);
              var newPos = getPosition(col, nextRow);

              if (isAddUp) {
                promises.push(this.addUpTile(nextNumberTile, numberTile, newPos));
              } else {
                this.tableData[col][nextRow] = numberTile;
                if (row == nextRow) continue;
                promises.push(moveNumberToPos(numberTile, newPos));
              }
            }
          }

          return promises;
        };

        _proto.moveRight = function moveRight() {
          var promises = [];

          for (var row = 0; row < TABLE_FORMAT[0]; row++) {
            for (var col = TABLE_FORMAT.length; col >= 0; col--) {
              if (!this.tableData[col] || !this.tableData[col][row]) continue;
              var numberTile = this.tableData[col][row];
              var nextCol = col;
              var nextNumberTile = this.tableData[nextCol + 1] && this.tableData[nextCol + 1][row];

              while (nextNumberTile === null || canAddUp(nextNumberTile, numberTile)) {
                nextCol++;
                nextNumberTile = this.tableData[nextCol + 1] && this.tableData[nextCol + 1][row];
              }

              nextNumberTile = this.tableData[nextCol][row];
              this.tableData[col][row] = null;
              var isAddUp = canAddUp(nextNumberTile, numberTile);
              var newPos = getPosition(nextCol, row);

              if (isAddUp) {
                promises.push(this.addUpTile(nextNumberTile, numberTile, newPos));
              } else {
                this.tableData[nextCol][row] = numberTile;
                if (col == nextCol) continue;
                promises.push(moveNumberToPos(numberTile, newPos));
              }
            }
          }

          return promises;
        };

        _proto.moveLeft = function moveLeft() {
          var promises = [];

          for (var row = 0; row < TABLE_FORMAT[0]; row++) {
            for (var col = 0; col < TABLE_FORMAT.length; col++) {
              if (!this.tableData[col] || !this.tableData[col][row]) continue;
              var numberTile = this.tableData[col][row];
              var nextCol = col;
              var nextNumberTile = this.tableData[nextCol - 1] && this.tableData[nextCol - 1][row];

              while (nextNumberTile === null || canAddUp(nextNumberTile, numberTile)) {
                nextCol--;
                nextNumberTile = this.tableData[nextCol - 1] && this.tableData[nextCol - 1][row];
              }

              nextNumberTile = this.tableData[nextCol][row];
              this.tableData[col][row] = null;
              var isAddUp = canAddUp(nextNumberTile, numberTile);
              var newPos = getPosition(nextCol, row);

              if (isAddUp) {
                promises.push(this.addUpTile(nextNumberTile, numberTile, newPos));
              } else {
                this.tableData[nextCol][row] = numberTile;
                if (col == nextCol) continue;
                promises.push(moveNumberToPos(numberTile, newPos));
              }
            }
          }

          return promises;
        };

        _proto.gameReset = function gameReset() {
          this.tableData = new Array(TABLE_FORMAT.length).fill([]).map(function (_, index) {
            return new Array(TABLE_FORMAT[index]).fill(null);
          });
          this.currentScore = 0;
          this.scoreLabel.string = "0";
          this.canMove = true;
          this.isPlaying = false;
          this.table.removeAllChildren();
          this.winPopup.emit("HIDE_POPUP");
          this.losePopup.emit("HIDE_POPUP");
          this.levelManager.emit("RESET_LEVEL");
        };

        _proto.onRetryGame = function onRetryGame() {
          this.gameReset();
          this.gameStart();
        };

        _proto.onMenuClick = function onMenuClick() {
          this.gameReset();
          this.menuPopup.emit("SHOW_POPUP");
        };

        _proto.gameStart = function gameStart() {
          if (this.isPlaying) return; // this.spawnRandomTile({ randomCol: 1, randomRow: 1, value: 64 });
          // this.spawnRandomTile({ randomCol: 1, randomRow: 2, value: 64 });

          this.isPlaying = true;
          this.spawnRandomTile();
          this.spawnRandomTile();
          this.updateScore();
        };

        return GameManager;
      }(Component), _class3.instance = void 0, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "table", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "numberTilePrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "highscoreLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "scoreLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "losePopup", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "winPopup", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "menuPopup", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "levelManager", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HighscorePopup.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './HighscoreStorage.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Prefab, sys, instantiate, Label, UIOpacity, BlockInputEvents, tween, Component, STORAGE_KEY;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Prefab = module.Prefab;
      sys = module.sys;
      instantiate = module.instantiate;
      Label = module.Label;
      UIOpacity = module.UIOpacity;
      BlockInputEvents = module.BlockInputEvents;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      STORAGE_KEY = module.STORAGE_KEY;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "4e4ccTCT91H/7r9N5SIwmvV", "HighscorePopup", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var HighscorePopup = exports('HighscorePopup', (_dec = ccclass('HighscorePopup'), _dec2 = property(Node), _dec3 = property(Prefab), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(HighscorePopup, _Component);

        function HighscorePopup() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "dataTable", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "dataCell", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = HighscorePopup.prototype;

        _proto.start = function start() {
          this.node.on("SHOW_POPUP", this.showPopup, this);
          this.node.on("HIDE_POPUP", this.hidePopup, this);
        };

        _proto.showPopup = function showPopup() {
          var _this2 = this;

          var highscoreData = JSON.parse(sys.localStorage.getItem(STORAGE_KEY)) || []; // let highscoreData = [{ name: "kakalak", score: 100000 }, { name: "hihi", score: 5000 }, { name: "haha", score: 20000 }];

          highscoreData.sort(function (a, b) {
            return b.score - a.score;
          });
          highscoreData = highscoreData.slice(0, 6);
          this.dataTable.removeAllChildren();
          highscoreData.forEach(function (data) {
            var dataCell = instantiate(_this2.dataCell);
            dataCell.setParent(_this2.dataTable);
            dataCell.getComponentsInChildren(Label).forEach(function (label, index) {
              if (index == 0) {
                label.string = data.name;
              } else {
                label.string = data.score;
              }
            });
          });
          this.node.getComponent(UIOpacity).opacity = 0;
          this.node.getComponentInChildren(BlockInputEvents).enabled = true;
          tween(this.node.getComponent(UIOpacity)).to(0.5, {
            opacity: 255
          }).start();
        };

        _proto.hidePopup = function hidePopup() {
          var _this3 = this;

          tween(this.node.getComponent(UIOpacity)).to(0.5, {
            opacity: 0
          }).call(function () {
            _this3.node.getComponentInChildren(BlockInputEvents).enabled = false;
          }).start();
        };

        return HighscorePopup;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "dataTable", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "dataCell", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HighscoreStorage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, EditBox, Button, sys, Component, GameManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      EditBox = module.EditBox;
      Button = module.Button;
      sys = module.sys;
      Component = module.Component;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "587b5dYHlxDcqQaA78aW/qh", "HighscoreStorage", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var STORAGE_KEY = exports('STORAGE_KEY', "highscoreData");
      var HighscoreStorage = exports('HighscoreStorage', (_dec = ccclass('HighscoreStorage'), _dec2 = property(EditBox), _dec3 = property(Button), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(HighscoreStorage, _Component);

        function HighscoreStorage() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "playerName", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "submitButton", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = HighscoreStorage.prototype;

        _proto.start = function start() {
          this.submitButton.interactable = false;
        };

        _proto.onEditEnd = function onEditEnd() {
          if (!this.playerName.string) {
            this.submitButton.interactable = false;
          } else {
            this.submitButton.interactable = true;
          }
        };

        _proto.submitScore = function submitScore() {
          var _GameManager$instance,
              _GameManager$instance2,
              _this2 = this;

          var highscoreData = JSON.parse(sys.localStorage.getItem(STORAGE_KEY)) || [];
          var userData = {
            name: this.playerName.string,
            score: (_GameManager$instance = GameManager == null || (_GameManager$instance2 = GameManager.instance) == null ? void 0 : _GameManager$instance2.currentScore) != null ? _GameManager$instance : 0
          };

          if (highscoreData.find(function (data) {
            return _this2.playerName.string == data.name;
          })) {
            var _GameManager$instance3, _GameManager$instance4;

            highscoreData.find(function (data) {
              return _this2.playerName.string == data.name;
            }).score = (_GameManager$instance3 = GameManager == null || (_GameManager$instance4 = GameManager.instance) == null ? void 0 : _GameManager$instance4.currentScore) != null ? _GameManager$instance3 : 0;
          } else {
            highscoreData.push(userData);
          }

          sys.localStorage.setItem(STORAGE_KEY, JSON.stringify(highscoreData));
          console.log(sys.localStorage);
        };

        return HighscoreStorage;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playerName", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "submitButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LevelManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, BlockInputEvents, UIOpacity, v2, tween, Animation, bezier, Vec3, Component, GameManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      BlockInputEvents = module.BlockInputEvents;
      UIOpacity = module.UIOpacity;
      v2 = module.v2;
      tween = module.tween;
      Animation = module.Animation;
      bezier = module.bezier;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "e0222Z/QrxHEb0Jv/fTkOzg", "LevelManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;

      function tweenBezier2DTo(target, duration, c1, c2, to, opts) {
        if (target['bezierX']) target['bezierX'].stop();
        if (target['bezierY']) target['bezierY'].stop();
        var c0x = c1.x,
            c0y = c1.y,
            c1x = c2.x,
            c1y = c2.y;
        var _targetX = {
          value: target.getPosition().x
        };
        var _targetY = {
          value: target.getPosition().y
        };
        var aOpts = opts || Object.create(null);

        aOpts.progress = function (startX, endX, currentX, t) {
          currentX = bezier(startX, c0x, c1x, endX, t);
          return currentX;
        };

        aOpts.onUpdate = function () {
          if (target && target.position) {
            target.setPosition(new Vec3(_targetX.value, target.position.y, target.position.z));
          }
        };

        var bOpts = opts || Object.create(null);

        bOpts.progress = function (startY, endY, currentY, t) {
          currentY = bezier(startY, c0y, c1y, endY, t);
          return currentY;
        };

        bOpts.onUpdate = function () {
          if (target && target.position) {
            target.setPosition(new Vec3(target.position.x, _targetY.value, target.position.z));
          }
        };

        target['bezierX'] = tween(_targetX).to(duration, {
          value: to.x
        }, aOpts).call(function () {
          target['bezierX'] = null;
        }).start();
        target['bezierY'] = tween(_targetY).to(duration, {
          value: to.y
        }, bOpts).call(function () {
          target['bezierY'] = null;
        }).start();
      }

      var LevelManager = exports('LevelManager', (_dec = ccclass('LevelManager'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LevelManager, _Component);

        function LevelManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "gradient", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "content", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "levelUI", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = LevelManager.prototype;

        _proto.start = function start() {
          this.node.on("UPDATE_LEVEL", this.updateLevel, this);
          this.node.on("RESET_LEVEL", this.resetLevel, this); // this.showAnimationLevelUp(this.levelUI.children[2]);
        };

        _proto.resetLevel = function resetLevel() {
          this.levelUI.children.forEach(function (node) {
            node.active = false;
          });
        };

        _proto.updateLevel = function updateLevel(levelIndex) {
          levelIndex = Math.min(levelIndex, this.levelUI.children.length - 1);

          if (!this.levelUI.children[levelIndex].active) {
            return this.showAnimationLevelUp(this.levelUI.children[levelIndex]);
          }

          this.levelUI.children.forEach(function (node, index) {
            if (index > levelIndex) {
              node.active = false;
            } else {
              node.active = true;
            }
          });
        };

        _proto.showAnimationLevelUp = function showAnimationLevelUp(levelTile) {
          var _this2 = this;

          GameManager.instance.isShowingPopup = true;
          this.gradient.getComponent(BlockInputEvents).enabled = true;
          this.gradient.getComponent(UIOpacity).opacity = 0;
          this.content.getComponent(UIOpacity).opacity = 0;
          levelTile.active = true;
          levelTile.getComponent(UIOpacity).opacity = 0;
          var originalPos = levelTile.getPosition();
          levelTile.setPosition(v2(0, 0));
          var point1 = v2(originalPos.x / 3 * 1, 75);
          var point2 = v2(originalPos.x / 3 * 2, 75);
          var highlightLevelTween = tween(levelTile.getComponent(UIOpacity)).to(0.5, {
            opacity: 255
          }).call(function () {
            levelTile.getComponent(Animation).play("levelUpAnim");
          }).delay(1.2).call(function () {
            levelTile.getComponent(Animation).play("levelUpAnim");
          }).delay(1).call(function () {
            tweenBezier2DTo(levelTile, 0.3, point1, point2, originalPos);
          }).delay(0.3).call(function () {
            levelTile.getComponent(Animation).play("landingAnim");
          });
          tween(this.gradient.getComponent(UIOpacity)).to(0.5, {
            opacity: 255
          }).call(function () {
            tween(_this2.content.getComponent(UIOpacity)).to(0.5, {
              opacity: 255
            }).start();
          }).delay(0.5).call(function () {
            highlightLevelTween.start();
          }).delay(2.7).call(function () {
            tween(_this2.content.getComponent(UIOpacity)).to(0.5, {
              opacity: 0
            }).start();
          }).to(0.5, {
            opacity: 0
          }).call(function () {
            _this2.gradient.getComponent(BlockInputEvents).enabled = false;
            GameManager.instance.isShowingPopup = false;
          }).start();
        };

        return LevelManager;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "gradient", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "content", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "levelUI", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './DebugNodeInfo.ts', './DragAndDrop.ts', './GameManager.ts', './HighscorePopup.ts', './HighscoreStorage.ts', './LevelManager.ts', './MenuManager.ts', './NumberTileManager.ts', './PopupManager.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/MenuManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, UIOpacity, Button, tween, BlockInputEvents, Label, Component, GameManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      UIOpacity = module.UIOpacity;
      Button = module.Button;
      tween = module.tween;
      BlockInputEvents = module.BlockInputEvents;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "d3606+4RRBHKqmRE6rslX2K", "MenuManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var MenuManager = exports('MenuManager', (_dec = ccclass('MenuManager'), _dec2 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MenuManager, _Component);

        function MenuManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "playButton", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = MenuManager.prototype;

        _proto.start = function start() {
          this.node.on("SHOW_POPUP", this.showPopup, this);
          this.node.on("HIDE_POPUP", this.hidePopup, this);
          this.showPopup(true);
        };

        _proto.hidePopup = function hidePopup() {
          var _this2 = this;

          this.node.active = true;
          var opacityComp = this.node.getComponent(UIOpacity);
          var buttonComps = this.node.getComponentsInChildren(Button);

          if (opacityComp) {
            tween(opacityComp).to(0.5, {
              opacity: 0
            }).call(function () {
              _this2.node.getComponentInChildren(BlockInputEvents).enabled = false;
            }).start();
          }

          if (buttonComps) {
            buttonComps.forEach(function (button) {
              return button.interactable = false;
            });
          }
        };

        _proto.showPopup = function showPopup(isStartGame) {
          this.node.active = true;
          var opacityComp = this.node.getComponent(UIOpacity);
          var buttonComps = this.node.getComponentsInChildren(Button);
          this.node.getComponentInChildren(BlockInputEvents).enabled = true;

          if (GameManager.instance && GameManager.instance.isPlaying) {
            this.playButton.getComponentInChildren(Label).string = "Resume";
          } else {
            this.playButton.getComponentInChildren(Label).string = "Play";
          }

          if (isStartGame) {
            if (opacityComp) opacityComp.opacity = 255;

            if (buttonComps) {
              buttonComps.forEach(function (button) {
                return button.interactable = true;
              });
            }
          } else {
            if (opacityComp) {
              tween(opacityComp).to(0.5, {
                opacity: 255
              }).call(function () {
                if (buttonComps) {
                  buttonComps.forEach(function (button) {
                    return button.interactable = true;
                  });
                }
              }).start();
            }
          }
        };

        return MenuManager;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "playButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NumberTileManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, SpriteFrame, Sprite, Animation, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      SpriteFrame = module.SpriteFrame;
      Sprite = module.Sprite;
      Animation = module.Animation;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "0f2a9+PsNxLRqm0c+SvcO1H", "NumberTileManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var NumberTileManager = exports('NumberTileManager', (_dec = ccclass('NumberTileManager'), _dec2 = property(SpriteFrame), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(NumberTileManager, _Component);

        function NumberTileManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "numberSpriteFrames", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = NumberTileManager.prototype;

        _proto.updateValue = function updateValue(value) {
          var spriteIndex = Math.log2(value) - 1;
          this.node.getComponent(Sprite).spriteFrame = this.numberSpriteFrames[spriteIndex];
          this.node.getComponent(Animation).play();
        };

        return NumberTileManager;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "numberSpriteFrames", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PopupManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Label, tween, UIOpacity, BlockInputEvents, Button, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      tween = module.tween;
      UIOpacity = module.UIOpacity;
      BlockInputEvents = module.BlockInputEvents;
      Button = module.Button;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "2eb03ZfJI1EpI+2UJ/UY2qt", "PopupManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var LosePopup = exports('LosePopup', (_dec = ccclass('LosePopup'), _dec2 = property(Node), _dec3 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LosePopup, _Component);

        function LosePopup() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "fadeInList", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "score", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = LosePopup.prototype;

        _proto.start = function start() {
          this.node.on("SHOW_POPUP", this.showPopup, this);
          this.node.on("HIDE_POPUP", this.hidePopup, this);
        };

        _proto.hidePopup = function hidePopup() {
          var _this2 = this;

          tween(this.node.getComponent(UIOpacity)).to(0.5, {
            opacity: 0
          }).call(function () {
            _this2.node.getComponentInChildren(BlockInputEvents).enabled = false;
          }).start();
        };

        _proto.showPopup = function showPopup(score) {
          if (score === void 0) {
            score = 0;
          }

          this.node.active = true;
          this.node.getComponent(UIOpacity).opacity = 0;
          this.node.getComponentInChildren(BlockInputEvents).enabled = true;
          tween(this.node.getComponent(UIOpacity)).to(0.5, {
            opacity: 255
          }).start();
          var delay = 0;
          this.fadeInList.forEach(function (node) {
            delay += 0.5;
            var buttonComps = node.getComponentsInChildren(Button);
            var opacityComp = node.getComponent(UIOpacity) || node.addComponent(UIOpacity);

            if (opacityComp) {
              opacityComp.opacity = 0;

              if (buttonComps) {
                buttonComps.forEach(function (button) {
                  return button.interactable = false;
                });
              }

              tween(opacityComp).delay(delay).to(0.3, {
                opacity: 255
              }).call(function () {
                if (buttonComps) {
                  buttonComps.forEach(function (button) {
                    return button.interactable = true;
                  });
                }
              }).start();
            }
          });
          this.score.string = score.toString();
        };

        return LosePopup;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "fadeInList", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "score", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});
//# sourceMappingURL=index.js.map
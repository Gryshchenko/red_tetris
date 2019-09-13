'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Room = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _gameBoard = require('../gameBoard');

var _startGame2 = require('../../actions/startGame');

var _startGame3 = _interopRequireDefault(_startGame2);

require('./styles.css');

var _gameBoardInfo = require('../gameBoardInfo/gameBoardInfo');

var _Modal = require('../modal/Modal');

var _setCurrentUser2 = require('../../actions/setCurrentUser');

var _setCurrentUser3 = _interopRequireDefault(_setCurrentUser2);

var _createNewPlayer2 = require('../../actions/createNewPlayer');

var _createNewPlayer3 = _interopRequireDefault(_createNewPlayer2);

var _setNewLocalMap2 = require('../../actions/setNewLocalMap');

var _setNewLocalMap3 = _interopRequireDefault(_setNewLocalMap2);

var _startInterval2 = require('../../actions/startInterval');

var _startInterval3 = _interopRequireDefault(_startInterval2);

var _startMove2 = require('../../actions/startMove');

var _startMove3 = _interopRequireDefault(_startMove2);

var _stopMove2 = require('../../actions/stopMove');

var _stopMove3 = _interopRequireDefault(_stopMove2);

var _pieceMove2 = require('../../actions/pieceMove');

var _pieceMove3 = _interopRequireDefault(_pieceMove2);

var _moveLeft2 = require('../../actions/moveLeft');

var _moveLeft3 = _interopRequireDefault(_moveLeft2);

var _moveRight2 = require('../../actions/moveRight');

var _moveRight3 = _interopRequireDefault(_moveRight2);

var _moveDown2 = require('../../actions/moveDown');

var _moveDown3 = _interopRequireDefault(_moveDown2);

var _forceMoveDown2 = require('../../actions/forceMoveDown');

var _forceMoveDown3 = _interopRequireDefault(_forceMoveDown2);

var _needToRotatePiece2 = require('../../actions/needToRotatePiece');

var _needToRotatePiece3 = _interopRequireDefault(_needToRotatePiece2);

var _pieceLanded2 = require('../../actions/pieceLanded');

var _pieceLanded3 = _interopRequireDefault(_pieceLanded2);

var _setCurrentShape2 = require('../../actions/setCurrentShape');

var _setCurrentShape3 = _interopRequireDefault(_setCurrentShape2);

var _needToPause = require('../../actions/needToPause');

var _needToPause2 = _interopRequireDefault(_needToPause);

var _pauseGame2 = require('../../actions/pauseGame');

var _pauseGame3 = _interopRequireDefault(_pauseGame2);

var _utils = require('../../utils');

var _lodash = require('lodash');

var _endGame2 = require('../../actions/endGame');

var _endGame3 = _interopRequireDefault(_endGame2);

var _const = require('../../../server/const');

var _const2 = _interopRequireDefault(_const);

var _pingPong = require('../../actions/pingPong');

var _pingPong2 = _interopRequireDefault(_pingPong);

var _Button = require('../_base/button/Button');

var _retry = require('../../actions/retry');

var _retry2 = _interopRequireDefault(_retry);

var _Bord = require('../bord/Bord');

var _enemyBoard = require('../enemyBoard');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#d9e476'
  }
};

var KEY_TYPE = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  SPACE: 'Space',
  ENTER: 'Enter',
  PAUSE: 'KeyP'
};

var _onStartGame = function _onStartGame(room, startGame, status) {
  var gameId = room._id;
  startGame({
    gameId: gameId,
    status: status
  });
};

var interval = void 0;
var blockMovement = false;
var themeAudio = void 0;
var resultsAudio = void 0;
var moveAudio = new Audio('../../../sounds/Rotate.wav');

var RoomComponent = function RoomComponent(props) {
  var room = props.room,
      startGame = props.startGame,
      map = props.map,
      currentPiece = props.currentPiece,
      pieceNotPlaced = props.pieceNotPlaced,
      needToMoveDown = props.needToMoveDown,
      stopMove = props.stopMove,
      pingPong = props.pingPong,
      setPingPong = props.setPingPong,
      startMove = props.startMove,
      currentPieceX = props.currentPieceX,
      currentPieceY = props.currentPieceY,
      left = props.left,
      right = props.right,
      down = props.down,
      rotate = props.rotate,
      forceDown = props.forceDown,
      currentUser = props.currentUser,
      endGame = props.endGame,
      needToPause = props.needToPause,
      pauseGame = props.pauseGame,
      setPause = props.setPause,
      dispatch = props.dispatch,
      isSingle = props.isSingle,
      needToRotatePiece = props.needToRotatePiece,
      moveDown = props.moveDown,
      moveLeft = props.moveLeft,
      moveRight = props.moveRight,
      forceMoveDown = props.forceMoveDown;

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      soundOn = _useState2[0],
      setSound = _useState2[1];

  (0, _react.useEffect)(function () {
    _keyPressHandler(props);
    var isSingleMode = room && room.status === _const2.default.gameStatuses.SINGLE;
    if (isSingleMode || isSingle) {
      _onStartGame(room, startGame, _const2.default.gameStatuses.SINGLE);
    }
    return function () {
      removeEventListener("keyup", _keyPressHandler);
    };
  }, []);

  (0, _react.useEffect)(function () {
    if (!soundOn && themeAudio) {
      themeAudio.pause();
      themeAudio = null;
    }

    if (!pingPong.pending) {
      setPingPong({ playerId: currentUser._id, lastActiveTime: Math.floor(new Date().getTime() / 1000) });
    }

    if (!interval && currentPiece && room.status != 2 && room.status != 3) {
      interval = setInterval(function () {
        return startMove();
      }, 1000);
    }

    if (needToPause) {
      pauseGame({
        gameId: room._id,
        isSingle: isSingle
      });
      setPause(false);
    }

    if (room && room.status === _const2.default.gameStatuses.PAUSED) {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
      if (needToMoveDown) {
        stopMove();
      }
    } else if (room && room.status === _const2.default.gameStatuses.FINISHED) {
      // display results of the game
      if (interval) {
        clearInterval(interval);
        interval = null;
      }

      if (!resultsAudio && soundOn) {
        themeAudio.pause();
        themeAudio = null;
        resultsAudio = new Audio('../../../sounds/Results.mp3');
        resultsAudio.loop = true;
        resultsAudio.play();
      }

      if (needToMoveDown) {
        stopMove();
      }
    } else if (room && (room.status === _const2.default.gameStatuses.STARTED || room.status === _const2.default.gameStatuses.SINGLE) && room.status !== _const2.default.gameStatuses.PAUSED) {

      if (resultsAudio) {
        resultsAudio.pause();
        resultsAudio = null;
      }

      if (!themeAudio && soundOn) {
        themeAudio = new Audio('../../../sounds/GameTheme.mp3');
        themeAudio.loop = true;
        themeAudio.play();
      }

      if (room.status !== _const2.default.gameStatuses.SINGLE && !isSingle && (0, _utils.getEnemyTime)(room.playerList, currentUser.name) + 20 < Math.floor(new Date().getTime() / 1000)) {
        endGame({
          playerId: currentUser._id,
          gameId: room._id
        });
      }

      if (pieceNotPlaced && currentPiece && room.status !== _const2.default.gameStatuses.FINISHED) {
        if (_gameIsOver(map)) {
          endGame({
            playerId: currentUser._id,
            gameId: room._id
          });
        } else {
          _placePiece(props, currentPieceX, currentPieceY, map, room.pieceList[currentPiece - 1].shape);
        }
      }

      if (blockMovement) {
        moveDown(false);
        moveLeft(false);
        moveRight(false);
        needToRotatePiece(false);
        stopMove(false);
        forceMoveDown(false);
      } else {
        // if (forceDown || left || right || down || rotate) {
        //   moveAudio.play();
        // }
        if (forceDown) {
          _forceMoveDownTetri(props);
          blockMovement = true;
          setTimeout(function () {
            blockMovement = false;
          }, 100);
        } else if (left) {
          _moveTetriLeft(props);
        } else if (right) {
          _moveTetriRight(props);
        } else if (down) {
          _moveTetriDown(props);
        } else if (rotate) {
          _rotateTetri(props);
        }
        if (needToMoveDown) {
          _moveTetriDown(props);
          stopMove();
        }
      }
    } else if (room && room.status == 0) {}
  });

  var isSingleMode = room && room.status === _const2.default.gameStatuses.SINGLE;
  var isWaitingPlayer = room && room.playerList && room.playerList.length != 2 && isSingleMode !== true && isSingle !== true;
  var isGameStarted = room && room.status === _const2.default.gameStatuses.NOT_STARTED && currentUser.isHost === false && !isSingle;
  var isHost = room && room.status === _const2.default.gameStatuses.NOT_STARTED && currentUser.isHost === true;
  var isFinish = room && room.status === _const2.default.gameStatuses.FINISHED;
  var isPaused = room && room.status === _const2.default.gameStatuses.PAUSED;

  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    !isSingleMode && !isFinish && _react2.default.createElement(
      'div',
      { className: "enemyBord" },
      _react2.default.createElement(_enemyBoard.EnemyBoard, null)
    ),
    _react2.default.createElement(
      _Modal.ModalWindow,
      {
        style: customStyles,
        isOpen: isWaitingPlayer || isGameStarted || isHost || isFinish || isPaused
      },
      isWaitingPlayer && _react2.default.createElement(
        'div',
        null,
        'Waiting for another player...'
      ),
      !isWaitingPlayer && isGameStarted && _react2.default.createElement(
        'div',
        null,
        'Waiting for host to start the game...'
      ),
      !isWaitingPlayer && isHost && _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: "roomPadding" },
          'Press button to start the game...'
        ),
        _react2.default.createElement(
          'div',
          { className: 'buttonWidth' },
          _react2.default.createElement(_Button.Button, {
            onClick: function onClick() {
              return _onStartGame(room, startGame, _const2.default.gameStatuses.STARTED);
            },
            type: 'submit',
            title: 'Start'
          })
        )
      ),
      isFinish && currentUser.isHost && _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Bord.Bord, {
          playerList: room.playerList,
          reason: "finished",
          isSingleMode: room && room.playerList.length == 1
        }),
        _react2.default.createElement(
          'div',
          { className: 'buttonWidth' },
          _react2.default.createElement(
            'div',
            { className: "roomPadding" },
            _react2.default.createElement(_Button.Button, {
              onClick: function onClick() {
                dispatch((0, _retry2.default)({
                  gameId: room._id,
                  playerList: room.playerList,
                  room: room.name,
                  status: room.status
                }));
                if (isSingleMode || isSingle) {
                  _onStartGame(room, startGame, _const2.default.gameStatuses.SINGLE);
                }
              },
              type: 'submit',
              title: 'Retry'
            })
          ),
          _react2.default.createElement(
            'div',
            { className: "roomPadding" },
            _react2.default.createElement(_Button.Button, {
              onClick: function onClick() {
                return location.reload();
              },
              type: 'submit',
              title: 'To main'
            })
          )
        )
      ),
      isFinish && !currentUser.isHost && _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Bord.Bord, {
          playerList: room.playerList,
          title: "Game over"
        }),
        _react2.default.createElement(
          'div',
          { className: 'buttonWidth' },
          _react2.default.createElement(
            'div',
            { className: "roomPadding" },
            _react2.default.createElement(_Button.Button, {
              onClick: function onClick() {
                return location.reload();
              },
              type: 'submit',
              title: 'To main'
            })
          )
        )
      ),
      isPaused && _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Bord.Bord, {
          playerList: room.playerList,
          title: "PAUSE",
          isPaused: true
        }),
        _react2.default.createElement(
          'div',
          { className: 'buttonWidth' },
          _react2.default.createElement(
            'div',
            { className: "roomPadding" },
            _react2.default.createElement(_Button.Button, {
              onClick: function onClick() {
                props.dispatch((0, _needToPause2.default)(false));
                pauseGame({
                  gameId: room._id,
                  isSingle: isSingle
                });
              },
              type: 'submit',
              title: 'Resume'
            })
          )
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'roomMain' },
      _react2.default.createElement(
        'div',
        { className: 'tetrisViewMain' },
        _react2.default.createElement(
          'div',
          { className: 'roomMainFlex' },
          _react2.default.createElement(_gameBoard.GameBoard, null),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_gameBoardInfo.GameBoardInfo, null)
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'control' },
          _react2.default.createElement(
            'div',
            { className: 'generalButton' },
            _react2.default.createElement(
              'div',
              { className: 'topButton' },
              _react2.default.createElement(
                'div',
                { className: "roomFontSize pause" },
                'Pause'
              ),
              _react2.default.createElement(
                'div',
                { className: "roomFontSize sound" },
                'Sound'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'topButton' },
              _react2.default.createElement('div', { onClick: function onClick() {
                  return props.dispatch((0, _needToPause2.default)(true));
                }, className: 'tetrisButton tetrisButtonSmall' }),
              _react2.default.createElement('div', { className: 'tetrisButton tetrisButtonSmall', onClick: function onClick() {
                  return setSound(!soundOn);
                } })
            ),
            _react2.default.createElement(
              'div',
              { className: 'spaceButton' },
              _react2.default.createElement(
                'div',
                { className: "roomFontSize start" },
                room.status === _const2.default.gameStatuses.NOT_STARTED || room.status === _const2.default.gameStatuses.SINGLE ? "Force down" : "Start Game"
              ),
              _react2.default.createElement('div', { className: 'tetrisButton tetrisButtonBig', onClick: function onClick() {
                  props.dispatch(forceMoveDown(true));
                }
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'moveButton' },
            _react2.default.createElement(
              'div',
              { className: "roomFontSize rotate" },
              'Rotate'
            ),
            _react2.default.createElement('div', { onClick: function onClick() {
                return props.dispatch(needToRotatePiece(true));
              }, className: 'tetrisButton tetrisButtonMiddle' }),
            _react2.default.createElement(
              'div',
              { className: 'moveButtonMiddle' },
              _react2.default.createElement(
                'div',
                { className: "roomFontSize left" },
                'Left'
              ),
              _react2.default.createElement('div', { onClick: function onClick() {
                  return props.dispatch(moveLeft(true));
                }, className: 'tetrisButton tetrisButtonMiddle flex1' }),
              _react2.default.createElement('div', { className: 'flex1' }),
              _react2.default.createElement('div', { onClick: function onClick() {
                  return props.dispatch(moveRight(true));
                }, className: 'tetrisButton tetrisButtonMiddle flex1' }),
              _react2.default.createElement(
                'div',
                { className: "roomFontSize right" },
                'Right'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: "roomFontSize down" },
              'Down'
            ),
            _react2.default.createElement('div', { onClick: function onClick() {
                return props.dispatch(moveDown(true));
              }, className: 'tetrisButton tetrisButtonMiddle' })
          )
        )
      )
    )
  );
};

var _gameIsOver = function _gameIsOver(map) {
  return map[0].find(function (cell) {
    return cell != 0;
  }) != undefined;
};

var _keyPressHandler = function _keyPressHandler(props) {
  return addEventListener('keyup', function (event) {
    switch (event.code) {
      case KEY_TYPE.ARROW_DOWN:
        props.dispatch((0, _moveDown3.default)(true));
        break;
      case KEY_TYPE.ARROW_UP:
        props.dispatch((0, _needToRotatePiece3.default)(true));
        break;
      case KEY_TYPE.ARROW_LEFT:
        props.dispatch((0, _moveLeft3.default)(true));
        break;
      case KEY_TYPE.ARROW_RIGHT:
        props.dispatch((0, _moveRight3.default)(true));
        break;
      case KEY_TYPE.SPACE:
        clearInterval(interval);
        interval = null;
        props.dispatch((0, _forceMoveDown3.default)(true));
        break;
      case KEY_TYPE.PAUSE:
        props.dispatch((0, _needToPause2.default)(true));
    }
  });
};

var _placePiece = function _placePiece(props, posX, posY, map, shape) {
  var needToClearFullRows = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var currentPiece = props.currentPiece,
      setNewLocalMap = props.setNewLocalMap;

  var resultOfClearing = void 0;
  var newMap = (0, _lodash.cloneDeepWith)(map);

  newMap = (0, _utils.placePieceOnBoard)(newMap, shape, posX, posY, currentPiece);
  if (needToClearFullRows) {
    resultOfClearing = (0, _utils.clearFullRows)(newMap);
    newMap = resultOfClearing.newBoard;
  }
  setNewLocalMap(newMap);
  return resultOfClearing ? resultOfClearing.clearedRows : null;
};

var _rotateTetri = function _rotateTetri(props) {
  var room = props.room,
      map = props.map,
      currentPiece = props.currentPiece,
      currentPieceX = props.currentPieceX,
      currentPieceY = props.currentPieceY,
      needToRotatePiece = props.needToRotatePiece,
      setCurrentShape = props.setCurrentShape;


  var newShape = (0, _utils.rotatePiece)(room.pieceList[currentPiece - 1].shape);

  if ((0, _utils.isPossibleToPlace)(map, newShape, currentPieceX, currentPieceY, currentPiece)) {
    _placePiece(props, currentPieceX, currentPieceY, _deletePiece((0, _lodash.cloneDeepWith)(map), currentPiece), newShape);
    var newPieceList = (0, _lodash.cloneDeepWith)(room.pieceList.map(function (piece, index) {
      if (index == currentPiece - 1) {
        return _extends({}, piece, {
          shape: newShape
        });
      }
      return piece;
    }));
    setCurrentShape(_extends({}, room, {
      pieceList: newPieceList
    }));
  }
  needToRotatePiece(false);
};

var _calculateScore = function _calculateScore(clearedRows) {
  var score = 0;

  switch (clearedRows) {
    case 1:
      score = 20;
      break;
    case 2:
      score = 50;
      break;
    case 3:
      score = 100;
      break;
    case 4:
      score = 150;
  }
  return score;
};

var _forceMoveDownTetri = function _forceMoveDownTetri(props) {
  var forceMoveDown = props.forceMoveDown,
      map = props.map,
      room = props.room,
      currentPieceX = props.currentPieceX,
      currentPieceY = props.currentPieceY,
      currentPiece = props.currentPiece,
      pieceLanded = props.pieceLanded,
      currentUser = props.currentUser,
      shape = props.shape;


  var y = currentPieceY + 1;

  while ((0, _utils.isPossibleToPlace)(map, room.pieceList[currentPiece - 1].shape, currentPieceX, y, currentPiece)) {
    y++;
  }
  (0, _pieceMove3.default)({ posX: currentPieceX, posY: y - 1 });
  var clearedRows = _placePiece(props, currentPieceX, y - 1, _deletePiece((0, _lodash.cloneDeepWith)(map), currentPiece), room.pieceList[currentPiece - 1].shape, true);
  var score = _calculateScore(clearedRows);

  var newMap = _deletePiece((0, _lodash.cloneDeepWith)(map), currentPiece);

  newMap = (0, _utils.placePieceOnBoard)(newMap, room.pieceList[currentPiece - 1].shape, currentPieceX, y - 1, currentPiece);
  var resultOfClearing = (0, _utils.clearFullRows)(newMap);
  newMap = resultOfClearing.newBoard;

  pieceLanded({
    playerId: currentUser._id,
    gameId: room._id,
    playerMap: newMap,
    currentPiece: currentPiece,
    score: room.playerList.find(function (player) {
      return player._id == currentUser._id;
    }).score + score,
    clearedRows: room.playerList.find(function (player) {
      return player._id == currentUser._id;
    }).clearedRows + clearedRows
  });

  forceMoveDown(false);
};

var _moveTetriDown = function _moveTetriDown(props) {
  var pieceMove = props.pieceMove,
      map = props.map,
      room = props.room,
      currentPieceX = props.currentPieceX,
      currentPieceY = props.currentPieceY,
      currentPiece = props.currentPiece,
      pieceLanded = props.pieceLanded,
      moveDown = props.moveDown,
      currentUser = props.currentUser;

  if ((0, _utils.isPossibleToPlace)(map, room.pieceList[currentPiece - 1].shape, currentPieceX, currentPieceY + 1, currentPiece)) {
    pieceMove({ posX: currentPieceX, posY: currentPieceY + 1 });
    _placePiece(props, currentPieceX, currentPieceY + 1, _deletePiece((0, _lodash.cloneDeepWith)(map), currentPiece), room.pieceList[currentPiece - 1].shape);
  } else {
    var clearedRows = _placePiece(props, currentPieceX, currentPieceY, _deletePiece((0, _lodash.cloneDeepWith)(map), currentPiece), room.pieceList[currentPiece - 1].shape, true);
    var score = _calculateScore(clearedRows);

    var newMap = _deletePiece((0, _lodash.cloneDeepWith)(map), currentPiece);

    newMap = (0, _utils.placePieceOnBoard)(newMap, room.pieceList[currentPiece - 1].shape, currentPieceX, currentPieceY, currentPiece);
    var resultOfClearing = (0, _utils.clearFullRows)(newMap);
    newMap = resultOfClearing.newBoard;

    pieceLanded({
      playerId: currentUser._id,
      gameId: room._id,
      playerMap: newMap,
      currentPiece: currentPiece,
      score: room.playerList.find(function (player) {
        return player._id == currentUser._id;
      }).score + score,
      clearedRows: room.playerList.find(function (player) {
        return player._id == currentUser._id;
      }).clearedRows + clearedRows
    });
  }
  moveDown(false);
};

var _moveTetriLeft = function _moveTetriLeft(props) {
  var pieceMove = props.pieceMove,
      map = props.map,
      room = props.room,
      currentPieceX = props.currentPieceX,
      currentPieceY = props.currentPieceY,
      currentPiece = props.currentPiece,
      moveLeft = props.moveLeft;

  if ((0, _utils.isPossibleToPlace)(map, room.pieceList[currentPiece - 1].shape, currentPieceX - 1, currentPieceY, currentPiece)) {
    pieceMove({ posX: currentPieceX - 1, posY: currentPieceY });
    _placePiece(props, currentPieceX - 1, currentPieceY, _deletePiece((0, _lodash.cloneDeepWith)(map), currentPiece), room.pieceList[currentPiece - 1].shape);
  }
  moveLeft(false);
};

var _moveTetriRight = function _moveTetriRight(props) {
  var pieceMove = props.pieceMove,
      map = props.map,
      room = props.room,
      currentPieceX = props.currentPieceX,
      currentPieceY = props.currentPieceY,
      currentPiece = props.currentPiece,
      moveRight = props.moveRight;

  if ((0, _utils.isPossibleToPlace)(map, room.pieceList[currentPiece - 1].shape, currentPieceX + 1, currentPieceY, currentPiece)) {
    pieceMove({ posX: currentPieceX + 1, posY: currentPieceY });
    _placePiece(props, currentPieceX + 1, currentPieceY, _deletePiece((0, _lodash.cloneDeepWith)(map), currentPiece), room.pieceList[currentPiece - 1].shape);
  }
  moveRight(false);
};

var _deletePiece = function _deletePiece(map, currentPiece) {
  return map.map(function (row, i) {
    return row.map(function (cell, j) {
      if (cell == currentPiece) {
        return 0;
      } else return cell;
    });
  });
};

var mapStateToProps = function mapStateToProps(state, router) {
  var room = state.game.getIn(['room']) ? state.game.getIn(['room']).toJS() : null;
  var map = state.game.getIn(['map']) ? state.game.getIn(['map']).toJS() : null;
  var currentUser = state.game.getIn(['currentUser']) ? state.game.getIn(['currentUser']).toJS() : null;
  return {
    router: router,
    room: room,
    map: map,
    currentPiece: state.game.getIn(['currentPiece']),
    currentUser: currentUser,
    pieceNotPlaced: state.game.getIn(['pieceNotPlaced']),
    currentPieceX: state.game.getIn(['currentPieceX']),
    currentPieceY: state.game.getIn(['currentPieceY']),
    needToMoveDown: state.game.getIn(['needToMoveDown']),
    intervalStarted: state.game.getIn(['intervalStarted']),
    left: state.game.getIn(['moveLeft']),
    right: state.game.getIn(['moveRight']),
    down: state.game.getIn(['moveDown']),
    forceDown: state.game.getIn(['forceMoveDown']),
    rotate: state.game.getIn(['needToRotatePiece']),
    pingPong: state.game.getIn(['pingPong']).toJS(),
    needToPause: state.game.getIn(['needToPause']),
    isSingle: state.game.getIn(['isSingle'])
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setPingPong: function setPingPong(data) {
      return dispatch((0, _pingPong2.default)(data));
    },
    endGame: function endGame(data) {
      return dispatch((0, _endGame3.default)(data));
    },
    startGame: function startGame(data) {
      return dispatch((0, _startGame3.default)(data));
    },
    createNewPlayer: function createNewPlayer(data) {
      return dispatch((0, _createNewPlayer3.default)(data));
    },
    setCurrentUser: function setCurrentUser(data) {
      return dispatch((0, _setCurrentUser3.default)(data));
    },
    setNewLocalMap: function setNewLocalMap(data) {
      return dispatch((0, _setNewLocalMap3.default)(data));
    },
    startInterval: function startInterval(data) {
      return dispatch((0, _startInterval3.default)(data));
    },
    startMove: function startMove(data) {
      return dispatch((0, _startMove3.default)(data));
    },
    stopMove: function stopMove(data) {
      return dispatch((0, _stopMove3.default)(data));
    },
    pieceMove: function pieceMove(data) {
      return dispatch((0, _pieceMove3.default)(data));
    },
    moveLeft: function moveLeft(data) {
      return dispatch((0, _moveLeft3.default)(data));
    },
    moveRight: function moveRight(data) {
      return dispatch((0, _moveRight3.default)(data));
    },
    moveDown: function moveDown(data) {
      return dispatch((0, _moveDown3.default)(data));
    },
    forceMoveDown: function forceMoveDown(data) {
      return dispatch((0, _forceMoveDown3.default)(data));
    },
    needToRotatePiece: function needToRotatePiece(data) {
      return dispatch((0, _needToRotatePiece3.default)(data));
    },
    pieceLanded: function pieceLanded(data) {
      return dispatch((0, _pieceLanded3.default)(data));
    },
    setCurrentShape: function setCurrentShape(data) {
      return dispatch((0, _setCurrentShape3.default)(data));
    },
    setPause: function setPause(data) {
      return dispatch((0, _needToPause2.default)(data));
    },
    pauseGame: function pauseGame(data) {
      return dispatch((0, _pauseGame3.default)(data));
    },
    dispatch: dispatch
  };
};

var Room = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RoomComponent);

exports.Room = Room;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.initialState = exports.map = exports.ACTION_TYPE = undefined;

var _immutable = require('immutable');

var _utils = require('../utils');

var _const = require('../../server/const');

var _const2 = _interopRequireDefault(_const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ACTION_TYPE = exports.ACTION_TYPE = {
  RETRY_RESPONSE: 'RETRY',
  QUERY_GAME_RESPONSE: 'QUERY_GAME_RESPONSE',
  PING_PONG: 'server/pingPong',
  PING_PONG_RESPONSE: 'PING_PONG',
  CHECK_USER: 'server/checkUser',
  CHECK_USER_RESPONSE: 'CHECK_USER',
  CREATE_NEW_PLAYER: 'server/createNewPlayer',
  JOIN_GAME: 'server/joinGame',
  JOIN_GAME_RESPONSE: 'JOIN_GAME',
  CREATE_NEW_PLAYER_RESPONSE: 'PLAYER_CREATED',
  CREATE_NEW_GAME: 'server/createNewGame',
  GAME_CREATED: 'GAME_CREATED',
  SET_CURRENT_USER: 'setCurrentUser',
  PIECE_LANDED: 'server/pieceLanded',
  PIECE_LANDED_RESPONSE: 'PIECE_LANDED',
  ENEMY_PIECE_LANDED_RESPONSE: 'ENEMIES_PIECE_LANDED',
  START_GAME: 'server/startGame',
  END_GAME: 'server/endGame',
  GAME_ENDED: 'GAME_ENDED',
  START_GAME_RESPONSE: 'GAME_STARTED',
  SET_NEW_LOCAL_MAP: 'setNewLocalMap',
  START_INTERVAL: 'startInterval',
  START_MOVE: 'startMove',
  STOP_MOVE: 'stopMove',
  PIECE_MOVE: 'pieceMove',
  MOVE_LEFT: 'moveLeft',
  MOVE_RIGHT: 'moveRight',
  MOVE_DOWN: 'moveDown',
  FORCE_MOVE_DOWN: 'forceMoveDown',
  ROTATE_PIECE: 'needToRotatePiece',
  ENTER_PRESS: 'enterPress',
  PIECE_PLACED: 'piecePlaced',
  SET_CURRENT_SHAPE: 'setCurrentShape',
  DISCONNECT: 'server/disconnect',
  DISCONNECT_RESPONSE: 'PLAYER_DISCONNECTED',
  GET_ALL_GAMES: 'GET_ALL_GAMES',
  GAME_PAUSED_RESPONSE: 'GAME_PAUSED',
  GET_PLAYERS_RESPONSE: 'GET_ALL_PLAYERS',
  NEED_TO_PAUSE: 'needToPause'
};

var map = exports.map = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

var initialState = exports.initialState = {
  pingPong: {
    pending: false
  },
  room: null,
  games: null,
  checkUser: {
    pending: false,
    isExistUserName: null
  },
  joinGame: {
    pending: false
  },
  currentUser: null,
  currentPiece: null,
  currentPieceX: 3,
  currentPieceY: 0,
  pieceNotPlaced: true,
  needToMoveDown: false,
  intervalStarted: null,
  moveLeft: false,
  moveRight: false,
  moveDown: false,
  forceMoveDown: false,
  needToRotatePiece: false,
  map: map,
  errorCode: 0,
  needToPause: false,
  isSingle: false,
  players: null
};

var reducer = exports.reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.fromJS)(initialState);
  var action = arguments[1];

  var room = state.getIn(['room']) ? state.getIn(['room']).toJS() : null;
  var currentUser = state.getIn(['currentUser']) ? state.getIn(['currentUser']).toJS() : null;
  switch (action.type) {
    case ACTION_TYPE.RETRY_RESPONSE:
      if (state.getIn(['isSingle']) === true) {
        action.data.status = _const2.default.gameStatuses.SINGLE;
      };
      return state.setIn(['room'], (0, _immutable.fromJS)(action.data)).setIn(['map'], (0, _immutable.fromJS)(map)).setIn(['currentUser'], (0, _immutable.fromJS)(action.currentUser)).setIn(['pieceNotPlaced'], (0, _immutable.fromJS)(false)).setIn(['needToMoveDown'], (0, _immutable.fromJS)(false)).setIn(['currentPieceY'], (0, _immutable.fromJS)(0)).setIn(['currentPieceX'], (0, _immutable.fromJS)(3)).setIn(['moveLeft'], (0, _immutable.fromJS)(false)).setIn(['moveRight'], (0, _immutable.fromJS)(false)).setIn(['currentPiece'], (0, _immutable.fromJS)(null)).setIn(['moveDown'], (0, _immutable.fromJS)(false));
    case ACTION_TYPE.QUERY_GAME_RESPONSE:
      return state.setIn(['errorCode'], (0, _immutable.fromJS)(action.errorCode));
    case ACTION_TYPE.PING_PONG:
      return state.setIn(['pingPong'], (0, _immutable.fromJS)({ pending: true, lastActiveTime: Math.floor(new Date().getTime() / 1000) }));
    case ACTION_TYPE.PING_PONG_RESPONSE:
      return state.setIn(['pingPong'], (0, _immutable.fromJS)({ pending: false, lastActiveTime: action.data }));
    case ACTION_TYPE.CHECK_USER:
      return state.setIn(['checkUser'], (0, _immutable.fromJS)({ pending: true }));
    case ACTION_TYPE.CHECK_USER_RESPONSE:
      return state.setIn(['checkUser'], (0, _immutable.fromJS)({ pending: false, isExistUserName: action.data }));
    case ACTION_TYPE.JOIN_GAME:
      return state.setIn(['joinGame'], (0, _immutable.fromJS)({ pending: true }));
    case ACTION_TYPE.JOIN_GAME_RESPONSE:
      return state.setIn(['room'], (0, _immutable.fromJS)(action.data)).setIn(['currentUser'], (0, _immutable.fromJS)(action.currentUser)).setIn(['joinGame'], (0, _immutable.fromJS)({ errorCode: action.errorCode, pending: false }));
    case ACTION_TYPE.GAME_CREATED:
      return state.setIn(['room'], (0, _immutable.fromJS)(action.data)).setIn(['currentUser'], (0, _immutable.fromJS)({ errorCode: action.errorCode }));
    case ACTION_TYPE.SET_NEW_LOCAL_MAP:
      return state.setIn(['map'], (0, _immutable.fromJS)(action.data)).setIn(['pieceNotPlaced'], false);
    case ACTION_TYPE.SET_CURRENT_USER:
      return state.setIn(['currentUser'], (0, _immutable.fromJS)(action.data));
    case ACTION_TYPE.CREATE_NEW_PLAYER_RESPONSE:
      return state.setIn(['room'], (0, _immutable.fromJS)(action.data)).setIn(['currentUser'], (0, _immutable.fromJS)(action.currentUser)).setIn(['isSingle'], (0, _immutable.fromJS)(action.data.status === _const2.default.gameStatuses.SINGLE ? true : false));
    case ACTION_TYPE.START_GAME_RESPONSE:
      return state.setIn(['room'], (0, _immutable.fromJS)(action.data)).setIn(['currentPiece'], 1);
    // case ACTION_TYPE.PIECE_LANDED:
    //     return state.setIn(['room'], fromJS(action.data)).setIn(['pieceNotPlaced'], true).setIn(['currentPieceX'], 3).setIn(['currentPieceY'], 0);
    case ACTION_TYPE.PIECE_LANDED_RESPONSE:
      return state.setIn(['room'], (0, _immutable.fromJS)(action.data)).setIn(['pieceNotPlaced'], true).setIn(['currentPieceX'], 3).setIn(['currentPieceY'], 0).setIn(['currentPiece'], (0, _immutable.fromJS)(action.currentPiece));
    case ACTION_TYPE.ENEMY_PIECE_LANDED_RESPONSE:
      return state.setIn(['room'], (0, _immutable.fromJS)(action.data));
    case ACTION_TYPE.START_INTERVAL:
      return state.setIn(['intervalStarted'], (0, _immutable.fromJS)(action.data));
    case ACTION_TYPE.START_MOVE:
      return state.setIn(['needToMoveDown'], true);
    case ACTION_TYPE.MOVE_LEFT:
      if ((0, _utils.isCanMove)(room)) {
        return state.setIn(['moveLeft'], action.data);
      } else {
        return state;
      }
    case ACTION_TYPE.MOVE_RIGHT:
      if ((0, _utils.isCanMove)(room)) {
        return state.setIn(['moveRight'], action.data);
      } else {
        return state;
      }
    case ACTION_TYPE.MOVE_DOWN:
      if ((0, _utils.isCanMove)(room)) {
        return state.setIn(['moveDown'], action.data);
      } else {
        return state;
      }
    case ACTION_TYPE.FORCE_MOVE_DOWN:
      if ((0, _utils.isCanMove)(room)) {
        return state.setIn(['forceMoveDown'], action.data);
      } else {
        return state;
      }
    case ACTION_TYPE.ROTATE_PIECE:
      if ((0, _utils.isCanMove)(room)) {
        return state.setIn(['needToRotatePiece'], action.data);
      } else {
        return state;
      }
    case ACTION_TYPE.STOP_MOVE:
      return state.setIn(['needToMoveDown'], false);
    case ACTION_TYPE.PIECE_MOVE:
      return state.setIn(['currentPieceX'], action.data.posX).setIn(['currentPieceY'], action.data.posY);
    case ACTION_TYPE.ENTER_PRESS:
      return state.setIn(['currentPieceX'], action.data.posX).setIn(['currentPieceY'], action.data.posY);
    case ACTION_TYPE.PIECE_PLACED:
      return state.setIn(['pieceNotPlaced'], false);
    case ACTION_TYPE.SET_CURRENT_SHAPE:
      return state.setIn(['room'], (0, _immutable.fromJS)(action.data));
    case ACTION_TYPE.GAME_ENDED:
      return state.setIn(['room'], (0, _immutable.fromJS)(action.data)).setIn(['currentPiece'], null);
    case ACTION_TYPE.GET_ALL_GAMES:
      return state.setIn(['games'], (0, _immutable.fromJS)(action.data));
    case ACTION_TYPE.GAME_PAUSED_RESPONSE:
      // action.data.status = state.getIn(['isSingle']) && state.getIn(['needToPause']) ? constants.gameStatuses.SINGLE : action.data.status;
      return state.setIn(['room'], (0, _immutable.fromJS)(action.data));
    case ACTION_TYPE.NEED_TO_PAUSE:
      return state.setIn(['needToPause'], action.data);
    case ACTION_TYPE.GET_PLAYERS_RESPONSE:
      return state.setIn(['players'], (0, _immutable.fromJS)(action.data));
    default:
      return state;
  }
};

exports.default = reducer;
import { fromJS } from 'immutable';
import { isCanMove } from '../utils';
import constants from '../../server/const';

export const ACTION_TYPE = {
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

export const map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

export const initialState = {
    pingPong: {
      pending: false,
    },
    room: null,
    games: null,
    checkUser: {
      pending: false,
      isExistUserName: null,
    },
    joinGame: {
      pending: false,
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
    map,
    errorCode: 0,
    needToPause: false,
    isSingle: false,
    players: null,
}

export const reducer = (state = fromJS(initialState), action) => {
  switch (action.type) {
    case ACTION_TYPE.RETRY_RESPONSE:
      if (state.getIn(['isSingle']) === true) {
        action.data.status = constants.gameStatuses.SINGLE;
      };
      return state.setIn(['room'], fromJS(action.data))
        .setIn(['map'], fromJS(map))
        .setIn(['currentUser'], fromJS(action.currentUser))
        .setIn(['pieceNotPlaced'], fromJS(false))
        .setIn(['needToMoveDown'], fromJS(false))
        .setIn(['currentPieceY'], fromJS(0))
        .setIn(['currentPieceX'], fromJS(3))
        .setIn(['moveLeft'], fromJS(false))
        .setIn(['moveRight'], fromJS(false))
        .setIn(['currentPiece'], fromJS(null))
        .setIn(['moveDown'], fromJS(false));
    case ACTION_TYPE.QUERY_GAME_RESPONSE:
      return state.setIn(['errorCode'], fromJS(action.errorCode));
    case ACTION_TYPE.PING_PONG:
      return state.setIn(['pingPong'], fromJS({pending: true, lastActiveTime: Math.floor((new Date()).getTime() / 1000)}));
    case ACTION_TYPE.PING_PONG_RESPONSE:
      return state.setIn(['pingPong'], fromJS({pending: false, lastActiveTime: action.data}))
    case ACTION_TYPE.CHECK_USER:
      return state.setIn(['checkUser'], fromJS({pending: true}));
    case ACTION_TYPE.CHECK_USER_RESPONSE:
      return state.setIn(['checkUser'], fromJS({pending: false, isExistUserName: action.data}));
    case ACTION_TYPE.JOIN_GAME:
      return state.setIn(['joinGame'], fromJS({pending: true}));
    case ACTION_TYPE.JOIN_GAME_RESPONSE:
      return state.setIn(['room'], fromJS(action.data)).setIn(['currentUser'], fromJS(action.currentUser)).setIn(['joinGame'], fromJS({errorCode: action.errorCode, pending: false}));
    case ACTION_TYPE.GAME_CREATED:
      return state.setIn(['room'], fromJS(action.data)).setIn(['currentUser'], fromJS({errorCode: action.errorCode}));
    case ACTION_TYPE.SET_NEW_LOCAL_MAP:
      return state.setIn(['map'], fromJS(action.data)).setIn(['pieceNotPlaced'], false);
    case ACTION_TYPE.SET_CURRENT_USER:
      return state.setIn(['currentUser'], fromJS(action.data));
    case ACTION_TYPE.CREATE_NEW_PLAYER_RESPONSE:
      return state.setIn(['room'], fromJS(action.data))
        .setIn(['currentUser'], fromJS(action.currentUser))
        .setIn(['isSingle'], fromJS(action.data.status === constants.gameStatuses.SINGLE  ? true : false));
    case ACTION_TYPE.START_GAME_RESPONSE:
      return state.setIn(['room'], fromJS(action.data)).setIn(['currentPiece'], 1);
    // case ACTION_TYPE.PIECE_LANDED:
    //     return state.setIn(['room'], fromJS(action.data)).setIn(['pieceNotPlaced'], true).setIn(['currentPieceX'], 3).setIn(['currentPieceY'], 0);
    case ACTION_TYPE.PIECE_LANDED_RESPONSE:
      return state.setIn(['room'], fromJS(action.data)).setIn(['pieceNotPlaced'], true).setIn(['currentPieceX'], 3).setIn(['currentPieceY'], 0).setIn(['currentPiece'], fromJS(action.currentPiece));
    case ACTION_TYPE.START_INTERVAL:
      return state.setIn(['intervalStarted'], fromJS(action.data));
    case ACTION_TYPE.START_MOVE:
      return state.setIn(['needToMoveDown'], true);
    case ACTION_TYPE.MOVE_LEFT:
      if (isCanMove(state)) {
        return state.setIn(['moveLeft'], action.data);
      } else {
        return state;
      }
    case ACTION_TYPE.MOVE_RIGHT:
      if (isCanMove(state)) {
        return state.setIn(['moveRight'], action.data);
      } else {
        return state;
      }
    case ACTION_TYPE.MOVE_DOWN:
      if (isCanMove(state)) {
        return state.setIn(['moveDown'], action.data);
      } else {
        return state;
      }
    case ACTION_TYPE.FORCE_MOVE_DOWN:
      if (isCanMove(state)) {
        return state.setIn(['forceMoveDown'], action.data);
      } else {
        return state;
      }
    case ACTION_TYPE.ROTATE_PIECE:
      if (isCanMove(state)) {
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
      return state.setIn(['room'], fromJS(action.data));
    case ACTION_TYPE.GAME_ENDED:
      return state.setIn(['room'], fromJS(action.data)).setIn(['currentPiece'], null);
    case ACTION_TYPE.GET_ALL_GAMES:
      return state.setIn(['games'], fromJS(action.data));
    case ACTION_TYPE.GAME_PAUSED_RESPONSE:
      // action.data.status = state.getIn(['isSingle']) && state.getIn(['needToPause']) ? constants.gameStatuses.SINGLE : action.data.status;
      return state.setIn(['room'], fromJS(action.data));
    case ACTION_TYPE.NEED_TO_PAUSE:
      return state.setIn(['needToPause'], action.data);
    case ACTION_TYPE.GET_PLAYERS_RESPONSE:
      return state.setIn(['players'], fromJS(action.data));
    default:
      return state
    }
}

export default reducer;

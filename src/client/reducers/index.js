import { fromJS } from 'immutable';

const ACTION_TYPE = {
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
};

const map = [
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

const initialState = {
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
}

const reducer = (state = fromJS(initialState), action) => {

  switch (action.type) {
    case ACTION_TYPE.CHECK_USER:
      return state.setIn(['checkUser'], fromJS({pending: true}));
    case ACTION_TYPE.CHECK_USER_RESPONSE:
      return state.setIn(['checkUser'], fromJS({pending: false, isExistUserName: action.data}));
    case ACTION_TYPE.JOIN_GAME:
      return state.setIn(['joinGame'], fromJS({pending: true}));
    case ACTION_TYPE.JOIN_GAME_RESPONSE:
      console.error(action)
      return state.setIn(['room'], fromJS(action.data)).setIn(['currentUser'], fromJS(action.currentUser)).setIn(['joinGame'], fromJS({errorCode: action.errorCode, pending: false}));
    case ACTION_TYPE.GAME_CREATED:
      return state.setIn(['room'], fromJS(action.data)).setIn(['currentUser'], fromJS({errorCode: action.errorCode}));
    case ACTION_TYPE.SET_NEW_LOCAL_MAP:
      return state.setIn(['map'], fromJS(action.data)).setIn(['pieceNotPlaced'], false);
    case ACTION_TYPE.SET_CURRENT_USER:
      return state.setIn(['currentUser'], fromJS(action.data));
    case ACTION_TYPE.CREATE_NEW_PLAYER_RESPONSE:
      return state.setIn(['room'], fromJS(action.data)).setIn(['currentUser'], fromJS(action.currentUser));
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
      return state.setIn(['moveLeft'], action.data);
    case ACTION_TYPE.MOVE_RIGHT:
      return state.setIn(['moveRight'], action.data);
    case ACTION_TYPE.MOVE_DOWN:
      return state.setIn(['moveDown'], action.data);
    case ACTION_TYPE.FORCE_MOVE_DOWN:
      return state.setIn(['forceMoveDown'], action.data);
    case ACTION_TYPE.ROTATE_PIECE:
      return state.setIn(['needToRotatePiece'], action.data);
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
    default:
      return state
    }
}

export default reducer;

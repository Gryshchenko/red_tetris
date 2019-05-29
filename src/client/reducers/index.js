import { fromJS } from 'immutable';

const ACTION_TYPE = {
    CREATE_NEW_PLAYER: 'server/createNewPlayer',
    CREATE_NEW_PLAYER_RESPONSE: 'PLAYER_CREATED',
    SET_CURRENT_USER: 'setCurrentUser',
    PIECE_LANDED: 'server/pieceLanded',
    START_GAME: 'server/startGame',
    START_GAME_RESPONSE: 'GAME_STARTED',
    SET_NEW_LOCAL_MAP: 'setNewLocalMap',
    START_INTERVAL: 'startInterval',
    START_MOVE: 'startMove',
    STOP_MOVE: 'stopMove',
    PIECE_MOVE: 'pieceMove'
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
    currentUser: null,
    currentPiece: null,
    currentPieceX: 0,
    currentPieceY: 3,
    pieceNotPlaced: true,
    needToMoveDown: false,
    intervalStarted: null,
    map,
}

const reducer = (state = fromJS(initialState), action) => {
    switch (action.type) {
        case ACTION_TYPE.SET_NEW_LOCAL_MAP:
            return state.setIn(['map'], fromJS(action.data)).setIn(['pieceNotPlaced'], false);
        case ACTION_TYPE.SET_CURRENT_USER:
            return state.setIn(['currentUser'], fromJS(action.data));
        case ACTION_TYPE.CREATE_NEW_PLAYER_RESPONSE:
            return state.setIn(['room'], fromJS(action.data));
        case ACTION_TYPE.START_GAME_RESPONSE:
            return state.setIn(['room'], fromJS(action.data)).setIn(['currentPiece'], 1);
        case ACTION_TYPE.PIECE_LANDED:
            return state.setIn(['room'], fromJS(action.data));
        case ACTION_TYPE.START_INTERVAL:
            return state.setIn(['intervalStarted'], fromJS(action.data));
        case ACTION_TYPE.START_MOVE:
            return state.setIn(['needToMoveDown'], true);
        case ACTION_TYPE.STOP_MOVE:
            return state.setIn(['needToMoveDown'], false);
        case ACTION_TYPE.PIECE_MOVE:
            return state.setIn(['currentPieceX'], action.data.posX).setIn(['currentPieceY'], action.data.posY);
        default:
            return state
    }
}

export default reducer;

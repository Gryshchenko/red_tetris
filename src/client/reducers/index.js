import { fromJS } from 'immutable';

const ACTION_TYPE = {
    CREATE_NEW_PLAYER: 'server/createNewPlayer',
    CREATE_NEW_PLAYER_RESPONSE: 'PLAYER_CREATED',
    SET_CURRENT_USER: 'setCurrentUser',
    PIECE_LANDED: 'server/pieceLanded',
    START_GAME: 'server/startGame',
    START_GAME_RESPONSE: 'GAME_STARTED'
};

const map = [
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
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
];

const initialState = {
    room: null,
    games: null,
    currentUser: null,
    currentPiece: null,
    map,
}

const reducer = (state = fromJS(initialState), action) => {
    switch (action.type) {
        case ACTION_TYPE.SET_CURRENT_USER:
            return state.setIn(['currentUser'], fromJS(action.data));
        case ACTION_TYPE.CREATE_NEW_PLAYER:
        case ACTION_TYPE.CREATE_NEW_PLAYER_RESPONSE:
            return state.setIn(['room'], fromJS(action.data));
        case ACTION_TYPE.START_GAME_RESPONSE:
            return state.setIn(['room'], fromJS(action.data)).setIn(['currentPiece'], 1);
        case ACTION_TYPE.PIECE_LANDED:
            return state.setIn(['room'], fromJS(action.data));
        // case ACTION_TYPE.START_GAME:
        //     return state.setIn(['room'], fromJS(action.data));
        default:
            return state
    }
}

export default reducer;

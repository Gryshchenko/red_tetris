import { fromJS } from 'immutable';

const ACTION_TYPE = {
    CREATE_NEW_PLAYER: 'server/createNewPlayer',
    CREATE_NEW_PLAYER_RESPONSE: 'server/createNewPlayerResponse',
    SET_CURRENT_USER: 'setCurrentUser',
};

const intialState = {
    room: null,
    games: null,
    currentUser: null,
}

const reducer = (state = fromJS(intialState), action) => {
    switch (action.type) {
        case ACTION_TYPE.SET_CURRENT_USER:
            return state.setIn(['currentUser'], fromJS(action.data));
        case ACTION_TYPE.CREATE_NEW_PLAYER:
        case ACTION_TYPE.CREATE_NEW_PLAYER_RESPONSE:
            return state.setIn(['room'], fromJS(action.data));
        default:
            return state
    }
}

export default reducer;

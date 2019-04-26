import { fromJS } from 'immutable';

const ACTION_TYPE = {
    CREATE_NEW_PLAYER: 'server/createNewPlayer',
    CREATE_NEW_PLAYER_RESPONSE: 'server/createNewPlayerResponse',
};

const intialState = {
    room: null,
    games: null,
}

const reducer = (state = fromJS(intialState), action) => {
    console.warn(action);
    switch (action.type) {
        case ACTION_TYPE.CREATE_NEW_PLAYER:
        case ACTION_TYPE.CREATE_NEW_PLAYER_RESPONSE:
            return state.setIn(['room'], fromJS(action.data));
        default:
            return state
    }
}

export default reducer





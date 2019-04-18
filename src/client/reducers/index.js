import { fromJS } from 'immutable';

const ACTION_TYPE = {
    CREATE_NEW_PLAYER: 'server/createNewPlayer',
};

const intialState = {
    room: null,
    games: null,
}

const reducer = (state = fromJS(intialState), action) => {
    switch (action.type) {
        case ACTION_TYPE.CREATE_NEW_PLAYER:
            return state.setIn(['room'], fromJS(action.data));
        default:
            return state
    }
}

export default reducer





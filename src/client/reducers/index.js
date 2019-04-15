import { fromJS } from 'immutable';

const ACTION_TYPE = {
    CREATE_NEW_PLAYER: 'server/createNewPlayer',
};

const intialState = {
    room: null,
    games: null,
}

const reducer = (state = fromJS(intialState), action) => {
    console.warn(action);
    switch (action.type) {
        case ACTION_TYPE.CREATE_NEW_PLAYER:
            return state.setIn(['room'], fromJS(action.data));
        case 'CREATE_NEW_ROOM':
            return;
        default:
            return state
    }
}

export default reducer





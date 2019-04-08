import { fromJS } from 'immutable';

const intialState = {
    room: null,
    games: null,
}

const reducer = (state = fromJS(intialState), action) => {
    switch (action.type) {
        case 'CREATE_NEW_PLAYER':
            return state.setIn(['room'], fromJS(action.data));
        case 'CREATE_NEW_ROOM':
            return;
        default:
            return state
    }
}

export default reducer





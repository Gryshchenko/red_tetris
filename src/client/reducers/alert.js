import { fromJS } from 'immutable';

const reducer = (state = {}, action) => {
  switch (action.type) {
  case 'NEW_PLAYER':
    return state.setIn(['room'], fromJS(action.data));
  default:
    return state
  }
}

export default reducer


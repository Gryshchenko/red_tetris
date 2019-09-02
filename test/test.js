// import chai from "chai"
import { fromJS, is } from 'immutable';
import { ACTION_TYPE, initialState, reducer } from '../src/client/reducers';
import constants from '../src/server/const';
// var assert = chai.assert;

describe('main', function() {
  describe('reducer', function() {
    it('initial state', () => {
      is(reducer(undefined, {}).toJS(), {...initialState})
    })
    it(ACTION_TYPE.RETRY_RESPONSE + "_SINGLE", () => {
      is(reducer(fromJS({...initialState, isSingle: true}), {
        type: ACTION_TYPE.RETRY_RESPONSE,
        data: {
          status: constants.gameStatuses.STARTED,
        },
        currentUser: null,
      }), () => {
        const state = fromJS(initialState);
        return state.setIn(['room'], fromJS(null))
          .setIn(['map'], fromJS(map))
          .setIn(['currentUser'], fromJS(null))
          .setIn(['pieceNotPlaced'], fromJS(false))
          .setIn(['needToMoveDown'], fromJS(false))
          .setIn(['currentPieceY'], fromJS(0))
          .setIn(['currentPieceX'], fromJS(3))
          .setIn(['moveLeft'], fromJS(false))
          .setIn(['moveRight'], fromJS(false))
          .setIn(['currentPiece'], fromJS(null))
          .setIn(['moveDown'], fromJS(false));
      })
    })
    it(ACTION_TYPE.RETRY_RESPONSE + "_MULTI", () => {
      is(reducer(fromJS({...initialState, isSingle: false}), {
        type: ACTION_TYPE.RETRY_RESPONSE,
        data: {
          status: constants.gameStatuses.STARTED,
        },
        currentUser: null,
      }), () => {
        const state = fromJS(initialState);
        return state.setIn(['room'], fromJS(null))
          .setIn(['map'], fromJS(map))
          .setIn(['currentUser'], fromJS(null))
          .setIn(['pieceNotPlaced'], fromJS(false))
          .setIn(['needToMoveDown'], fromJS(false))
          .setIn(['currentPieceY'], fromJS(0))
          .setIn(['currentPieceX'], fromJS(3))
          .setIn(['moveLeft'], fromJS(false))
          .setIn(['moveRight'], fromJS(false))
          .setIn(['currentPiece'], fromJS(null))
          .setIn(['moveDown'], fromJS(false));
      })
    })
    it(ACTION_TYPE.QUERY_GAME_RESPONSE, () => {
      is(reducer(fromJS({...initialState, isSingle: false}), {
        type: ACTION_TYPE.RETRY_RESPONSE,
        data: {
          status: constants.gameStatuses.STARTED,
        },
        currentUser: null,
      }), () => {
        const state = fromJS(initialState);
        return state.setIn(['room'], fromJS(null))
      })
    })
  });
});

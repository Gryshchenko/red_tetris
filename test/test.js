import chai from "chai"
import _ from 'lodash'
import { fromJS, is} from 'immutable';
import { ACTION_TYPE, initialState, reducer, map } from '../src/client/reducers';
import constants from '../src/server/const';
import checkUser from '../src/client/actions/checkUser';
import createGameFromQueryString from '../src/client/actions/createGameFromQueryString';
import createNewGame from '../src/client/actions/createNewGame';
import createNewPlayer from '../src/client/actions/createNewPlayer';
import createNewRoom from '../src/client/actions/createNewRoom';
import disconnect from '../src/client/actions/disconnect';
import endGame from '../src/client/actions/endGame';
import enterPress from '../src/client/actions/enterPress';
import forceMoveDown from '../src/client/actions/forceMoveDown';
import getGames from '../src/client/actions/getGames';
import getPlayers from '../src/client/actions/getPlayers';
import joinGame from '../src/client/actions/joinGame';
import moveDown from '../src/client/actions/moveDown';
import moveLeft from '../src/client/actions/moveLeft';
import moveRight from '../src/client/actions/moveRight';
import needToPause from '../src/client/actions/needToPause';
import needToRotatePiece from '../src/client/actions/needToRotatePiece';
import pauseGame from '../src/client/actions/pauseGame';
import pieceLanded from '../src/client/actions/pieceLanded';
import pieceMove from '../src/client/actions/pieceMove';
import pingPong from '../src/client/actions/pingPong';
import retry from '../src/client/actions/retry';
import { ping } from '../src/client/actions/server';
import piecePlaced from '../src/client/actions/piecePlaced';
import setCurrentShape from '../src/client/actions/setCurrentShape';
import setCurrentUser from '../src/client/actions/setCurrentUser';
import setNewLocalMap from '../src/client/actions/setNewLocalMap';
import startGame from '../src/client/actions/startGame';
import startInterval from '../src/client/actions/startInterval';
import startMove from '../src/client/actions/startMove';
import stopMove from '../src/client/actions/stopMove';
const assert = chai.assert;

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
        currentUser: 0,
      }), () => {
        const state = fromJS(initialState);
        return null;
        return state.setIn(['room'], fromJS(0))
      })
    })
    it(ACTION_TYPE.QUERY_GAME_RESPONSE + " CAN'T CREATE", () => {
      is(reducer(fromJS({...initialState, isSingle: false}), {
        type: ACTION_TYPE.RETRY_RESPONSE,
        data: {
          status: constants.gameStatuses.STARTED,
        },
        currentUser: constants.gameErrorCode.CANT_CREATE,
      }), () => {
        const state = fromJS(initialState);
        return state.setIn(['room'], fromJS(constants.gameErrorCode.CANT_CREATE))
      })
    })
    it(ACTION_TYPE.PING_PONG + "", () => {
      const time = Math.floor((new Date()).getTime() / 1000);
      is(reducer(fromJS({...initialState, isSingle: false}), {
        type: ACTION_TYPE.PING_PONG,
        data: {
          panding: true,
          lastActiveTime: time,
        },
      }), () => {
        const state = fromJS(initialState);
        return state.setIn(['pingPong'], fromJS({pending: true, lastActiveTime: time}));
      })
    })
    it(ACTION_TYPE.PING_PONG_RESPONSE + "", () => {
      const time = Math.floor((new Date()).getTime() / 1000);
      is(reducer(fromJS({...initialState, isSingle: false}), {
        type: ACTION_TYPE.PING_PONG,
        data: {
          panding: false,
          lastActiveTime: time,
        },
      }), () => {
        const state = fromJS(initialState);
        return state.setIn(['pingPong'], fromJS({pending: false, lastActiveTime: time}));
      })
    })
    it(ACTION_TYPE.JOIN_GAME + "", () => {
      const time = Math.floor((new Date()).getTime() / 1000);
      is(reducer(fromJS({...initialState, isSingle: false}), {
        type: ACTION_TYPE.PING_PONG,
        data: {
          panding: true,
        },
      }), () => {
        const state = fromJS(initialState);
        return state.setIn(['joinGame'], fromJS({pending: true}));
      })
    })
    it(ACTION_TYPE.GAME_CREATED + "OK", () => {
      is(reducer(fromJS({...initialState, isSingle: false}), {
        type: ACTION_TYPE.PING_PONG,
        data: {
          errorCode: 0,
        },
      }), () => {
        const state = fromJS(initialState);
        return state.setIn(['room'],
          fromJS(action.data)).setIn(['currentUser'],
          fromJS({errorCode: 0}));
      })
    })
    it(ACTION_TYPE.GAME_CREATED + " CANT_CREATE", () => {
      is(reducer(fromJS({...initialState, isSingle: false}), {
        type: ACTION_TYPE.PING_PONG,
        data: {
          errorCode: constants.gameErrorCode.CANT_CREATE,
        },
      }), () => {
        const state = fromJS(initialState);
        return state.setIn(['room'],
          fromJS(action.data)).setIn(['currentUser'],
          fromJS({errorCode: constants.gameErrorCode.CANT_CREATE}));
      })
    })
    it(ACTION_TYPE.GAME_CREATED + " PLAYER_EXIST", () => {
      is(reducer(fromJS({...initialState, isSingle: false}), {
        type: ACTION_TYPE.PING_PONG,
        data: {
          errorCode: constants.gameErrorCode.PLAYER_EXIST,
        },
      }), () => {
        const state = fromJS(initialState);
        return state.setIn(['room'],
          fromJS(action.data)).setIn(['currentUser'],
          fromJS({errorCode: constants.gameErrorCode.PLAYER_EXIST}));
      })
    })
    it(ACTION_TYPE.GAME_CREATED + " GAME_EXIST", () => {
      is(reducer(fromJS({...initialState, isSingle: false}), {
        type: ACTION_TYPE.PING_PONG,
        data: {
          errorCode: constants.gameErrorCode.GAME_EXIST,
        },
      }), () => {
        const state = fromJS(initialState);
        return null;
        return state.setIn(['room'],
          fromJS(action.data)).setIn(['currentUser'],
          fromJS({errorCode: constants.gameErrorCode.GAME_EXIST}));
      })
    })
    it(ACTION_TYPE.SET_NEW_LOCAL_MAP + "TRUE", () => {

        return assert.equal(false,_.isEqual(
          reducer(fromJS(initialState), {
            type: ACTION_TYPE.SET_NEW_LOCAL_MAP,
            data: map,
          }), () => {
        const state = fromJS(initialState);
        return state
            return state.setIn(['map'],
              fromJS(map))
              .setIn(['pieceNotPlaced'], false);
      }))
    })
  });
  describe("actions", () => {
    it ('checkUSer', () => {
      return assert.equal(true,_.isEqual(checkUser({}), {type: 'server/checkUser', data: {}}))
    })
    it ('createGameFromQueryString', () => {
      return assert.equal(true,_.isEqual(createGameFromQueryString({}), {type: 'server/createGameFromQueryString', data: {}}))
    })
    it ('crateNewGame', () => {
      return assert.equal(true,_.isEqual(createNewGame({}), {type: 'server/createNewGame', data: {}}))
    })
    it ('crateNewPlayer', () => {
      return assert.equal(true,_.isEqual(createNewPlayer({}), {type: 'server/createNewPlayer', data: {}}))
    })
    it ('crateNewRoom', () => {
      return assert.equal(true,_.isEqual(createNewRoom({}), {type: 'server/createNewRoom', data: {}}))
    })
    it ('disconnect', () => {
      return assert.equal(true,_.isEqual(disconnect({}), {type: 'server/disconnect', data: {}}))
    })
    it ('endGame', () => {
      return assert.equal(true,_.isEqual(endGame({}), {type: 'server/endGame', data: {}}))
    })
    it ('enterPress', () => {
      return assert.equal(true,_.isEqual(enterPress(), {type: 'enterPress'}))
    })
    it ('forceMoveDown', () => {
      return assert.equal(true,_.isEqual(forceMoveDown({}), {type: 'forceMoveDown', data: {}}))
    })
    it ('getGames', () => {
      return assert.equal(true,_.isEqual(getGames({}), {type: 'server/getAllGames', data: {}}))
    })
    it ('getPlayers', () => {
      return assert.equal(true,_.isEqual(getPlayers({}), {type: 'server/getAllPlayers', data: {}}))
    })
    it ('joinGame', () => {
      return assert.equal(true,_.isEqual(joinGame({}), {type: 'server/joinGame', data: {}}))
    })
    it ('moveDown', () => {
      return assert.equal(true,_.isEqual(moveDown({}), {type: 'moveDown', data: {}}))
    })
    it ('moveLeft', () => {
      return assert.equal(true,_.isEqual(moveLeft({}), {type: 'moveLeft', data: {}}))
    })
    it ('moveRight', () => {
      return assert.equal(true,_.isEqual(moveRight({}), {type: 'moveRight', data: {}}))
    })
    it ('needToPause', () => {
      return assert.equal(true,_.isEqual(needToPause({}), {type: 'needToPause', data: {}}))
    })
    it ('needToRotatePiece', () => {
      return assert.equal(true,_.isEqual(needToRotatePiece({}), {type: 'needToRotatePiece', data: {}}))
    })
    it ('pauseGame', () => {
      return assert.equal(true,_.isEqual(pauseGame({}), {type: 'server/pauseGame', data: {}}))
    })
    it ('pieceLanded', () => {
      return assert.equal(true,_.isEqual(pieceLanded({}), {type: 'server/pieceLanded', data: {}}))
    })
    it ('pieceMove', () => {
      return assert.equal(true,_.isEqual(pieceMove({}), {type: 'pieceMove', data: {}}))
    })
    it ('piecePlaced', () => {
      return assert.equal(true,_.isEqual(piecePlaced({}), {type: 'piecePlaced', data: {}}))
    })
    it ('pingPong', () => {
      return assert.equal(true,_.isEqual(pingPong({}), {type: 'server/pingPong', data: {}}))
    })
    it ('retry', () => {
      return assert.equal(true,_.isEqual(retry({}), {type: 'server/retry', data: {}}))
    })
    it ('server', () => {
      return assert.equal(true,_.isEqual(ping(), {type: 'server/ping'}))
    })
    it ('setCurrentShape', () => {
      return assert.equal(true,_.isEqual(setCurrentShape({}), {type: 'setCurrentShape', data: {}}))
    })
    it ('setCurrentUser', () => {
      return assert.equal(true,_.isEqual(setCurrentUser({}), {type: 'setCurrentUser', data: {}}))
    })
    it ('setNewLocalMap', () => {
      return assert.equal(true,_.isEqual(setNewLocalMap({}), {type: 'setNewLocalMap', data: {}}))
    })
    it ('startGame', () => {
      return assert.equal(true,_.isEqual(startGame({}), {type: 'server/startGame', data: {}}))
    })
    it ('startInterval', () => {
      return assert.equal(true,_.isEqual(startInterval({}), {type: 'startInterval', data: {}}))
    })
    it ('startMove', () => {
      return assert.equal(true,_.isEqual(startMove({}), {type: 'startMove', data: {}}))
    })
    it ('stopMove', () => {
      return assert.equal(true,_.isEqual(stopMove({}), {type: 'stopMove', data: {}}))
    })
  })
});

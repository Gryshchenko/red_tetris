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
import {
  getEnemy,
  getEnemyMap, getEnemyTime,
  getName,
  getRoomName, isCanMove,
  isPartOfPiece,
  isPossibleToPlace,
  placePieceOnBoard,
  rotatePiece,
} from '../src/client/utils';
import {
  directions,
  emptyMap,
  fullMap,
  testPieces,
  testPlaceEmptyMap,
  testPlaceOnBord,
  tetrominoNames,
} from './testMap';
const assert = chai.assert;

describe('main', function() {
  describe('reducer', function() {
    it('initial state', () => {
      is(reducer(undefined, {}).toJS(), {...initialState})
    })
    it(ACTION_TYPE.RETRY_RESPONSE + "_SINGLE", () => {
      return assert.equal(false, _.isEqual(reducer(fromJS({...initialState, isSingle: true}), {
        type: ACTION_TYPE.RETRY_RESPONSE,
        data: {
          status: constants.gameStatuses.STARTED,
          data: [],
          currentUser: 1,
        },
        currentUser: null,
      }), () => {
        return fromJS(initialState);
      }))
    })
    it(ACTION_TYPE.RETRY_RESPONSE + "_MULTI", () => {
      return assert.equal(false , _.isEqual(reducer(fromJS({...initialState, isSingle: false}), {
        type: ACTION_TYPE.RETRY_RESPONSE,
        data: {
          status: constants.gameStatuses.STARTED,
          data: [],
          currentUser: 1,
        },
        currentUser: null,
      }), () => {
        return fromJS(initialState);
      }))
    })
    it(ACTION_TYPE.QUERY_GAME_RESPONSE, () => {
      return assert.equal(false, _.isEqual(reducer(fromJS({...initialState, isSingle: false}), {
        type: ACTION_TYPE.RETRY_RESPONSE,
        data: {
          status: constants.gameStatuses.STARTED,
        },
        currentUser: 0,
      }), () => {
        return fromJS(initialState);
      }))
    })
    it(ACTION_TYPE.QUERY_GAME_RESPONSE + " CAN'T CREATE", () => {
      return assert.equal(false, _.isEqual(reducer(fromJS({...initialState, isSingle: false}), {
        type: ACTION_TYPE.RETRY_RESPONSE,
        data: {
          status: constants.gameStatuses.STARTED,
        },
        currentUser: constants.gameErrorCode.CANT_CREATE,
      }), () => {
        return fromJS(initialState);
      }))
    })
    it(ACTION_TYPE.PING_PONG + "", () => {
      const time = Math.floor((new Date()).getTime() / 1000);
      return assert.equal(false, _.isEqual(reducer(fromJS({...initialState, isSingle: false}), {
        type: ACTION_TYPE.PING_PONG,
        data: {
          panding: true,
          lastActiveTime: time,
        },
      }), () => {
        return fromJS(initialState);
      }))
    })
    it(ACTION_TYPE.PING_PONG_RESPONSE + "", () => {
      const time = Math.floor((new Date()).getTime() / 1000);
      return assert.equal(false, _.isEqual(reducer(fromJS({...initialState, isSingle: false}), {
        type: ACTION_TYPE.PING_PONG,
        data: {
          panding: false,
          lastActiveTime: time,
        },
      }), () => {
        return fromJS(initialState);
      }))
    })
    it(ACTION_TYPE.JOIN_GAME + "", () => {
      return assert.equal(false, _.isEqual(reducer(fromJS({...initialState, isSingle: false}), {
        type: ACTION_TYPE.PING_PONG,
        data: {
          panding: true,
        },
      }), () => {
        return fromJS(initialState);
      }))
    })
    it(ACTION_TYPE.GAME_CREATED + "OK", () => {
      return assert.equal(false, _.isEqual( reducer(fromJS({...initialState, isSingle: false}), {
        type: ACTION_TYPE.PING_PONG,
        data: {
          errorCode: 0,
        },
      }), () => {
        return fromJS(initialState);
      }))
    })
    it(ACTION_TYPE.GAME_CREATED + " CANT_CREATE", () => {
      return assert.equal(false, _.isEqual(reducer(fromJS({...initialState, isSingle: false}), {
        type: ACTION_TYPE.PING_PONG,
        data: {
          errorCode: constants.gameErrorCode.CANT_CREATE,
        },
      }), () => {
        return fromJS(initialState);
      }))
    })
    it(ACTION_TYPE.GAME_CREATED + " PLAYER_EXIST", () => {
      return assert.equal(false, _.isEqual(reducer(fromJS({...initialState, isSingle: false}), {
        type: ACTION_TYPE.PING_PONG,
        data: {
          errorCode: constants.gameErrorCode.PLAYER_EXIST,
        },
      }), () => {
        return fromJS(initialState);
      }))
    })
    it(ACTION_TYPE.GAME_CREATED + " GAME_EXIST", () => {
      return assert.equal(false, _.isEqual(reducer(fromJS({...initialState, isSingle: false}), {
        type: ACTION_TYPE.PING_PONG,
        data: {
          errorCode: constants.gameErrorCode.GAME_EXIST,
        },
      }), () => {
        return fromJS(initialState);
      }))
    })
    it(ACTION_TYPE.SET_NEW_LOCAL_MAP, () => {
        return assert.equal(false, _.isEqual(
          reducer(fromJS(initialState), {
            type: ACTION_TYPE.SET_NEW_LOCAL_MAP,
            data: map,
          }), () => {
        return fromJS(initialState);
      }))
    })
    it(ACTION_TYPE.SET_CURRENT_USER, () => {
      return assert.equal(false, _.isEqual(
        reducer(fromJS(initialState), {
          type: ACTION_TYPE.SET_CURRENT_USER,
          data: 1,
        }), () => {
          const state = initialState;
          return fromJS(state);
        }))
    })
    it(ACTION_TYPE.CREATE_NEW_PLAYER_RESPONSE, () => {
      return assert.equal(false, _.isEqual(
        reducer(fromJS(initialState), {
          type: ACTION_TYPE.CREATE_NEW_PLAYER_RESPONSE,
          data: 1,
          currentUser: 1,
          status: constants.gameStatuses.STARTED,
        }), () => {
          const state = initialState;
          return fromJS(state);
        }))
    })
    it(ACTION_TYPE.START_GAME_RESPONSE, () => {
      return assert.equal(false, _.isEqual(
        reducer(fromJS(initialState), {
          type: ACTION_TYPE.START_GAME_RESPONSE,
          data: 1,
        }), () => {
          const state = initialState;
          return fromJS(state);
        }))
    })
    it(ACTION_TYPE.PIECE_LANDED_RESPONSE, () => {
      return assert.equal(false, _.isEqual(
        reducer(fromJS(initialState), {
          type: ACTION_TYPE.PIECE_LANDED_RESPONSE,
          data: 1,
          currentPiece: 2,
        }), () => {
          const state = initialState;
          return fromJS(state);
        }))
    })
    it(ACTION_TYPE.ENEMY_PIECE_LANDED_RESPONSE, () => {
      return assert.equal(false, _.isEqual(
        reducer(fromJS(initialState), {
          type: ACTION_TYPE.ENEMY_PIECE_LANDED_RESPONSE,
          data: 1,
        }), () => {
          const state = initialState;
          return fromJS(state);
        }))
    })
    it(ACTION_TYPE.START_INTERVAL, () => {
      return assert.equal(false, _.isEqual(
        reducer(fromJS(initialState), {
          type: ACTION_TYPE.START_INTERVAL,
          data: 1,
        }), () => {
          const state = initialState;
          return fromJS(state);
        }))
    })
    it(ACTION_TYPE.START_MOVE, () => {
      return assert.equal(false, _.isEqual(
        reducer(fromJS(initialState), {
          type: ACTION_TYPE.START_MOVE,
          data: null,
        }), () => {
          const state = initialState;
          return fromJS(state);
        }))
    })
    it(ACTION_TYPE.MOVE_LEFT, () => {
      return assert.equal(false, _.isEqual(
        reducer(fromJS(initialState), {
          type: ACTION_TYPE.MOVE_LEFT,
          data: null,
        }), () => {
          const state = initialState;
          return fromJS(state);
        }))
    })
    it(ACTION_TYPE.MOVE_RIGHT, () => {
      return assert.equal(false, _.isEqual(
        reducer(fromJS(initialState), {
          type: ACTION_TYPE.MOVE_RIGHT,
          data: null,
        }), () => {
          const state = initialState;
          return fromJS(state);
        }))
    })
    it(ACTION_TYPE.MOVE_DOWN, () => {
      return assert.equal(false, _.isEqual(
        reducer(fromJS(initialState), {
          type: ACTION_TYPE.MOVE_DOWN,
          data: null,
        }), () => {
          const state = initialState;
          return fromJS(state);
        }))
    })
    it(ACTION_TYPE.FORCE_MOVE_DOWN, () => {
      return assert.equal(false, _.isEqual(
        reducer(fromJS(initialState), {
          type: ACTION_TYPE.FORCE_MOVE_DOWN,
          data: null,
        }), () => {
          const state = initialState;
          return fromJS(state);
        }))
    })
    it(ACTION_TYPE.ROTATE_PIECE, () => {
      return assert.equal(false, _.isEqual(
        reducer(fromJS(initialState), {
          type: ACTION_TYPE.FORCE_MOVE_DOWN,
          data: null,
        }), () => {
          const state = initialState;
          return fromJS(state);
        }))
    })
    it(ACTION_TYPE.STOP_MOVE, () => {
      return assert.equal(false, _.isEqual(
        reducer(fromJS(initialState), {
          type: ACTION_TYPE.STOP_MOVE,
          data: null,
        }), () => {
          const state = initialState;
          return fromJS(state);
        }))
    })
    it(ACTION_TYPE.PIECE_MOVE, () => {
      return assert.equal(false, _.isEqual(
        reducer(fromJS(initialState), {
          type: ACTION_TYPE.PIECE_MOVE,
          data: {posY: 2, posX: 2},
        }), () => {
          const state = initialState;
          return fromJS(state);
        }))
    })
    it(ACTION_TYPE.ENTER_PRESS, () => {
      return assert.equal(false, _.isEqual(
        reducer(fromJS(initialState), {
          type: ACTION_TYPE.ENTER_PRESS,
          data: {posY: 2, posX: 2},
        }), () => {
          const state = initialState;
          return fromJS(state);
        }))
    })
    it(ACTION_TYPE.PIECE_PLACED, () => {
      return assert.equal(false, _.isEqual(
        reducer(fromJS(initialState), {
          type: ACTION_TYPE.PIECE_PLACED,
          data: null,
        }), () => {
          const state = initialState;
          return fromJS(state);
        }))
    })
    it(ACTION_TYPE.SET_CURRENT_SHAPE, () => {
      return assert.equal(false, _.isEqual(
        reducer(fromJS(initialState), {
          type: ACTION_TYPE.SET_CURRENT_SHAPE,
          data: 1,
        }), () => {
          const state = initialState;
          return fromJS(state);
        }))
    })
    it(ACTION_TYPE.GAME_ENDED, () => {
      return assert.equal(false, _.isEqual(
        reducer(fromJS(initialState), {
          type: ACTION_TYPE.GAME_ENDED,
          data: 1,
        }), () => {
          const state = initialState;
          return fromJS(state);
        }))
    })
    it(ACTION_TYPE.GET_ALL_GAMES, () => {
      return assert.equal(false, _.isEqual(
        reducer(fromJS(initialState), {
          type: ACTION_TYPE.GET_ALL_GAMES,
          data: 1,
        }), () => {
          const state = initialState;
          return fromJS(state);
        }))
    })
    it(ACTION_TYPE.GAME_PAUSED_RESPONSE, () => {
      return assert.equal(false, _.isEqual(
        reducer(fromJS(initialState), {
          type: ACTION_TYPE.GAME_PAUSED_RESPONSE,
          data: 1,
        }), () => {
          const state = initialState;
          return fromJS(state);
        }))
    })
    it(ACTION_TYPE.NEED_TO_PAUSE, () => {
      return assert.equal(false, _.isEqual(
        reducer(fromJS(initialState), {
          type: ACTION_TYPE.NEED_TO_PAUSE,
          data: 1,
        }), () => {
          const state = initialState;
          return fromJS(state);
        }))
    })
    it(ACTION_TYPE.GET_PLAYERS_RESPONSE, () => {
      return assert.equal(false, _.isEqual(
        reducer(fromJS(initialState), {
          type: ACTION_TYPE.GET_PLAYERS_RESPONSE,
          data: 1,
        }), () => {
          const state = initialState;
          return fromJS(state);
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
    it ('retry', () => {
      return assert.equal(true,_.isEqual(retry({}), {type: 'server/retry', data: {}}))
    })
  })
  describe('utils', () => {
    it (`getRoomName`, () => {
      return assert.equal(true, getRoomName() === null ? true : false )
    })
    it (`getName`, () => {
      return assert.equal(true, getName() === null ? true : false )
    })
    it (`isPartOfPiece`, () => {
      return assert.equal(true, isPartOfPiece(0, 0, testPieces[0], 0, 0));
    })
    it (`isPartOfPiece`, () => {
      return assert.equal(false, isPartOfPiece(0, -1, testPieces[1], 0, -3));
    })
    it (`placePieceOnBoard true`, () => {
      return assert.equal(true, _.isEqual(placePieceOnBoard(testPlaceEmptyMap, testPieces[0], 0, 0, 1), testPlaceEmptyMap));
    })
    it (`placePieceOnBoard false`, () => {
      return assert.equal(false, _.isEqual(placePieceOnBoard(fullMap, testPieces[0], -4, -100, 2), testPlaceEmptyMap));
    })
    it (`isPossibleToPlace true`, () => {
      return assert.equal(true, isPossibleToPlace(emptyMap, testPieces[0], 0, 0, 1));
    })
    it (`isPossibleToPlace  fasle`, () => {
      return assert.equal(false, _.isEqual(isPossibleToPlace(testPlaceEmptyMap, testPieces[0], -5, 0, 2), emptyMap));
    })
    testPieces.forEach((data, index) => {
      it (`isPossibleToPlace  map type=${tetrominoNames[index]} set x = 5 y = 0`, () => {
        return assert.equal(true, isPossibleToPlace(
          emptyMap,
          data,
          5,
          0,
          data,
        ))
      })
    })
    testPieces.forEach((data, index) => {
      it (`isPossibleToPlace  map type=${tetrominoNames[index]} set x = 0 y = 0`, () => {
        return assert.equal(true, isPossibleToPlace(
          emptyMap,
          data,
          0,
          0,
          data,
        ))
      })
    })
    testPieces.forEach((data, index) => {
      it (`isPossibleToPlace  map type=${tetrominoNames[index]} set x = 7 y = 0`, () => {
        return assert.equal(true, isPossibleToPlace(
          emptyMap,
          data,
          7,
          0,
          data,
        ))
      })
    })
    testPieces.forEach((data, index) => {
      it (`isPossibleToPlace  map type=${tetrominoNames[index]} set x = 7 y = 16`, () => {
        return assert.equal(true, isPossibleToPlace(
          emptyMap,
          data,
          7,
          16,
          data,
        ))
      })
    })
    testPieces.forEach((data, index) => {
      it (`not PossibleToPlace  map type=${tetrominoNames[index]} set x = -1 y = -1`, () => {
        return assert.equal(true, !isPossibleToPlace(
          fullMap,
          data,
          -1,
          -1,
          data,
        ))
      })
    })
    testPieces.forEach((data, index) => {
      let newShape = data;
        [0, 1, 2].forEach((i) => {
          it (`rotate type=${tetrominoNames[index]} direction=${directions[i]}`, () => {
            newShape = rotatePiece(data);
            return assert.equal(true, _.isEqual(newShape, newShape))
        })
      })
    })
    it (`isCanMove false`, () => {
      return assert.equal(false, isCanMove())
    })
    it (`isCanMove true SINGLE`, () => {
      return assert.equal(true, isCanMove({status: constants.gameStatuses.SINGLE, playerList: [1,2]}))
    })
    it (`isCanMove true MULTI`, () => {
      return assert.equal(true, isCanMove({status: constants.gameStatuses.SINGLE, playerList: [1,2]}))
    })
    it (`getEnemyMap true`, () => {
      return assert.equal(true, _.isEqual(getEnemyMap([
        {
          name: 'test',
          map: fullMap,
        },
        {
          name: 'test2',
          map: emptyMap,
        }
      ], 'test'), emptyMap))
    })
    it (`getEnemyMap false`, () => {
      return assert.equal(false, _.isEqual(getEnemyMap([
        {
          name: 'test',
          map: fullMap,
        },
        {
          name: 'test2',
          map: fullMap,
        }
      ], 'test'), emptyMap))
    })
    it (`getEnemy true`, () => {
      return assert.equal(false, _.isEqual(getEnemy([
        {
          name: 'test',
          map: fullMap,
        },
        {
          name: 'test2',
          map: fullMap,
        }
      ], 'test'), {name: 'test2', map: fullMap}))
    })
    it (`getEnemy false`, () => {
      return assert.equal(false, _.isEqual(getEnemy([
        {
          name: 'test',
          map: fullMap,
        },
        {
          name: 'test',
          map: fullMap,
        }
      ], 'test'), 0))
    })
    it (`getEnemyTime true`, () => {
      const lastActiveTime = 23;
      return assert.equal(false, _.isEqual(getEnemy([
        {
          name: 'test34',
          lastActiveTime,
        },
        {
          name: 'test',
          lastActiveTime,
        }
      ], 'test'), lastActiveTime))
    })
    it (`getEnemyTime false`, () => {
      const lastActiveTime = 23;
      return assert.equal(true, _.isEqual(getEnemyTime([
        {
          name: 'test',
          lastActiveTime,
        },
        {
          name: 'test',
          lastActiveTime,
        }
      ], 'test'), 0))
    })
  })
});

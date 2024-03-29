'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var constants = {

  colors: ['#0074D9', //blue
  '#39CCCC', //teal
  '#2ECC40', //green
  '#FFDC00', //yellow
  '#FF851B', //orange
  '#FF4136', //red
  '#F012BE'],

  pieces: [[[1, 1], [1, 1]], [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]], [[0, 1, 0], [1, 1, 0], [0, 1, 0]], [[0, 1, 0], [0, 1, 1], [0, 0, 1]], [[0, 1, 0], [1, 1, 0], [1, 0, 0]], [[0, 1, 1], [0, 1, 0], [0, 1, 0]], [[1, 1, 0], [0, 1, 0], [0, 1, 0]]],

  gameStatuses: {
    NOT_STARTED: 0,
    STARTED: 1,
    FINISHED: 2,
    PAUSED: 3,
    SINGLE: 4
  },
  gameErrorCode: {
    GAME_EXIST: 1,
    PLAYER_EXIST: 2,
    BOTH_EXIST: 3,
    CANT_CREATE: 4
  }

};

exports.default = constants;
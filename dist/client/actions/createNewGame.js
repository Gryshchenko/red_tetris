'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createNewGame;
function createNewGame(data) {

  return {
    type: 'server/createNewGame',
    data: data
  };
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endGame;
function endGame(data) {
  return {
    type: 'server/endGame',
    data: data
  };
}
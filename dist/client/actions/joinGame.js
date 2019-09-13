'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = joinGame;
function joinGame(data) {

  return {
    type: 'server/joinGame',
    data: data
  };
}
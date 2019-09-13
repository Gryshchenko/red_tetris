'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPlayers;
function getPlayers(data) {
  return {
    type: 'server/getAllPlayers',
    data: data
  };
}
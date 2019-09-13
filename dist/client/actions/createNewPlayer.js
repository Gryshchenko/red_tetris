'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createNewPlayer;
function createNewPlayer(data) {

  return {
    type: 'server/createNewPlayer',
    data: data
  };
}
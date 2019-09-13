'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createNewRoom;
function createNewRoom(data) {

  return {
    type: 'server/createNewRoom',
    data: data
  };
}
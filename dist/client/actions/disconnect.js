'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = disconnect;
function disconnect(data) {

  return {
    type: 'server/disconnect',
    data: data
  };
}
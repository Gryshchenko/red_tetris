'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pingPong;
function pingPong(data) {

  return {
    type: 'server/pingPong',
    data: data
  };
}
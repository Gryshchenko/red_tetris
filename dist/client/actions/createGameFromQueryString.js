'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createGameFromQueryString;
function createGameFromQueryString(data) {

  return {
    type: 'server/createGameFromQueryString',
    data: data
  };
}
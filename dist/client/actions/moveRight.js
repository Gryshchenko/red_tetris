'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = moveRight;
function moveRight() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  return {
    type: 'moveRight',
    data: data
  };
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = moveLeft;
function moveLeft() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  return {
    type: 'moveLeft',
    data: data
  };
}
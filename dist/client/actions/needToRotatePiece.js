'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = needToRotatePiece;
function needToRotatePiece() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  return {
    type: 'needToRotatePiece',
    data: data
  };
}
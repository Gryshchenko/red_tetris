'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setCurrentShape;
function setCurrentShape(data) {
  return {
    type: 'setCurrentShape',
    data: data
  };
}
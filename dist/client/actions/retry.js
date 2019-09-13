'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = retry;
function retry(data) {
  return {
    type: 'server/retry',
    data: data
  };
}
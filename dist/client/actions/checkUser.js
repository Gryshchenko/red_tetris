'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkUser;
function checkUser(data) {

  return {
    type: 'server/checkUser',
    data: data
  };
}
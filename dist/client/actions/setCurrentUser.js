'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setCurrentUser;
function setCurrentUser(data) {

  return {
    type: 'setCurrentUser',
    data: data
  };
}
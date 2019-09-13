'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = setNeedToPause;
function setNeedToPause(data) {
    return {
        type: 'needToPause',
        data: data
    };
}
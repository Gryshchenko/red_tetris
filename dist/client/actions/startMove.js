'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = startMove;
function startMove(data) {
    return {
        type: 'startMove',
        data: data
    };
};
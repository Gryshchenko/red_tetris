'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = stopMove;
function stopMove(data) {
    return {
        type: 'stopMove',
        data: data
    };
};
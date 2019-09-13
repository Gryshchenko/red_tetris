'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = pieceMove;
function pieceMove(data) {
    return {
        type: 'pieceMove',
        data: data
    };
}
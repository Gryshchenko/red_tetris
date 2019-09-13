'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = piecePlaced;
function piecePlaced(data) {
    return {
        type: 'piecePlaced',
        data: data
    };
};
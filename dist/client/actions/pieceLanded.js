'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = pieceLanded;
function pieceLanded(data) {
    return {
        type: 'server/pieceLanded',
        data: data
    };
}
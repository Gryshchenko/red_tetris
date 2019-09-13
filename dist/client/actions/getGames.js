'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getGames;
function getGames(data) {
    return {
        type: 'server/getAllGames',
        data: data
    };
}
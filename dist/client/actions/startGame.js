'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = startGame;
function startGame(data) {
    return {
        type: 'server/startGame',
        data: data
    };
}
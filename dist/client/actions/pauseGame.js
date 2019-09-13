'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = pauseGame;
function pauseGame(data) {
    return {
        type: 'server/pauseGame',
        data: data
    };
}
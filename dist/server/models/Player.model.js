'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var Model = _mongoose2.default.model;

var PlayerModel = new Schema({
    name: String,
    map: { type: [[Number]], default: null },
    lost: { type: Boolean, default: false },
    score: { type: Number, default: 0 },
    clearedRows: { type: Number, default: 0 },
    gameId: { type: String },
    socketId: { type: String },
    isHost: { type: Boolean },
    lastActiveTime: { type: Number, default: 0 },
    currentPiece: { type: Number, default: 1 }
});

var Player = Model('Player', PlayerModel);

module.exports = Player;
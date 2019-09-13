'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _const = require('../const');

var _const2 = _interopRequireDefault(_const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var Model = _mongoose2.default.model;

var GameModel = Schema({
    name: String,
    status: { type: Number, default: _const2.default.gameStatuses.NOT_STARTED },
    pieceList: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Piece' }],
    playerList: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Player' }]
}, {
    usePushEach: true
});

var Game = Model('Game', GameModel);

module.exports = Game;
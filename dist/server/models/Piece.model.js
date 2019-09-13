'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var Model = _mongoose2.default.model;

var PieceModel = new Schema({
    shape: { type: Array, default: [] },
    color: { type: String, default: '#0074D9' }
}, {
    usePushEach: true
});

var Piece = Model('Piece', PieceModel);

module.exports = Piece;
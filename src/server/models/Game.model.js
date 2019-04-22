import mongoose from 'mongoose';
import constants from '../const';

const Schema = mongoose.Schema;
const Model = mongoose.model;

const GameModel = Schema({
    name: String,
    status: { type: Number, default: constants.gameStatuses.NOT_STARTED },
    pieceList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Piece' }],
    playerList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]
}, {
    usePushEach: true
});

const Game = Model('Game', GameModel);

module.exports = Game;
import mongoose from 'mongoose';
import constants from '../const';

const Schema = mongoose.Schema;
const Model = mongoose.model;
const ObjectId = Schema.ObjectId;

const GameModel = Schema({
    name: String,
    status: { type: Number, default: constants.gameStatuses.NOT_STARTED },
    pieceList: [{ type: ObjectId, ref: 'Piece' }],
    playerList: [{ type: ObjectId, ref: 'Player' }]
});

GameModel.virtual('get').get(() => {
    return {
        id: this._id,
        name: this.name,
        status: this.status,
        pieceList: this.pieceList,
        playerList: this.playerList
    };
});

const Game = Model('Game', GameModel);

module.exports = Game;
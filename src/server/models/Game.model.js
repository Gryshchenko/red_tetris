import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Model = mongoose.model;
const ObjectId = Schema.ObjectId;

const GameModel = Schema({
    id: Number,
    name: String,
    status: { type: Number, default: 0 },
    pieceList: [{ type: ObjectId, ref: 'Piece' }],
    playerList: [{ type: ObjectId, ref: 'Player' }]
});

GameModel.virtual('info').get(() => {
    return {
        id: this.id,
        name: this.name,
        status: this.status,
        pieceList: this.pieceList,
        playerList: this.playerList
    };
});

const Game = Model('Game', GameModel);

module.exports = Game;
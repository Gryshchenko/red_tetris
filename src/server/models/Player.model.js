import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Model = mongoose.model;

const PlayerModel = new Schema({
    name: String,
    map: { type: [Number], default: [] },
    haveWon: { type: Boolean, default: false },
    score: { type: Number, default: 0 },
    gameId: { type: String },
    socketId: { type: String },
    isHost: { type: Boolean }
});

const Player = Model('Player', PlayerModel);

module.exports = Player;
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Model = mongoose.model;

const PlayerModel = new Schema({
    name: String,
    map: { type: [Number], default: [] },
    haveWon: { type: [Boolean], default: false },
    score: { type: Number, default: 0 },
    gameId: { type: String },
    socketId: { type: String },
    isHost: { type: Boolean }
});

PlayerModel.virtual('get').get(() => {
    return {
        id: this._id,
        name: this.name,
        map: this.map,
        haveWon: this.haveWon,
        score: this.score,
        gameId: this.gameId,
        socketId: this.socketId,
        isHost: this.isHost
    };
});

const Player = Model('Player', PlayerModel);

module.exports = Player;
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Model = mongoose.model;

const PlayerModel = new Schema({
    id: Number,
    name: String,
    map: { type: [Number], default: [] },
    haveWon: { type: [Boolean], default: false },
    score: {type: Number, default: 0},
    currentPiece: Number
});

PlayerModel.virtual('info').get(() => {
    return {
        id: this.id,
        name: this.name,
        map: this.map,
        haveWon: this.haveWon,
        score: this.score,
        currentPiece: this.currentPiece
    };
})

const Player = Model('Player', PlayerModel);

module.exports = Player;
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Model = mongoose.model;

const PlayerModel = new Schema({
    name: String,
    map: { type: [Number], default: [] },
    haveWon: { type: [Boolean], default: false },
    score: { type: Number, default: 0 },
    gameId: { type: Number, default: 0 }
});

PlayerModel.virtual('get').get(() => {
    console.log(this)
    return {
        id: this._id,
        name: this.name,
        map: this.map,
        haveWon: this.haveWon,
        score: this.score,
        gameId: this.gameId
    };
})

const Player = Model('Player', PlayerModel);

module.exports = Player;
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Model = mongoose.model;

const PieceModel = new Schema({
    shape: { type: Array, default: [] },
    color: { type: String, default: '#0074D9' }
}, {
    usePushEach: true
});

PieceModel.virtual('get').get(() => {
    return {
        id: this._id,
        shape: this.shape,
        color: this.color
    };
});

const Piece = Model('Piece', PieceModel);

module.exports = Piece;
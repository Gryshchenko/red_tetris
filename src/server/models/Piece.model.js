import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Model = mongoose.model;

const PieceModel = new Schema({
    id: Number,
    shape: { type: Array, default: [] },
    color: { type: String, default: 'blue' }
});

PieceModel.virtual('info').get(() => {
    return {
        id: this.id,
        shape: this.figure,
        color: this.color
    };
});

const Piece = Model('Piece', PieceModel);

module.exports = Piece;
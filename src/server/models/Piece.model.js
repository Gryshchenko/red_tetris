import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Model = mongoose.model;

const PieceModel = new Schema({
    id: Number,
    figure: { type: Array, default: [] },
    color: { type: String, default: 'blue' },
    coordX: { type: Number, default: 0 },
    coordY: { type: Number, default: 0 }
});

PieceModel.virtual('info').get(() => {
    return {
        id: this.id,
        figure: this.figure,
        color: this.color,
        coordX: this.coordX,
        coordY: this.coordY
    };
});

const Piece = Model('Piece', PieceModel);

module.exports = Piece;
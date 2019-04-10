import Piece from '../models/Piece.model';
import constants from '../const';
import { randomNumber, flipMatrix } from '../utils';

class PieceController {

    static async createPiece() {
        try {
            let figure = {};
            let figureType = randomNumber(7);

            figure.shape = constants.pieces[figureType];
            figure.color = constants.colors[figureType];
            for (let i = randomNumber(4); i < 4; i++) {
                flipMatrix(piece.shape);
            }
            let newPiece = await new Piece(figure).save();
            return newPiece.get;
        } catch (e) {
            throw `Error occured while creating piece: ${e}`;
        }
    }

    static async deletePiece(pieceId) {
        try {
            await Piece.findOneAndRemove({ _id: pieceId });
        } catch (e) {
            throw `Error occured while deleting piece: ${e}`;
        }
    }

}

export default PieceController;
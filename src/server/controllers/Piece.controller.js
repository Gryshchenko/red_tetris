import Piece from '../models/Piece.model';
import constants from '../const';
import { randomNumber, flipMatrix } from '../utils';

class PieceController {

    static async createPiece() {
        try {
            let piece = {};
            let pieceType = randomNumber(7);

            piece.shape = constants.pieces[pieceType];
            piece.color = constants.colors[pieceType];
            for (let i = randomNumber(4); i < 4; i++) {
                flipMatrix(piece.shape);
            }
            const newPiece = await new Piece(piece).save();
            return newPiece;
        } catch (e) {
            throw `Error occured while createPiece(): ${e}`;
        }
    }

    static async deletePiece(pieceId) {
        try {
            await Piece.findOneAndRemove({ _id: pieceId });
        } catch (e) {
            throw `Error occured while deletePiece(): ${e}`;
        }
    }

}

export default PieceController;
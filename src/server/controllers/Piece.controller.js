import Piece from '../models/Piece.model';
import constants from '../const';
import { randomNumber, flipMatrix } from '../utils';

class PieceController {
    static async createPiece() {
        let figure = {};
        let figureType = randomNumber(7);

        figure.shape = constants.pieces[figureType];
        figure.color = constants.colors[figureType];
        for (let i = randomNumber(4); i < 4; i++) {
            flipMatrix(piece.shape);
        }
        let newPiece = await new Piece(figure).save();
        return newPiece.info;
    }
}

export default PieceController;
import Game from '../models/Game.model';
import Piece from './Piece.controller';
import Player from './Player.controller';

class GameController {

    static async createNewGame(name) {
        try {
            let newGame = await new Game({ name }).save();
            for (let i = 0; i < 10; i++) {
                newGame.pieceList.push(await Piece.createPiece().id);
            }
            await newGame.save();
            return newGame.get;
        } catch (e) {
            throw `Error occured while creating a new game: ${e}`;
        }
    }

    static async getGameById(gameId) {
        try {
            let game = await Game.findOne({ _id: gameId }).populate('pieceList').populate('playerList');
            if (!game) {
                throw 'Game does not exists';
            }
            return game.get;
        } catch (e) {
            throw `Error occured while getting game: ${e}`;
        }
    }

    static async getGameByName(gameName) {
        try {
            let game = await Game.findOne({ name: gameName }).populate('pieceList').populate('playerList');
            if (!game) {
                throw 'Game does not exists';
            }
            return game.get;
        } catch (e) {
            throw `Error occured while getting game: ${e}`;
        }
    }

    static async updateGame(gameId, data) {
        try {
            let columnsToUpdate = {};
            if (data.status) columnsToUpdate.status = data.status;
            if (data.pieceList) columnsToUpdate.pieceList = data.pieceList;
            if (data.playerList) columnsToUpdate.playerList = data.playerList;
            let game = await Game.findOneAndUpdate({ _id: gameId }, columnsToUpdate, { new: true }).populate('pieceList').populate('playerList');
            if (!game) {
                throw 'Game does not exists';
            }
            return game.get;
        } catch (e) {
            throw `Error occured while updating game: ${e}`;
        }
    }

    static async deleteGame(gameId) {
        try {
            let game = await Game.findOne({ _id: gameId });
            game.pieceList.map(piece => {
                Piece.deletePiece(piece._id);
            });
            game.playerList.map(player => {
                Player.deletePlayer(player._id);
            });
            game.remove();
        } catch (e) {
            throw `Error occured while deleting game: ${e}`;
        }
    }

}

export default GameController;
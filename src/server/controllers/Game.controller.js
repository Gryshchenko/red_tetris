import Game from '../models/Game.model';
import Piece from './Piece.controller';
import Player from './Player.controller';

class GameController {

    static async createNewGame(name) {
        try {
            let newGame = await new Game({ name }).save();
            let pieceArray = [];

            for (let i = 0; i < 10; i++) {
                let piece = await Piece.createPiece();
                await pieceArray.push(piece);
            }
            newGame.pieceList = pieceArray.map(item => item.id);
            await newGame.save();
            return newGame;
        } catch (e) {
            throw `Error occured while createNewGames: ${e}`;
        }
    }

    static async getAllGames() {
        try {
            let games = await Game.find({}).populate('playerList').populate('pieceList');

            return games;
        } catch (e) {
            throw `Error occured while getAllGames: ${e}`;
        }
    }

    static async getGameById(gameId) {
        try {
            let game = await Game.findOne({ _id: gameId }).populate('pieceList').populate('playerList');

            return game;
        } catch (e) {
            throw `Error occured while getGameById: ${e}`;
        }
    }

    static async getGameByName(gameName) {
        try {
            let game = await Game.findOne({ name: gameName }).populate('pieceList').populate('playerList');

            return game;
        } catch (e) {
            throw `Error occured while getGameByName: ${e}`;
        }
    }

    static async updateGame(gameId, data) {
        try {
            let columnsToUpdate = {};
            if (data.status) columnsToUpdate.status = data.status;
            if (data.pieceList) columnsToUpdate.pieceList = data.pieceList;
            if (data.playerList) columnsToUpdate.playerList = data.playerList;
          // if (data.status) {
          //   Object.assign({}, columnsToUpdate, {status: data.status})
          // }
          // if (data.pieceList) {
          //   Object.assign({}, columnsToUpdate, {pieceList: data.pieceList})
          // }
          // if (data.playerList) {
          //   Object.assign({}, columnsToUpdate, {playerList: data.playerList})
          // }
          // console.error(columnsToUpdate);
            let game = await Game.findOneAndUpdate({ _id: gameId }, columnsToUpdate, { new: true }).populate('pieceList').populate('playerList');
            return game;
        } catch (e) {
            throw `Error occured while updateGame: ${e}`;
        }
    }

    static async deleteGame(gameId) {
        try {
            console.error(gameId)
            let game = await Game.findOne({ name: gameId });
            console.error(game);
            // game.pieceList.map(piece => {
            //     Piece.deletePiece(piece._id);
            // });
            game.playerList.map(player => {
                Player.deletePlayer(player._id);
            });
            game.remove();
        } catch (e) {
            throw `Error occured while deleteGame: ${e}`;
        }
    }

}

export default GameController;

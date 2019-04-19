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
            throw `Error occured while creating a new game: ${e}`;
        }
        // try {
        //     let game = await new Game({ name }).save()
        //     const piece1 = await Piece.createPiece()
        //     const piece2 = await Piece.createPiece()
        //     const piece3 = await Piece.createPiece()
        //     const piece4 = await Piece.createPiece()
        //     const piece5 = await Piece.createPiece()
        //     const piece6 = await Piece.createPiece()
        //     const piece7 = await Piece.createPiece()
        //     const piece8 = await Piece.createPiece()
        //     const piece9 = await Piece.createPiece()
        //     const piece10 = await Piece.createPiece()
        //     game.pieces.push(piece1.id)
        //     game.pieces.push(piece2.id)
        //     game.pieces.push(piece3.id)
        //     game.pieces.push(piece4.id)
        //     game.pieces.push(piece5.id)
        //     game.pieces.push(piece6.id)
        //     game.pieces.push(piece7.id)
        //     game.pieces.push(piece8.id)
        //     game.pieces.push(piece9.id)
        //     game.pieces.push(piece10.id)
        //     await game.save()
        //     return game.serialize
        //   }
      
        //   catch (err) { throw `Error occured while createNewGame(): ${err}` }
    }

    static async getGameById(gameId) {
        try {
            let game = await Game.findOne({ _id: gameId }).populate('pieceList').populate('playerList');
            if (!game) {
                return null;
            }
            return game;
        } catch (e) {
            throw `Error occured while getGameById: ${e}`;
        }
    }

    static async getGameByName(gameName) {
        try {
            let game = await Game.findOne({ name: gameName }).populate('pieceList').populate('playerList');
            console.log(game)
            if (!game) {
                return null;
            }
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
            let game = await Game.findOneAndUpdate({ _id: gameId }, columnsToUpdate, { new: true }).populate('pieceList').populate('playerList');
            if (!game) {
                return null;
            }
            return game;
        } catch (e) {
            throw `Error occured while updateGame: ${e}`;
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
            throw `Error occured while deleteGame: ${e}`;
        }
    }

}

export default GameController;
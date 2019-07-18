import Game from '../controllers/Game.controller.js';
import Player from '../controllers/Player.controller.js';
import Piece from '../controllers/Piece.controller.js';
import constants from '../const';
import { cloneDeepWith } from 'lodash';

export default socket => {
    socket.on('createNewPlayer', data => createNewPlayer(data, socket));

    socket.on('startGame', data => startGame(data, socket));

    socket.on('getAllGames', data => getAllGames(data, socket));

    socket.on('endGame', data => endGame(data, socket));

    socket.on('pieceLanded', data => pieceLand(data, socket));
}

const createNewPlayer = async (data, socket) => {
    try {
        let game = await Game.getGameByName(data.room);
        let isHost = false;

        if (!game) {
            game = await Game.createNewGame(data.room);
            isHost = true;
        }

        // if (game.playerList.length == 2) {
        //     throw 'Game is full';
        // }

        // if (game.status == constants.gameStatuses.STARTED) {
        //     throw 'Game already started';
        // }

        let player = await Player.createNewPlayer(data.name, game._id, socket.id, isHost);
        game = await Game.updateGame(game.id, { playerList: game.playerList.concat(player.id) });

        game.playerList.forEach(player => {
            global.io.to(player.socketId).emit(
                'action',
                {
                    type: 'PLAYER_CREATED',
                    data: game,
                    currentUser: player
                }
            );
        });
    } catch (e) {
        throw `Error occured while createNewPlayer event: ${e}`;
    }
}

const startGame = async (data, socket) => {
    try {
        // let game = await Game.getGameByName(data.room);

        // if (!game) {
        //     throw 'Game does not exists';
        // }

        // game = Game.updateGame(game.id, { status: constants.gameStatuses.STARTED });
        const game = await Game.updateGame(data.gameId, { status: constants.gameStatuses.STARTED });
        game.playerList.forEach(player => {
            global.io.to(player.socketId).emit(
                'action',
                {
                    type: 'GAME_STARTED',
                    data: game
                }
            );
        });
    } catch (e) {
        throw `Error occured while startGame event: ${e}`;
    }
}

const getAllGames = async (data, socket) => {
    try {
        let games = await Game.getAllGames();

        global.io.to(socket.id).emit(
            {
                type: 'GET_ALL_GAMES',
                data: games
            }
        );
    } catch (e) {
        throw `Error occured while getAllGames event: ${e}`;
    }
}

const endGame = async (data, socket) => {
    try {
        await Player.updatePlayer(data.playerId, { lost: true });
        let game = await Game.updateGame(data.gameId, { status: constants.gameStatuses['FINISHED'] });

        game.playerList.forEach(player => {
            global.io.to(player.socketId).emit(
                {
                    type: 'GAME_ENDED',
                    data: game
                }
            );
        });
    } catch (e) {
        throw `Error occured while endGame event: ${e}`;
    }
}

const pieceLand = async (data, socket) => {
    try {
        const updatedPlayer = await Player.updatePlayer(data.playerId, { map: data.playerMap, currentPiece: data.currentPiece + 1 });
        let game = await Game.getGameById(data.gameId);

        if (data.currentPiece >= game.pieceList.length - 4) {
            const piece = await Piece.createPiece()
            game.pieceList.push(piece.id);
        }

        const updatedGame = await Game.updateGame(game.id, { pieceList: game.pieceList });

        updatedGame.playerList.forEach(player => {
            console.log(player._id);
            console.log('----------------------------------------------');
            console.log(updatedPlayer.id);
            global.io.to(player.socketId).emit(
                'action',
                {
                    type: updatedPlayer.id == player._id ? 'PIECE_LANDED' : 'ENEMIES_PIECE_LANDED',
                    data: game,
                    currentPiece: data.currentPiece + 1
                }
            );
        });
    } catch (e) {
        throw `Error occured while pieceLand event: ${e}`;
    }
}
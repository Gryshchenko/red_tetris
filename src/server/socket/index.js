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

    socket.on('pieceLand', data => pieceLand(data, socket));
}

const createNewPlayer = async (data, socket) => {
    try {
        let game = await Game.getGameByName(data.room);
        let isHost = false;

        if (!game) {
            game = await Game.createNewGame(data.room);
            isHost = true;
        }

        if (game.status == constants.gameStatuses.STARTED) {
            throw 'Game already started';
        }

        let player = await Player.createNewPlayer(data.name, game._id, socket.id, isHost);
        game = await Game.updateGame(game.id, { playerList: game.playerList.concat(player.id) });

        game.playerList.forEach(player => {
            global.io.to(player.socketId).emit('action', {
                type: 'server/createNewPlayerResponse',
                data: game,
            }
            );
        });
    } catch (e) {
        throw `Error occured while createNewPlayer event: ${e}`;
    }
}

const startGame = async (data, socket) => {
    try {
        let game = await Game.getGameByName(data.room);

        if (!game) {
            throw 'Game does not exists';
        }

        game = Game.updateGame(game.id, { status: constants.gameStatuses['STARTED'] });
        game.playerList.forEach(player => {
            global.io.to(player.socketId).emit(
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
        await Player.updatePlayer(data.playerId, { map: data.playerMap });
        let newPieceList = cloneDeepWith(game.pieceList);

        newPieceList.push(await Piece.createPiece().id);
        let game = await Game.updateGame(gameId, { pieceList: newPieceList });
        game.playerList.forEach(player => {
            global.io.to(player.socketId).emit(
                {
                    type: 'PIECE_LANDED',
                    data: game
                }
            );
        });
    } catch (e) {
        throw `Error occured while pieceLand event: ${e}`;
    }
}
import Game from '../controllers/Game.controller.js';
import Player from '../controllers/Player.controller.js';
import Piece from '../controllers/Piece.controller.js';
import constants from '../const';

export default socket => {
    socket.on('createNewPlayer', data => createNewPlayer(data, socket));

    socket.on('startGame', data => startGame(data, socket));

    socket.on('getAllGames', data => getAllGames(data, socket));
}

const createNewPlayer = async (data, socket) => {
    try {
        let game = await Game.getGameByName(data.room);
        let isHost = false;

        if (!game) {
            game = await Game.createNewGame(data.room);
            console.log('Game created!!!')
            isHost = true;
        }

        if (game.status == constants.gameStatuses.STARTED) {
            throw 'Game already started';
        }

        let player = await Player.createNewPlayer(data.name, game._id, socket.id, isHost);
        console.log('Player created!!!')
        game = await Game.updateGame(game.id, { playerList: game.playerList.concat(player.id)});
        console.log('Game updated!!!')

        game.playerList.forEach(player => {
            global.io.to(player.socketId).emit(
                {
                    type: 'NEW_PLAYER_CREATED',
                    data: game
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

        game = Game.updateGame(game.id, {status: constants.gameStatuses['STARTED']});
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
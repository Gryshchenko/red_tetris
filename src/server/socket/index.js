import Game from '../controllers/Game.controller.js';
import Player from '../controllers/Player.controller.js';
import Piece from '../controllers/Piece.controller.js';
import constants from '../const';

export default socket => {
    socket.on('createNewPlayer', data => createNewPlayer(data, socket));
}

const createNewPlayer = async (data, socket) => {
    try {
        let game = await Game.getGameByName(data.gameName);
        let isHost = false;

        if (!game) {
            game = await Game.createNewGame(data.gameName);
            isHost = true;
        }

        if (game.status == constants.gameStatuses.STARTED) {
            throw 'Game already started';
        }

        let player = await Player.createNewPlayer(data.playerName, game._id, socket.id, isHost);
        game = await Game.updateGame(game._id, {
            playerList: game.playerList.push(player._id)
        });

        global.io.to(socket.id).emit({
            response: {
                type: 'NEW_PLAYER_CREATED',
                data: game
            }
        });
    } catch (e) {
        throw `Error occured while creating player: ${e}`;
    }
}
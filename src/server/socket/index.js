import Game from '../controllers/Game.controller.js';
import Player from '../controllers/Player.controller.js';
import Piece from '../controllers/Piece.controller.js';
import constants from '../const';

export default socket => {
    socket.on('createNewPlayer', data => createNewPlayer(data, socket));
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
        game = await Game.updateGame(game._id, {
            playerList: game.playerList.push(player._id)
        });
        console.log('Game updated!!!')

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
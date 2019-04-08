import Game from '../controllers/Game.controller.js'
import Player from '../controllers/Player.controller.js'
import Piece from '../controllers/Piece.controller.js'

export default socket => {
    socket.on('createNewPlayer', data => createNewPlayer(data, socket));
}

const createNewPlayer = (data, socket) => {
    console.log(data, socket);
    try {
        global.io.to(socket.id).emit('action', {
            type: 'NEW_PLAYER_CREATED',
            data: data,
            message: 'Player created! (no)'
        });
    } catch (e) {
        console.log(e);
    }
}
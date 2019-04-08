import Game from '../controllers/Game.controller.js'
import Player from '../controllers/Player.controller.js'
import Piece from '../controllers/Piece.controller.js'

export default socket => {
    socket.on('createNewPlayer', data => createNewPlayer(data, socket));
}

const createNewPlayer = (data, socket) => {
    console.log(data, socket);
}
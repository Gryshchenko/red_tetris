import Game from '../controllers/Game.controller.js';
import Player from '../controllers/Player.controller.js';
import Piece from '../controllers/Piece.controller.js';
import constants from '../const';

export default socket => {

    socket.on('createGameFromQueryString', data => createGameFromQueryString(data, socket));

    socket.on('retry', data => retry(data, socket));

    socket.on('createNewPlayer', data => createNewPlayer(data, socket));

    socket.on('createNewGame', data => createNewGame(data, socket));

    socket.on('checkUser', data => checkUser(data, socket));

    socket.on('joinGame', data => joinGame(data, socket));

    socket.on('startGame', data => startGame(data, socket));

    socket.on('getAllGames', data => getAllGames(data, socket));

    socket.on('endGame', data => endGame(data, socket));

    socket.on('pieceLanded', data => pieceLand(data, socket));

    socket.on('disconnect', data => disconnect(data, socket));

    socket.on('pingPong', data => pingPong(data, socket));

    socket.on('pauseGame', data => pauseGame(data, socket));
}

const retry = async (data, socket) => {
    await Game.deleteGame(data.room);
    data.playerList.forEach(async player => {
      if (player.isHost) {
        await createNewPlayer({name: player.name, room: data.room}, player.socketId)
      }
    });
     data.playerList.forEach(async player => {
        if (!player.isHost) {
          await joinGame({name: player.name, room: data.room}, player.socketId)
        }
      });
}

const pauseGame = async (data, socket) => {
  try {
    let game = await Game.getGameById(data.gameId);

    if (!game) {
      throw `Game ${data.gameId} not found`;
    }

    if (game.status == 2) {
      throw `Game ${data.gameId} was already finished`;
    }

    game = await Game.updateGame(game.id, {  status: game.status == 3 ? 1 : constants.gameStatuses.PAUSED });

    game.playerList.forEach(player => {
      global.io.to(player.socketId).emit(
          'action',
          {
              type: 'GAME_PAUSED',
              data: game
          }
      );
  });

  } catch (e) {
    throw `Error occured while pauseGame event: ${e}`;
  }
}

const disconnect = async (data, socket) => {
    try {
        let player = await Player.getPlayer(data.playerId);

        if (player) {
            player.remove().exec();
        } else {
            throw "This player does not exists";
        }

        let game = await Game.getGameById(data.gameId);

        if (!game) {
            throw "This room does not exists";
        }

        game.playerList.forEach(player => {
            global.io.to(player.socketId).emit(
                'action',
                {
                    type: 'PLAYER_DISCONNECTED',
                    data: game
                }
            );
        });
    } catch (e) {
        throw `Error occured while disconnect event: ${e}`;
    }
}

const createGameFromQueryString = async (data, socket) => {
  try {
    const game = await Game.getGameByName(data.room);
    const player = await Player.getPlayerByName(data.name);
    if (!game && !player) {
      await createNewPlayer(data,socket);
    } else if (game && !player) {
      await joinGame(data, socket);
    } else {
      global.io.to(socket.id).emit(
        'action',
        {
          type: 'QUERY_GAME_RESPONSE',
          data: null,
          currentUser: null,
          errorCode: constants.gameErrorCode.CANT_CREATE,
        });
    }

  } catch (e) {
    throw `Error occured while createGameFromQueryString event: ${e}`;
  }
}

const createNewGame = async (data, socket) => {
  try {
    const game = await Game.getGameByName(data.room);
    const player = await Player.getPlayerByName(data.name);
    if (!game && !player) {
      await createNewPlayer(data,socket);
    } else {
      const playerErrorCode = player ? constants.gameErrorCode.PLAYER_EXIST : null;
      const gameErrorCode = game ? constants.gameErrorCode.GAME_EXIST : null;
      global.io.to(socket.id).emit(
        'action',
        {
          type: 'GAME_CREATED',
          data: null,
          currentUser: null,
          errorCode: playerErrorCode && gameErrorCode ? constants.gameErrorCode.BOTH_EXIST : playerErrorCode || gameErrorCode,
        });
    }
  } catch (e) {
    throw `Error occured while createNewGame event: ${e}`;
  }

}
const pingPong = async (data, socket) => {
  try {
    await Player.updatePlayerOnlineStatus(data)
    setTimeout(() => {
      global.io.to(socket.id).emit(
        'action',
        {
          type: 'PING_PONG',
          data: data.lastActiveTime,
        }
      );
    }, 3000);
  } catch (e) {
    throw `Error occured while pingPong event: ${e}`;
  }

}
const checkUser = async (data, socket) => {
  try {
    const player = await Player.getPlayerByName(data);
    if (!player) {
        global.io.to(socket.id).emit(
          'action',
          {
            type: 'CHECK_USER',
            data: true,
          }
        );
    } else {
      global.io.to(socket.id).emit(
        'action',
        {
          type: 'CHECK_USER',
          data: false,
        });
    }
  } catch (e) {
    throw `Error occured while checkUser event: ${e}`;
  }

}
const joinGame = async (data, socket) => {
  try {
      let game = await Game.getGameByName(data.room);
      console.error(1, data.room);
      let player = await Player.createNewPlayer(data.name, game._id, socket.id, false);
      game = await Game.updateGame(game.id, { playerList: game.playerList.concat(player.id), status: constants.gameStatuses.NOT_STARTED });
      game.playerList.forEach(player => {
        global.io.to(player.socketId).emit(
          'action',
          {
            type: 'JOIN_GAME',
            data: game,
            currentUser: player,
            errorCode: 0,
          }
        );
      });
  } catch (e) {
    throw `Error occured while joinGame event: ${e}`;
  }

}

const createNewPlayer = async (data, socket) => {
    try {
        let game = await Game.createNewGame(data.room);
        const isHost = true;

        let player = await Player.createNewPlayer(data.name, game._id, socket.id, isHost);
        game = await Game.updateGame(game.id, { playerList: game.playerList.concat(player.id), status: constants.gameStatuses.NOT_STARTED });
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
        let game = await Game.getGameById(data.gameId);

        if (!game) {
            throw 'Game does not exists';
        }

        game = await Game.updateGame(data.gameId, { status: constants.gameStatuses.STARTED });
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
        let result = {};
        if (games) {
          games.map((game, idx) => {
            if (game && game.playerList[0]) {
              const isGameNotStart = game.status === constants.gameStatuses.NOT_STARTED;
              const isOnlyHost = game.playerList.length === 1 && game.playerList[0].isHost;
              const isPlayerOnline = game.playerList[0].lastActiveTime + 160 > Math.floor((new Date()).getTime() / 1000);
              if (isGameNotStart && isOnlyHost && isPlayerOnline) {
                Object.assign( result, {
                  [idx]: game,
                });
              }
            }
          })
        }

        global.io.to(socket.id).emit(
            'action',
            {
                type: 'GET_ALL_GAMES',
                data: result,
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

      // console.log(game);
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
        const updatedPlayer = await Player.updatePlayer(data.playerId, { map: data.playerMap, currentPiece: data.currentPiece + 1, score: data.score, clearedRows: data.clearedRows });
        let game = await Game.getGameById(data.gameId);

        if (data.currentPiece >= game.pieceList.length - 4) {
            const piece = await Piece.createPiece()
            game.pieceList.push(piece.id);
        }

        const updatedGame = await Game.updateGame(game.id, { pieceList: game.pieceList });

        updatedGame.playerList.forEach(player => {
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

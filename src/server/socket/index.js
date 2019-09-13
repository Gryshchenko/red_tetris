import Game from '../controllers/Game.controller.js';
import Player from '../controllers/Player.controller.js';
import Piece from '../controllers/Piece.controller.js';
import constants from '../const';
import {map as clearMap} from "../../client/reducers/index"

export default socket => {

    socket.on('createGameFromQueryString', data => createGameFromQueryString(data, socket));

    socket.on('retry', data => retry(data, socket));

    socket.on('createNewPlayer', data => createNewPlayer(data, socket));

    socket.on('createNewGame', data => createNewGame(data, socket));

    socket.on('checkUser', data => checkUser(data, socket));

    socket.on('joinGame', data => joinGame(data, socket));

    socket.on('startGame', data => startGame(data, socket));

    socket.on('getAllGames', data => getAllGames(data, socket));

    socket.on('getAllPlayers', data => getAllPlayers(data, socket));

    socket.on('endGame', data => endGame(data, socket));

    socket.on('pieceLanded', data => pieceLand(data, socket));

    socket.on('disconnect', data => disconnect(data, socket));

    socket.on('pingPong', data => pingPong(data, socket));

    socket.on('pauseGame', data => pauseGame(data, socket));
}

export const retry = async (data, socket) => {
  try {
    const newGame = await Game.updateGame(
      data.gameId,
      {
        status: data.status === constants.gameStatuses.SINGLE ? data.status : constants.gameStatuses.NOT_STARTED,
      });
    await data.playerList.forEach(async player => {
      if (player.isHost) {
        await Player.updatePlayer(player._id,{
          map: clearMap,
          lost: false,
          score: 0,
          clearedRows: 0,
          currentPiece: 1,
          isHost: player.isHost,
        });
      } else {
        await Player.updatePlayer(player._id, {
          map: clearMap,
          lost: false,
          score: 0,
          clearedRows: 0,
          currentPiece: 1,
          isHost: false,
        });
      }
    });

    let game = await Game.getGameByName(data.room);
    const result = {
      type: 'RETRY',
      data: game
    };
    if (data.test) {
      return result;
    } else {
      data.playerList.forEach(player => {
        global.io.to(player.socketId).emit(
          'action',
          {
            ...result,
            currentUser: player
          }
        );
      });
    }
  } catch (e) {
    throw `Error occured in retry event: ${e}`;
  }
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

    if (data.isSingle) {
      game = await Game.updateGame(game.id, {  status: game.status === constants.gameStatuses.PAUSED ? constants.gameStatuses.SINGLE : constants.gameStatuses.PAUSED });
    } else {
      game = await Game.updateGame(game.id, {  status: game.status === constants.gameStatuses.PAUSED ? constants.gameStatuses.STARTED : constants.gameStatuses.PAUSED });
    }

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

export const createGameFromQueryString = async (data, socket) => {
  try {
    const game = await Game.getGameByName(data.room);
    const player = await Player.getPlayerByName(data.name);

    if (game && game.playerList && game.playerList.length == 2) {
      throw `Game is full`;
    }

    if (game && game.status != constants.gameStatuses.NOT_STARTED) {
      throw `Game is finished`;
    }

    if (!game && !player) {
      await createNewPlayer(data,socket);
      return {
        errorCode: 0,
      };
    } else if (game && !player) {
      await joinGame(data, socket);
      return {
        errorCode: 0,
      };
    } else {
      const result = {
        type: 'QUERY_GAME_RESPONSE',
        data: null,
        currentUser: null,
        errorCode: constants.gameErrorCode.CANT_CREATE,
      };
      if (data.test) {
        return result;
      }
      global.io.to(socket.id).emit(
        'action',
        {
          ...result,
        });
    }

  } catch (e) {
    global.io.to(socket.id).emit(
      'action',
      {
        type: 'QUERY_GAME_RESPONSE',
        errorCode: constants.gameErrorCode.CANT_CREATE,
      }
    );
  }
}

export const createNewGame = async (data, socket) => {
  try {
    const game = await Game.getGameByName(data.room);
    const player = await Player.getPlayerByName(data.name);
    if (!game && !player) {
      await createNewPlayer(data,socket);
    } else {
      const playerErrorCode = player ? constants.gameErrorCode.PLAYER_EXIST : null;
      const gameErrorCode = game ? constants.gameErrorCode.GAME_EXIST : null;
      const result = {
        type: 'GAME_CREATED',
        data: null,
        currentUser: null,
        errorCode: playerErrorCode && gameErrorCode ? constants.gameErrorCode.BOTH_EXIST : playerErrorCode || gameErrorCode,
      };
      if (data.test) {
        return result;
      } else {
        global.io.to(socket.id).emit(
          'action',
          {
            ...result,
          });
      }
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
export const checkUser = async (data, socket) => {
  try {
    const player = await Player.getPlayerByName(data);
    const result = {
      type: 'CHECK_USER',
      data: !player ? true : false,

    }
    if (data.user) {
      return result;
    } else {
      global.io.to(socket.id).emit(
        'action',
        {
          ...result,
        });
    }
  } catch (e) {
    throw `Error occured while checkUser event: ${e}`;
  }

}
export const joinGame = async (data, socket) => {
  try {
      let game = await Game.getGameByName(data.room);
      let player = await Player.createNewPlayer(data.name, game._id, socket.id, false);

      if (!game) {
        throw `Game not exists`;
      }

      if (game && game.playerList && game.playerList.length == 2) {
        throw `Game is full`;
      }

      if (game && game.status != constants.gameStatuses.NOT_STARTED) {
        throw `Game is finished`;
      }

      game = await Game.updateGame(game.id, { playerList: game.playerList.concat(player.id), status: constants.gameStatuses.NOT_STARTED });
      const result = {
        type: 'JOIN_GAME',
        data: game,
        errorCode: 0,
      };
      if (data.test) {
        return result;
      } else {
        game.playerList.forEach(player => {
          global.io.to(player.socketId).emit(
            'action',
            {
              ...result,
              currentUser: player
            }
          );
        });
      }
  } catch (e) {
    global.io.to(socket.id).emit(
      'action',
      {
        type: 'JOIN_GAME',
        errorCode: constants.gameErrorCode.CANT_CREATE,
        text: e
      }
    );
  }

}

export const createNewPlayer = async (data, socket) => {
    try {
        let game = await Game.createNewGame(data.room);
        const isHost = true;
        const isSingleMode = data.isSingleMode;

        let player = await Player.createNewPlayer(data.name, game._id, socket.id, isHost);
        game = await Game.updateGame(
          game.id,
          {
            playerList: game.playerList.concat(player.id),
            status: isSingleMode ? constants.gameStatuses.SINGLE : constants.gameStatuses.NOT_STARTED,
          }
          );
        const result = {
          type: 'PLAYER_CREATED',
          data: game
        };
        if (data.test) {
          return result;
        }
        game.playerList.forEach(player => {
            global.io.to(player.socketId).emit(
                'action',
                {
                  ...result,
                  currentUser: player
                }
            );
        });
    } catch (e) {
        throw `Error occured while createNewPlayer event: ${e}`;
    }
}

export const startGame = async (data, socket) => {
    try {
        let game = await Game.getGameById(data.gameId);

        if (!game) {
            throw 'Game does not exists';
        }

        game = await Game.updateGame(data.gameId, { status: data.status });
        const result = {
          type: 'GAME_STARTED',
          data: game
        }
        if (data.test) {
          return result;
        }
        game.playerList.forEach(player => {
            global.io.to(player.socketId).emit(
                'action',
                {
                  ...result,
                }
            );
        });
    } catch (e) {
        throw `Error occured while startGame event: ${e}`;
    }
}

export const getAllGames = async (data, socket) => {
    try {
        let games = await Game.getAllGames();
        let result = {};
        if (games) {
          games.map((game, idx) => {
            if (game && game.playerList[0]) {
              const isGameNotStart = game.status === constants.gameStatuses.NOT_STARTED;
              const isOnlyHost = game.playerList.length === 1 && game.playerList[0].isHost;
              const isPlayerOnline = game.playerList[0].lastActiveTime + 8 > Math.floor((new Date()).getTime() / 1000);
              if (isGameNotStart && isOnlyHost && isPlayerOnline) {
                Object.assign( result, {
                  [idx]: game,
                });
              }
            }
          })
        }

        const data = {
          type: 'GET_ALL_GAMES',
          data: result,
        }
        if (data.test) {
          return data;
        } else {
          global.io.to(socket.id).emit(
            'action',
            {
              ...data,
            }
          );
        }
    } catch (e) {
        throw `Error occured while getAllGames event: ${e}`;
    }
}
const getAllPlayers = async (data, socket) => {
  try {
    let players = await Player.getTop20();
    global.io.to(socket.id).emit(
      'action',
      {
        type: 'GET_ALL_PLAYERS',
        data: players,
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
              'action',
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

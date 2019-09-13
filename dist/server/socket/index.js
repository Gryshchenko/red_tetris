'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllGames = exports.startGame = exports.createNewPlayer = exports.joinGame = exports.checkUser = exports.createNewGame = exports.createGameFromQueryString = exports.retry = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _GameController = require('../controllers/Game.controller.js');

var _GameController2 = _interopRequireDefault(_GameController);

var _PlayerController = require('../controllers/Player.controller.js');

var _PlayerController2 = _interopRequireDefault(_PlayerController);

var _PieceController = require('../controllers/Piece.controller.js');

var _PieceController2 = _interopRequireDefault(_PieceController);

var _const = require('../const');

var _const2 = _interopRequireDefault(_const);

var _index = require('../../client/reducers/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (socket) {

  socket.on('createGameFromQueryString', function (data) {
    return createGameFromQueryString(data, socket);
  });

  socket.on('retry', function (data) {
    return retry(data, socket);
  });

  socket.on('createNewPlayer', function (data) {
    return createNewPlayer(data, socket);
  });

  socket.on('createNewGame', function (data) {
    return createNewGame(data, socket);
  });

  socket.on('checkUser', function (data) {
    return checkUser(data, socket);
  });

  socket.on('joinGame', function (data) {
    return joinGame(data, socket);
  });

  socket.on('startGame', function (data) {
    return startGame(data, socket);
  });

  socket.on('getAllGames', function (data) {
    return getAllGames(data, socket);
  });

  socket.on('getAllPlayers', function (data) {
    return getAllPlayers(data, socket);
  });

  socket.on('endGame', function (data) {
    return endGame(data, socket);
  });

  socket.on('pieceLanded', function (data) {
    return pieceLand(data, socket);
  });

  socket.on('disconnect', function (data) {
    return disconnect(data, socket);
  });

  socket.on('pingPong', function (data) {
    return pingPong(data, socket);
  });

  socket.on('pauseGame', function (data) {
    return pauseGame(data, socket);
  });
};

var retry = exports.retry = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data, socket) {
    var newGame, game, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _GameController2.default.updateGame(data.gameId, {
              status: data.status === _const2.default.gameStatuses.SINGLE ? data.status : _const2.default.gameStatuses.NOT_STARTED
            });

          case 3:
            newGame = _context2.sent;
            _context2.next = 6;
            return data.playerList.forEach(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(player) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!player.isHost) {
                          _context.next = 5;
                          break;
                        }

                        _context.next = 3;
                        return _PlayerController2.default.updatePlayer(player._id, {
                          map: _index.map,
                          lost: false,
                          score: 0,
                          clearedRows: 0,
                          currentPiece: 1,
                          isHost: player.isHost
                        });

                      case 3:
                        _context.next = 7;
                        break;

                      case 5:
                        _context.next = 7;
                        return _PlayerController2.default.updatePlayer(player._id, {
                          map: _index.map,
                          lost: false,
                          score: 0,
                          clearedRows: 0,
                          currentPiece: 1,
                          isHost: false
                        });

                      case 7:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 6:
            _context2.next = 8;
            return _GameController2.default.getGameByName(data.room);

          case 8:
            game = _context2.sent;
            result = {
              type: 'RETRY',
              data: game
            };

            if (!data.test) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt('return', result);

          case 14:
            data.playerList.forEach(function (player) {
              global.io.to(player.socketId).emit('action', _extends({}, result, {
                currentUser: player
              }));
            });

          case 15:
            _context2.next = 20;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2['catch'](0);
            throw 'Error occured in retry event: ' + _context2.t0;

          case 20:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 17]]);
  }));

  return function retry(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var pauseGame = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data, socket) {
    var game;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _GameController2.default.getGameById(data.gameId);

          case 3:
            game = _context3.sent;

            if (game) {
              _context3.next = 6;
              break;
            }

            throw 'Game ' + data.gameId + ' not found';

          case 6:
            if (!(game.status == 2)) {
              _context3.next = 8;
              break;
            }

            throw 'Game ' + data.gameId + ' was already finished';

          case 8:
            if (!data.isSingle) {
              _context3.next = 14;
              break;
            }

            _context3.next = 11;
            return _GameController2.default.updateGame(game.id, { status: game.status === _const2.default.gameStatuses.PAUSED ? _const2.default.gameStatuses.SINGLE : _const2.default.gameStatuses.PAUSED });

          case 11:
            game = _context3.sent;
            _context3.next = 17;
            break;

          case 14:
            _context3.next = 16;
            return _GameController2.default.updateGame(game.id, { status: game.status === _const2.default.gameStatuses.PAUSED ? _const2.default.gameStatuses.STARTED : _const2.default.gameStatuses.PAUSED });

          case 16:
            game = _context3.sent;

          case 17:

            game.playerList.forEach(function (player) {
              global.io.to(player.socketId).emit('action', {
                type: 'GAME_PAUSED',
                data: game
              });
            });

            _context3.next = 23;
            break;

          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3['catch'](0);
            throw 'Error occured while pauseGame event: ' + _context3.t0;

          case 23:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 20]]);
  }));

  return function pauseGame(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var disconnect = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data, socket) {
    var player, game;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _PlayerController2.default.getPlayer(data.playerId);

          case 3:
            player = _context4.sent;

            if (!player) {
              _context4.next = 8;
              break;
            }

            player.remove().exec();
            _context4.next = 9;
            break;

          case 8:
            throw "This player does not exists";

          case 9:
            _context4.next = 11;
            return _GameController2.default.getGameById(data.gameId);

          case 11:
            game = _context4.sent;

            if (game) {
              _context4.next = 14;
              break;
            }

            throw "This room does not exists";

          case 14:

            game.playerList.forEach(function (player) {
              global.io.to(player.socketId).emit('action', {
                type: 'PLAYER_DISCONNECTED',
                data: game
              });
            });
            _context4.next = 20;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4['catch'](0);
            throw 'Error occured while disconnect event: ' + _context4.t0;

          case 20:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 17]]);
  }));

  return function disconnect(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

var createGameFromQueryString = exports.createGameFromQueryString = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(data, socket) {
    var game, player, result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _GameController2.default.getGameByName(data.room);

          case 3:
            game = _context5.sent;
            _context5.next = 6;
            return _PlayerController2.default.getPlayerByName(data.name);

          case 6:
            player = _context5.sent;

            if (!(!game && !player)) {
              _context5.next = 13;
              break;
            }

            _context5.next = 10;
            return createNewPlayer(data, socket);

          case 10:
            return _context5.abrupt('return', {
              errorCode: 0
            });

          case 13:
            if (!(game && !player)) {
              _context5.next = 19;
              break;
            }

            _context5.next = 16;
            return joinGame(data, socket);

          case 16:
            return _context5.abrupt('return', {
              errorCode: 0
            });

          case 19:
            result = {
              type: 'QUERY_GAME_RESPONSE',
              data: null,
              currentUser: null,
              errorCode: _const2.default.gameErrorCode.CANT_CREATE
            };

            if (!data.test) {
              _context5.next = 22;
              break;
            }

            return _context5.abrupt('return', result);

          case 22:
            global.io.to(socket.id).emit('action', _extends({}, result));

          case 23:
            _context5.next = 28;
            break;

          case 25:
            _context5.prev = 25;
            _context5.t0 = _context5['catch'](0);
            throw 'Error occured while createGameFromQueryString event: ' + _context5.t0;

          case 28:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 25]]);
  }));

  return function createGameFromQueryString(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

var createNewGame = exports.createNewGame = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(data, socket) {
    var game, player, playerErrorCode, gameErrorCode, result;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _GameController2.default.getGameByName(data.room);

          case 3:
            game = _context6.sent;
            _context6.next = 6;
            return _PlayerController2.default.getPlayerByName(data.name);

          case 6:
            player = _context6.sent;

            if (!(!game && !player)) {
              _context6.next = 12;
              break;
            }

            _context6.next = 10;
            return createNewPlayer(data, socket);

          case 10:
            _context6.next = 20;
            break;

          case 12:
            playerErrorCode = player ? _const2.default.gameErrorCode.PLAYER_EXIST : null;
            gameErrorCode = game ? _const2.default.gameErrorCode.GAME_EXIST : null;
            result = {
              type: 'GAME_CREATED',
              data: null,
              currentUser: null,
              errorCode: playerErrorCode && gameErrorCode ? _const2.default.gameErrorCode.BOTH_EXIST : playerErrorCode || gameErrorCode
            };

            if (!data.test) {
              _context6.next = 19;
              break;
            }

            return _context6.abrupt('return', result);

          case 19:
            global.io.to(socket.id).emit('action', _extends({}, result));

          case 20:
            _context6.next = 25;
            break;

          case 22:
            _context6.prev = 22;
            _context6.t0 = _context6['catch'](0);
            throw 'Error occured while createNewGame event: ' + _context6.t0;

          case 25:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 22]]);
  }));

  return function createNewGame(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();
var pingPong = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(data, socket) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _PlayerController2.default.updatePlayerOnlineStatus(data);

          case 3:
            setTimeout(function () {
              global.io.to(socket.id).emit('action', {
                type: 'PING_PONG',
                data: data.lastActiveTime
              });
            }, 3000);
            _context7.next = 9;
            break;

          case 6:
            _context7.prev = 6;
            _context7.t0 = _context7['catch'](0);
            throw 'Error occured while pingPong event: ' + _context7.t0;

          case 9:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 6]]);
  }));

  return function pingPong(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();
var checkUser = exports.checkUser = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(data, socket) {
    var player, result;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _PlayerController2.default.getPlayerByName(data);

          case 3:
            player = _context8.sent;
            result = {
              type: 'CHECK_USER',
              data: !player ? true : false

            };

            if (!data.user) {
              _context8.next = 9;
              break;
            }

            return _context8.abrupt('return', result);

          case 9:
            global.io.to(socket.id).emit('action', _extends({}, result));

          case 10:
            _context8.next = 15;
            break;

          case 12:
            _context8.prev = 12;
            _context8.t0 = _context8['catch'](0);
            throw 'Error occured while checkUser event: ' + _context8.t0;

          case 15:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[0, 12]]);
  }));

  return function checkUser(_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();
var joinGame = exports.joinGame = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(data, socket) {
    var game, player, result;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _GameController2.default.getGameByName(data.room);

          case 3:
            game = _context9.sent;
            _context9.next = 6;
            return _PlayerController2.default.createNewPlayer(data.name, game._id, socket.id, false);

          case 6:
            player = _context9.sent;
            _context9.next = 9;
            return _GameController2.default.updateGame(game.id, { playerList: game.playerList.concat(player.id), status: _const2.default.gameStatuses.NOT_STARTED });

          case 9:
            game = _context9.sent;
            result = {
              type: 'JOIN_GAME',
              data: game,
              errorCode: 0
            };

            if (!data.test) {
              _context9.next = 15;
              break;
            }

            return _context9.abrupt('return', result);

          case 15:
            game.playerList.forEach(function (player) {
              global.io.to(player.socketId).emit('action', _extends({}, result, {
                currentUser: player
              }));
            });

          case 16:
            _context9.next = 21;
            break;

          case 18:
            _context9.prev = 18;
            _context9.t0 = _context9['catch'](0);
            throw 'Error occured while joinGame event: ' + _context9.t0;

          case 21:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[0, 18]]);
  }));

  return function joinGame(_x16, _x17) {
    return _ref9.apply(this, arguments);
  };
}();

var createNewPlayer = exports.createNewPlayer = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(data, socket) {
    var game, isHost, isSingleMode, player, result;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return _GameController2.default.createNewGame(data.room);

          case 3:
            game = _context10.sent;
            isHost = true;
            isSingleMode = data.isSingleMode;
            _context10.next = 8;
            return _PlayerController2.default.createNewPlayer(data.name, game._id, socket.id, isHost);

          case 8:
            player = _context10.sent;
            _context10.next = 11;
            return _GameController2.default.updateGame(game.id, {
              playerList: game.playerList.concat(player.id),
              status: isSingleMode ? _const2.default.gameStatuses.SINGLE : _const2.default.gameStatuses.NOT_STARTED
            });

          case 11:
            game = _context10.sent;
            result = {
              type: 'PLAYER_CREATED',
              data: game
            };

            if (!data.test) {
              _context10.next = 15;
              break;
            }

            return _context10.abrupt('return', result);

          case 15:
            game.playerList.forEach(function (player) {
              global.io.to(player.socketId).emit('action', _extends({}, result, {
                currentUser: player
              }));
            });
            _context10.next = 21;
            break;

          case 18:
            _context10.prev = 18;
            _context10.t0 = _context10['catch'](0);
            throw 'Error occured while createNewPlayer event: ' + _context10.t0;

          case 21:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined, [[0, 18]]);
  }));

  return function createNewPlayer(_x18, _x19) {
    return _ref10.apply(this, arguments);
  };
}();

var startGame = exports.startGame = function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(data, socket) {
    var game, result;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _context11.next = 3;
            return _GameController2.default.getGameById(data.gameId);

          case 3:
            game = _context11.sent;

            if (game) {
              _context11.next = 6;
              break;
            }

            throw 'Game does not exists';

          case 6:
            _context11.next = 8;
            return _GameController2.default.updateGame(data.gameId, { status: data.status });

          case 8:
            game = _context11.sent;
            result = {
              type: 'GAME_STARTED',
              data: game
            };

            if (!data.test) {
              _context11.next = 12;
              break;
            }

            return _context11.abrupt('return', result);

          case 12:
            game.playerList.forEach(function (player) {
              global.io.to(player.socketId).emit('action', _extends({}, result));
            });
            _context11.next = 18;
            break;

          case 15:
            _context11.prev = 15;
            _context11.t0 = _context11['catch'](0);
            throw 'Error occured while startGame event: ' + _context11.t0;

          case 18:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined, [[0, 15]]);
  }));

  return function startGame(_x20, _x21) {
    return _ref11.apply(this, arguments);
  };
}();

var getAllGames = exports.getAllGames = function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(data, socket) {
    var games, result, _data;

    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _context12.next = 3;
            return _GameController2.default.getAllGames();

          case 3:
            games = _context12.sent;
            result = {};

            if (games) {
              games.map(function (game, idx) {
                if (game && game.playerList[0]) {
                  var isGameNotStart = game.status === _const2.default.gameStatuses.NOT_STARTED;
                  var isOnlyHost = game.playerList.length === 1 && game.playerList[0].isHost;
                  var isPlayerOnline = game.playerList[0].lastActiveTime + 8 > Math.floor(new Date().getTime() / 1000);
                  if (isGameNotStart && isOnlyHost && isPlayerOnline) {
                    Object.assign(result, _defineProperty({}, idx, game));
                  }
                }
              });
            }

            _data = {
              type: 'GET_ALL_GAMES',
              data: result
            };

            if (!_data.test) {
              _context12.next = 11;
              break;
            }

            return _context12.abrupt('return', _data);

          case 11:
            global.io.to(socket.id).emit('action', _extends({}, _data));

          case 12:
            _context12.next = 17;
            break;

          case 14:
            _context12.prev = 14;
            _context12.t0 = _context12['catch'](0);
            throw 'Error occured while getAllGames event: ' + _context12.t0;

          case 17:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined, [[0, 14]]);
  }));

  return function getAllGames(_x22, _x23) {
    return _ref12.apply(this, arguments);
  };
}();
var getAllPlayers = function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(data, socket) {
    var players;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return _PlayerController2.default.getTop20();

          case 3:
            players = _context13.sent;

            global.io.to(socket.id).emit('action', {
              type: 'GET_ALL_PLAYERS',
              data: players
            });
            _context13.next = 10;
            break;

          case 7:
            _context13.prev = 7;
            _context13.t0 = _context13['catch'](0);
            throw 'Error occured while getAllGames event: ' + _context13.t0;

          case 10:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined, [[0, 7]]);
  }));

  return function getAllPlayers(_x24, _x25) {
    return _ref13.apply(this, arguments);
  };
}();

var endGame = function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(data, socket) {
    var game;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _context14.next = 3;
            return _PlayerController2.default.updatePlayer(data.playerId, { lost: true });

          case 3:
            _context14.next = 5;
            return _GameController2.default.updateGame(data.gameId, { status: _const2.default.gameStatuses['FINISHED'] });

          case 5:
            game = _context14.sent;


            game.playerList.forEach(function (player) {
              global.io.to(player.socketId).emit('action', {
                type: 'GAME_ENDED',
                data: game
              });
            });
            _context14.next = 12;
            break;

          case 9:
            _context14.prev = 9;
            _context14.t0 = _context14['catch'](0);
            throw 'Error occured while endGame event: ' + _context14.t0;

          case 12:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined, [[0, 9]]);
  }));

  return function endGame(_x26, _x27) {
    return _ref14.apply(this, arguments);
  };
}();

var pieceLand = function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(data, socket) {
    var updatedPlayer, game, piece, updatedGame;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _context15.next = 3;
            return _PlayerController2.default.updatePlayer(data.playerId, { map: data.playerMap, currentPiece: data.currentPiece + 1, score: data.score, clearedRows: data.clearedRows });

          case 3:
            updatedPlayer = _context15.sent;
            _context15.next = 6;
            return _GameController2.default.getGameById(data.gameId);

          case 6:
            game = _context15.sent;

            if (!(data.currentPiece >= game.pieceList.length - 4)) {
              _context15.next = 12;
              break;
            }

            _context15.next = 10;
            return _PieceController2.default.createPiece();

          case 10:
            piece = _context15.sent;

            game.pieceList.push(piece.id);

          case 12:
            _context15.next = 14;
            return _GameController2.default.updateGame(game.id, { pieceList: game.pieceList });

          case 14:
            updatedGame = _context15.sent;


            updatedGame.playerList.forEach(function (player) {
              global.io.to(player.socketId).emit('action', {
                type: updatedPlayer.id == player._id ? 'PIECE_LANDED' : 'ENEMIES_PIECE_LANDED',
                data: game,
                currentPiece: data.currentPiece + 1
              });
            });
            _context15.next = 21;
            break;

          case 18:
            _context15.prev = 18;
            _context15.t0 = _context15['catch'](0);
            throw 'Error occured while pieceLand event: ' + _context15.t0;

          case 21:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined, [[0, 18]]);
  }));

  return function pieceLand(_x28, _x29) {
    return _ref15.apply(this, arguments);
  };
}();
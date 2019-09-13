'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Player = require('../models/Player.model');

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayerController = function () {
  function PlayerController() {
    _classCallCheck(this, PlayerController);
  }

  _createClass(PlayerController, null, [{
    key: 'createNewPlayer',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(name, gameId, socketId, isHost) {
        var newPlayer, oldPlayer;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return new _Player2.default({ name: name, gameId: gameId, socketId: socketId, isHost: isHost });

              case 3:
                newPlayer = _context.sent;
                _context.next = 6;
                return this.getPlayerByName(newPlayer.name);

              case 6:
                oldPlayer = _context.sent;

                if (!oldPlayer) {
                  _context.next = 10;
                  break;
                }

                _context.next = 10;
                return this.deletePlayer(oldPlayer._id);

              case 10:
                _context.next = 12;
                return newPlayer.save();

              case 12:
                return _context.abrupt('return', newPlayer);

              case 15:
                _context.prev = 15;
                _context.t0 = _context['catch'](0);
                throw _context.t0;

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 15]]);
      }));

      function createNewPlayer(_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      }

      return createNewPlayer;
    }()
  }, {
    key: 'deletePlayer',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(playerId) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _Player2.default.remove({ _id: playerId });

              case 3:
                _context2.next = 8;
                break;

              case 5:
                _context2.prev = 5;
                _context2.t0 = _context2['catch'](0);
                throw _context2.t0;

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 5]]);
      }));

      function deletePlayer(_x5) {
        return _ref2.apply(this, arguments);
      }

      return deletePlayer;
    }()
  }, {
    key: 'getPlayers',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var players;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _Player2.default.find({});

              case 3:
                players = _context3.sent;
                return _context3.abrupt('return', players);

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3['catch'](0);
                throw 'Error occured while getAllPlayers: ' + _context3.t0;

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function getPlayers() {
        return _ref3.apply(this, arguments);
      }

      return getPlayers;
    }()
  }, {
    key: 'getTop20',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var players;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _Player2.default.find({
                  score: { $gt: 1 }
                }).limit(20).sort({ score: -1 }).exec();

              case 3:
                players = _context4.sent;
                return _context4.abrupt('return', players);

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4['catch'](0);
                throw 'Error occured while getTop20: ' + _context4.t0;

              case 10:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 7]]);
      }));

      function getTop20() {
        return _ref4.apply(this, arguments);
      }

      return getTop20;
    }()
  }, {
    key: 'getPlayer',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(playerId) {
        var player;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _Player2.default.findOne({ _id: playerId });

              case 3:
                player = _context5.sent;
                return _context5.abrupt('return', player);

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5['catch'](0);
                throw _context5.t0;

              case 10:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 7]]);
      }));

      function getPlayer(_x6) {
        return _ref5.apply(this, arguments);
      }

      return getPlayer;
    }()
  }, {
    key: 'getPlayerByName',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(playerName) {
        var player;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return _Player2.default.findOne({ name: playerName });

              case 3:
                player = _context6.sent;
                return _context6.abrupt('return', player);

              case 7:
                _context6.prev = 7;
                _context6.t0 = _context6['catch'](0);
                throw _context6.t0;

              case 10:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 7]]);
      }));

      function getPlayerByName(_x7) {
        return _ref6.apply(this, arguments);
      }

      return getPlayerByName;
    }()
  }, {
    key: 'updatePlayerOnlineStatus',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(data) {
        var columnsToUpdate, player;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                columnsToUpdate = {};

                if (data.lastActiveTime) columnsToUpdate.lastActiveTime = data.lastActiveTime;
                _context7.next = 5;
                return _Player2.default.findOneAndUpdate({ _id: data.playerId }, columnsToUpdate);

              case 5:
                player = _context7.sent;
                return _context7.abrupt('return', player);

              case 9:
                _context7.prev = 9;
                _context7.t0 = _context7['catch'](0);
                throw _context7.t0;

              case 12:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 9]]);
      }));

      function updatePlayerOnlineStatus(_x8) {
        return _ref7.apply(this, arguments);
      }

      return updatePlayerOnlineStatus;
    }()
  }, {
    key: 'updatePlayer',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(playerId, data) {
        var columnsToUpdate, player;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                columnsToUpdate = {};

                if (data.map) columnsToUpdate.map = data.map;
                if (data.lost) columnsToUpdate.lost = data.lost;
                if (data.score > -1) columnsToUpdate.score = data.score;
                if (data.clearedRows > -1) columnsToUpdate.clearedRows = data.clearedRows;
                if (data.currentPiece > -1) columnsToUpdate.currentPiece = data.currentPiece;

                _context8.next = 9;
                return _Player2.default.findOneAndUpdate({ _id: playerId }, columnsToUpdate, { new: true });

              case 9:
                player = _context8.sent;
                return _context8.abrupt('return', player);

              case 13:
                _context8.prev = 13;
                _context8.t0 = _context8['catch'](0);
                throw _context8.t0;

              case 16:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 13]]);
      }));

      function updatePlayer(_x9, _x10) {
        return _ref8.apply(this, arguments);
      }

      return updatePlayer;
    }()
  }]);

  return PlayerController;
}();

exports.default = PlayerController;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Game = require('../models/Game.model');

var _Game2 = _interopRequireDefault(_Game);

var _Piece = require('./Piece.controller');

var _Piece2 = _interopRequireDefault(_Piece);

var _Player = require('./Player.controller');

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameController = function () {
    function GameController() {
        _classCallCheck(this, GameController);
    }

    _createClass(GameController, null, [{
        key: 'createNewGame',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(name) {
                var newGame, pieceArray, i, piece;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return new _Game2.default({ name: name }).save();

                            case 3:
                                newGame = _context.sent;
                                pieceArray = [];
                                i = 0;

                            case 6:
                                if (!(i < 10)) {
                                    _context.next = 15;
                                    break;
                                }

                                _context.next = 9;
                                return _Piece2.default.createPiece();

                            case 9:
                                piece = _context.sent;
                                _context.next = 12;
                                return pieceArray.push(piece);

                            case 12:
                                i++;
                                _context.next = 6;
                                break;

                            case 15:
                                newGame.pieceList = pieceArray.map(function (item) {
                                    return item.id;
                                });
                                _context.next = 18;
                                return newGame.save();

                            case 18:
                                return _context.abrupt('return', newGame);

                            case 21:
                                _context.prev = 21;
                                _context.t0 = _context['catch'](0);
                                throw 'Error occured while createNewGames: ' + _context.t0;

                            case 24:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 21]]);
            }));

            function createNewGame(_x) {
                return _ref.apply(this, arguments);
            }

            return createNewGame;
        }()
    }, {
        key: 'getAllGames',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var games;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _context2.next = 3;
                                return _Game2.default.find({}).populate('playerList').populate('pieceList');

                            case 3:
                                games = _context2.sent;
                                return _context2.abrupt('return', games);

                            case 7:
                                _context2.prev = 7;
                                _context2.t0 = _context2['catch'](0);
                                throw 'Error occured while getAllGames: ' + _context2.t0;

                            case 10:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 7]]);
            }));

            function getAllGames() {
                return _ref2.apply(this, arguments);
            }

            return getAllGames;
        }()
    }, {
        key: 'getGameById',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(gameId) {
                var game;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.prev = 0;
                                _context3.next = 3;
                                return _Game2.default.findOne({ _id: gameId }).populate('pieceList').populate('playerList');

                            case 3:
                                game = _context3.sent;
                                return _context3.abrupt('return', game);

                            case 7:
                                _context3.prev = 7;
                                _context3.t0 = _context3['catch'](0);
                                throw 'Error occured while getGameById: ' + _context3.t0;

                            case 10:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[0, 7]]);
            }));

            function getGameById(_x2) {
                return _ref3.apply(this, arguments);
            }

            return getGameById;
        }()
    }, {
        key: 'getGameByName',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(gameName) {
                var game;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.prev = 0;
                                _context4.next = 3;
                                return _Game2.default.findOne({ name: gameName }).populate('pieceList').populate('playerList');

                            case 3:
                                game = _context4.sent;
                                return _context4.abrupt('return', game);

                            case 7:
                                _context4.prev = 7;
                                _context4.t0 = _context4['catch'](0);
                                throw 'Error occured while getGameByName: ' + _context4.t0;

                            case 10:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[0, 7]]);
            }));

            function getGameByName(_x3) {
                return _ref4.apply(this, arguments);
            }

            return getGameByName;
        }()
    }, {
        key: 'updateGame',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(gameId, data) {
                var columnsToUpdate, game;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.prev = 0;
                                columnsToUpdate = {};

                                if (data.status > -1) columnsToUpdate.status = data.status;
                                if (data.pieceList) columnsToUpdate.pieceList = data.pieceList;
                                if (data.playerList) columnsToUpdate.playerList = data.playerList;
                                _context5.next = 7;
                                return _Game2.default.findOneAndUpdate({ _id: gameId }, columnsToUpdate, { new: true }).populate('pieceList').populate('playerList');

                            case 7:
                                game = _context5.sent;
                                return _context5.abrupt('return', game);

                            case 11:
                                _context5.prev = 11;
                                _context5.t0 = _context5['catch'](0);
                                throw 'Error occured while updateGame: ' + _context5.t0;

                            case 14:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[0, 11]]);
            }));

            function updateGame(_x4, _x5) {
                return _ref5.apply(this, arguments);
            }

            return updateGame;
        }()
    }, {
        key: 'deleteGame',
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(gameId) {
                var game;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.prev = 0;
                                _context6.next = 3;
                                return _Game2.default.findOne({ name: gameId });

                            case 3:
                                game = _context6.sent;

                                game.playerList.map(function (player) {
                                    _Player2.default.deletePlayer(player._id);
                                });
                                game.remove();
                                _context6.next = 11;
                                break;

                            case 8:
                                _context6.prev = 8;
                                _context6.t0 = _context6['catch'](0);
                                throw 'Error occured while deleteGame: ' + _context6.t0;

                            case 11:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[0, 8]]);
            }));

            function deleteGame(_x6) {
                return _ref6.apply(this, arguments);
            }

            return deleteGame;
        }()
    }]);

    return GameController;
}();

exports.default = GameController;
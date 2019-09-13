'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Piece = require('../models/Piece.model');

var _Piece2 = _interopRequireDefault(_Piece);

var _const = require('../const');

var _const2 = _interopRequireDefault(_const);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PieceController = function () {
    function PieceController() {
        _classCallCheck(this, PieceController);
    }

    _createClass(PieceController, null, [{
        key: 'createPiece',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var piece, pieceType, newPiece;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                piece = {};
                                pieceType = (0, _utils.randomNumber)(7);


                                piece.shape = _const2.default.pieces[pieceType];
                                piece.color = _const2.default.colors[pieceType];
                                // for (let i = randomNumber(4); i < 4; i++) {
                                //     piece.shape = flipMatrix(piece.shape);
                                // }
                                _context.next = 7;
                                return new _Piece2.default(piece).save();

                            case 7:
                                newPiece = _context.sent;
                                return _context.abrupt('return', newPiece);

                            case 11:
                                _context.prev = 11;
                                _context.t0 = _context['catch'](0);
                                throw 'Error occured while createPiece(): ' + _context.t0;

                            case 14:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 11]]);
            }));

            function createPiece() {
                return _ref.apply(this, arguments);
            }

            return createPiece;
        }()
    }, {
        key: 'deletePiece',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(pieceId) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _context2.next = 3;
                                return _Piece2.default.findOneAndRemove({ _id: pieceId });

                            case 3:
                                _context2.next = 8;
                                break;

                            case 5:
                                _context2.prev = 5;
                                _context2.t0 = _context2['catch'](0);
                                throw 'Error occured while deletePiece(): ' + _context2.t0;

                            case 8:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 5]]);
            }));

            function deletePiece(_x) {
                return _ref2.apply(this, arguments);
            }

            return deletePiece;
        }()
    }]);

    return PieceController;
}();

exports.default = PieceController;
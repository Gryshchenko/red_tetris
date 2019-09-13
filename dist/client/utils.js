"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getEnemyMap = exports.getEnemy = exports.getEnemyTime = exports.clearFullRows = exports.rotatePiece = exports.isPossibleToPlace = exports.placePieceOnBoard = exports.getName = exports.getRoomName = exports.isCanMove = exports.isPartOfPiece = undefined;

var _const = require("../server/const");

var _const2 = _interopRequireDefault(_const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRoomName = function getRoomName(win) {
    if (!win) {
        return null;
    }
    var hash = win.location.hash;
    var roomNameStart = hash.indexOf("e/");
    var roomNameEnd = hash.indexOf("[");
    var roomName = hash.slice(roomNameStart + 2, roomNameEnd);
    if (roomNameStart === -1 || roomNameEnd === -1) {
        return null;
    }
    return roomName;
};
var getName = function getName(win) {
    if (!win) {
        return null;
    }
    var hash = win.location.hash;
    var nameStart = hash.indexOf("[");
    var nameEnd = hash.indexOf("]");
    var name = hash.slice(nameStart + 1, nameEnd);
    if (nameStart === -1 || nameEnd === -1) {
        return null;
    }
    return name;
};
var isPartOfPiece = exports.isPartOfPiece = function isPartOfPiece(i, j, shape, posX, posY) {
    var x = i - posX;
    var y = j - posY;

    if (x < 0 || x >= shape.length || y < 0 || y >= shape.length) {
        return false;
    }
    if (shape[y][x] === 1) {
        return true;
    } else {
        return false;
    }
};
var rotatePiece = function rotatePiece(shape) {
    var newShape = [];
    shape.map(function (row, i) {
        row.map(function (cell, j) {
            if (!newShape[j]) newShape[j] = [];
            newShape[j][row.length - i - 1] = shape[i][j];
        });
    });

    return newShape;
};
var placePieceOnBoard = function placePieceOnBoard(board, shape, posX, posY, currentPiece) {
    board.map(function (row, j) {
        row.map(function (cell, i) {
            if (isPartOfPiece(i, j, shape, posX, posY) && i >= 0 && i < 10 && j >= 0 && j < 21) {
                board[j][i] = currentPiece;
            }
        });
    });
    return board;
};
var isPossibleToPlace = function isPossibleToPlace(board, shape, posX, posY, currentPiece) {
    var prepearedShape = shape;
    try {
        prepearedShape.forEach(function (line, y) {
            line.forEach(function (bloc, x) {
                var newY = y + posY;
                var newX = x + posX;
                var onBoard = true;
                var free = true;

                if (newY >= 20 || newX < 0 || newX >= 10) onBoard = false;
                if (onBoard && newY >= 0 && board && board[newY][newX] != 0 && board[newY][newX] != currentPiece) free = false;
                if (prepearedShape[y][x] == 1 && (!onBoard || !free)) {

                    throw null;
                }
            });
        });
        return true;
    } catch (e) {
        return false;
    }
};
var getEnemy = function getEnemy(playerList, currentUser) {
    var result = null;
    playerList.forEach(function (player) {
        if (player.lastActiveTime && player.name !== currentUser) {
            result = player;
        }
    });
    return result;
};
var getEnemyTime = function getEnemyTime(playerList, currentUser) {
    var result = 0;
    playerList.forEach(function (player) {
        if (player.lastActiveTime && player.name !== currentUser) {
            result = player.lastActiveTime;
            return;
        }
    });
    return result;
};
var getEnemyMap = function getEnemyMap(playerList, currentUser) {
    var result = null;
    playerList.forEach(function (player) {
        if (player.map && player.name !== currentUser) {
            result = player.map;
        }
    });
    return result;
};
var clearFullRows = function clearFullRows(board) {
    var newBoard = board;
    var clearedRows = 0;

    for (var i = newBoard.length - 1; i >= 0; i--) {
        if (!newBoard[i].includes(0)) {
            newBoard.splice(i, 1);
            newBoard.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            clearedRows++;
            i++;
        }
    }
    return {
        clearedRows: clearedRows,
        newBoard: newBoard
    };
};

var isCanMove = function isCanMove(room) {
    if (!room) {
        return false;
    }
    var isSingle = room && room.status === _const2.default.gameStatuses.SINGLE;
    if (room && room.playerList && room.playerList.length === 2 || isSingle) {
        var isGameStarted = room && room.status === _const2.default.gameStatuses.STARTED;
        if (isSingle) {
            return true;
        }
        return isGameStarted ? true : false;
    }
    return false;
};

exports.isCanMove = isCanMove;
exports.getRoomName = getRoomName;
exports.getName = getName;
exports.placePieceOnBoard = placePieceOnBoard;
exports.isPossibleToPlace = isPossibleToPlace;
exports.rotatePiece = rotatePiece;
exports.clearFullRows = clearFullRows;
exports.getEnemyTime = getEnemyTime;
exports.getEnemy = getEnemy;
exports.getEnemyMap = getEnemyMap;
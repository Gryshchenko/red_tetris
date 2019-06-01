const getRoomName = () => {
    const hash = window.location.hash;
    const roomNameStart = hash.indexOf("e/");
    const roomNameEnd = hash.indexOf("[");
    const roomName = hash.slice(roomNameStart + 2, roomNameEnd);
    if (roomNameStart === -1 || roomNameEnd === -1) {
        return (null);
    }
    return roomName;
};

const getName = () => {
    const hash = window.location.hash;
    const nameStart = hash.indexOf("[");
    const nameEnd = hash.indexOf("]");
    const name = hash.slice(nameStart + 1, nameEnd);
    if (nameStart === -1 || nameEnd === -1) {
        return (null);
    }
    return name;
};

const isPartOfPiece = (i, j, shape, posX, posY) => {
    const x = i - posX;
    const y = j - posY;

    if (x < 0 || x >= shape.length || y < 0 || y >= shape.length) {
        return false;
    }
    if (shape[y][x] === 1) {
        return true;
    } else {
        return false;
    }
};
  
const rotatePiece = (shape) => {
    let newShape = [];
        shape.map((row, i) => {
            row.map((cell, j) => {
            if (!newShape[j]) newShape[j] = []
            newShape[j][row.length - i - 1] = shape[i][j]
            })
        })
    return newShape;
};
  
const placePieceOnBoard = (board, shape, posX, posY) => {
    board.map((row, j) => {
        row.map((cell, i) => {
            if (isPartOfPiece(i, j, shape, posX, posY) && (i >= 0 && i < 10 && j >= 0 && j < 21)) {
                board[j][i] = 1;
            }
        });
    });
    return board;
};

export {
    getRoomName,
    getName,
    placePieceOnBoard
};

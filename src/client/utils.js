import { cloneDeepWith } from 'lodash';

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
  
const placePieceOnBoard = (board, shape, posX, posY, currentPiece) => {
    board.map((row, j) => {
        row.map((cell, i) => {
            if (isPartOfPiece(i, j, shape, posX, posY) && (i >= 0 && i < 10 && j >= 0 && j < 21)) {
                board[j][i] = currentPiece;
            }
        });
    });
    return board;
};

const prepareShape = (shape) => {
//     let newShape = cloneDeepWith(shape);

//     // newShape.forEach((row, index) => {
//     //     if (!row.includes(1)) {
//     //     }
//     // });
// console.log(newShape)
//     for (let i = newShape.length - 1; i >= 2; i--) {
//         if (!newShape[i].includes(1)) {
//             newShape.unshift(i, 1);
//         }
//     }
//     return newShape;
    let newShape = [];

    shape.forEach((row, index) => {
        if (row.includes(1)) {
            newShape.push(row);
        }
    });

    console.log(newShape)

    return newShape;
}

const isPossibleToPlace = (board, shape, posX, posY, currentPiece) => {
    // let prepearedShape = prepareShape(shape);
let prepearedShape = shape;
    try {
        prepearedShape.forEach((line, y) => {
          line.forEach((bloc, x) => {
            const newY = y + posY
            const newX = x + posX
            let onBoard = true
            let free = true
    
            if (newY >= 20 || newX < 0 || newX >= 10) onBoard = false
            if (onBoard && newY >= 0 && board && board[newY][newX] != 0 && board[newY][newX] != currentPiece) free = false
            if (prepearedShape[y][x] == 1 && (!onBoard || !free)) {

                throw null
            }
          })
        })
        return true
      } catch (e) {
          return false;
      }    
  }

  const clearFullRows = (board) => {
    let newBoard = board;
    let clearedRows = 0;

    for (let i = newBoard.length - 1; i >= 0; i--) {
        if (!newBoard[i].includes(0)) {
            newBoard.splice(i, 1);
            newBoard.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            clearedRows++;
            i++;
        }
    }
    return {
        clearedRows,
        newBoard
    };
}

// const movePiece = (board, piece, currentPiece)

export {
    getRoomName,
    getName,
    placePieceOnBoard,
    isPossibleToPlace,
    rotatePiece,
    clearFullRows
};

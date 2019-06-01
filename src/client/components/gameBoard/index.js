import React from 'react'
import './styles.css';
import { connect } from 'react-redux';
import setCurrentUser from '../../actions/setCurrentUser';
import createNewPlayer from '../../actions/createNewPlayer';
import setNewLocalMap from '../../actions/setNewLocalMap';
import startInterval from '../../actions/startInterval';
import startMove from '../../actions/startMove';
import stopMove from '../../actions/stopMove';
import pieceMove from '../../actions/pieceMove';
import { getRoomName, getName, placePieceOnBoard, isPossibleToPlace } from '../../utils';
import { cloneDeepWith } from 'lodash';
import functional from 'react-functional';

// 1 - l_Block
// 2 - j_Block
// 3 - l_block
// 4 - o_Block
// 5 - s_Block
// 6 - t_Block
// 7 - z_Block

const BLOCK_NAME = {
  I_BLOCK: 1,
  J_BLOCK: 2,
  L_BLOCK: 3,
  O_BLOCK: 4,
  S_BLOCK: 5,
  T_BLOCK: 6,
  Z_BLOCK: 7,
}

// const map = [
//   [0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 2, 2, 2, 2, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
//   [0, 3, 3, 3, 3, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 4, 4, 0, 0, 0, 0, 0, 0, 0],
//   [0, 4, 4, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 5, 5, 0, 0, 0, 0, 0, 0],
//   [0, 5, 5, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 6, 0, 0, 7, 7, 0, 0, 0],
//   [0, 6, 6, 6, 0, 0, 7, 7, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// ];

const setBlockClassName = (color) => {
  switch (color) {
    case BLOCK_NAME.I_BLOCK:
    // return 'iBock';
    case BLOCK_NAME.J_BLOCK:
    // return 'jBock';
    case BLOCK_NAME.L_BLOCK:
    // return 'lBock';
    case BLOCK_NAME.O_BLOCK:
    // return 'oBock';
    case BLOCK_NAME.S_BLOCK:
    // return 'sBock';
    case BLOCK_NAME.T_BLOCK:
    // return 'tBock';
    case BLOCK_NAME.Z_BLOCK:
      // return 'zBock';
      return 'base';
    default:
      return '';
  }
}

const setRows = (map) => {
  const result = map.map((rows, idx) => {
    return (
      <Y idx={idx}>
        {
          rows.map((cols, idx) => {
            return (
              <X idx={idx} color={cols} />
            );
          })
        }
      </Y>
    );
  })
  return result;
}

const addUser = (createNewPlayer, router) => {
  const roomName = getRoomName();
  const name = getName();
  if (!name || !roomName) {
    router.history.push(`/`);
  } else {
    createNewPlayer({
      name,
      room: roomName,
    });
  }
}

const gameBoard = ({ map, room, createNewPlayer, router, currentPiece, setNewLocalMap, piecePlaced }) => {
  if (!room) {
    addUser(createNewPlayer, router);
  }
  console.warn('currentPiece: ', currentPiece)
  // if (currentPiece && !piecePlaced) {
  //   placePiece(room, map, currentPiece, setNewLocalMap);
  // }
  return (
    <Wrapper>
      {setRows(map)}
    </Wrapper>
  )
};

// gameBoard.componentDidMount = (props) => {
//   const {
//     startInterval,
//     startMove,
//   } = props;
  
//   startInterval(setInterval(() => startMove(), 1000));
// }

gameBoard.componentDidUpdate = (prevProps) => {
  const { map, currentPiece, pieceNotPlaced, needToMoveDown, stopMove, startInterval, startMove, intervalStarted, currentPieceX, currentPieceY } = prevProps;

  if (pieceNotPlaced && currentPiece) {
    placePiece(prevProps, currentPieceX, currentPieceY, map);
  }
  if (!intervalStarted && currentPiece) {
    startInterval(setInterval(() => startMove(), 1000));
  }

  if (needToMoveDown) {
    moveDown(prevProps);
    stopMove();
 }
};

const placePiece = (props, posX, posY, map) => {
  const { room, currentPiece, setNewLocalMap } = props;
  let newMap = cloneDeepWith(map);

  newMap = placePieceOnBoard(newMap, room.pieceList[currentPiece - 1].shape, posY, posX, currentPiece);
  setNewLocalMap(newMap);
};

const moveDown = (props) => {
  const { pieceMove, map, room, currentPieceX, currentPieceY, currentPiece } = props;
// console.warn(isPossibleToPlace(map, room.pieceList[currentPiece - 1].shape, currentPieceX, currentPieceY + 1, currentPiece));
//   if (isPossibleToPlace(map, room.pieceList[currentPiece - 1].shape, currentPieceX, currentPieceY + 1, currentPiece)) {
    pieceMove({ posX: currentPieceX + 1, posY: currentPieceY});
    placePiece(props, currentPieceX + 1, currentPieceY, deletePiece(cloneDeepWith(map), currentPiece));
  // }
};

const deletePiece = (map, currentPiece) => {
  return map.map((row, i) => {
    return row.map((cell, j) => {
      if (cell == currentPiece) return 0;
    });
  });
};

const mapStateToProps = (state, router) => {
  // console.warn(state);
  return {
    router,
    room: state.game.getIn(['room']).toJS(),
    map: state.game.getIn(['map']).toJS(),
    currentPiece: state.game.getIn(['currentPiece']),
    pieceNotPlaced: state.game.getIn(['pieceNotPlaced']),
    currentPieceX: state.game.getIn(['currentPieceX']),
    currentPieceY: state.game.getIn(['currentPieceY']),
    needToMoveDown: state.game.getIn(['needToMoveDown']),
    intervalStarted: state.game.getIn(['intervalStarted'])
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNewPlayer: (data) => dispatch(createNewPlayer(data)),
    setCurrentUser: (data) => dispatch(setCurrentUser(data)),
    setNewLocalMap: (data) => dispatch(setNewLocalMap(data)),
    startInterval: (data) => dispatch(startInterval(data)),
    startMove: (data) => dispatch(startMove(data)),
    stopMove: (data) => dispatch(stopMove(data)),
    pieceMove: (data) => dispatch(pieceMove(data))
  }
}

const X = ({ color, idx }) => {
  return (
    <div key={idx} className={`block blockBorder ${setBlockClassName(color)}`} />
  );
}

const Y = ({ children, idx }) => {
  return (
    <div key={idx} className='rows'>{children}</div>
  );
}

const Wrapper = ({ children }) => {
  return (
    <div className='wrapper'>
      {children}
    </div>
  );
}

const GameBoard = connect(mapStateToProps, mapDispatchToProps)(functional(gameBoard));
export {
  GameBoard,
};

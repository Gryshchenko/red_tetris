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
import moveLeft from '../../actions/moveLeft';
import moveRight from '../../actions/moveRight';
import { getRoomName, getName, placePieceOnBoard, isPossibleToPlace } from '../../utils';
import { cloneDeepWith } from 'lodash';
import { withRouter } from 'react-router';
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

const gameBoard = (props) => {
  const { map, room, createNewPlayer, router, currentPiece, setNewLocalMap, piecePlaced } = props;
  if (!room) {
    addUser(createNewPlayer, router);
  }
  return (
      <Wrapper>
        {setRows(map)}
      </Wrapper>
  )
};


gameBoard.componentDidUpdate = (prevProps) => {
  const {
    map,
    currentPiece,
    pieceNotPlaced,
    needToMoveDown,
    stopMove,
    startInterval,
    startMove,
    intervalStarted,
    currentPieceX,
    currentPieceY,
    left,
    right,
  } = prevProps;

  if (pieceNotPlaced && currentPiece) {
    placePiece(prevProps, currentPieceX, currentPieceY, map);
  }
  if (!intervalStarted && currentPiece) {
    startInterval(setInterval(() => startMove(), 1000));
  }

  console.warn(prevProps);
  if (left){
    moveTetriLeft(prevProps);
  } else if (right) {
    moveTetriRight(prevProps);
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
  if (isPossibleToPlace(map, room.pieceList[currentPiece - 1].shape, currentPieceX, currentPieceY + 1, currentPiece)) {
    pieceMove({ posX: currentPieceX + 1, posY: currentPieceY});
    placePiece(props, currentPieceX + 1, currentPieceY, deletePiece(cloneDeepWith(map), currentPiece));
  }
};

const moveTetriLeft = (props) => {
  console.warn('left', props);
  const { pieceMove, map, room, currentPieceX, currentPieceY, currentPiece, moveLeft } = props;
  pieceMove({ posX: currentPieceX, posY: currentPieceY - 1});
  placePiece(props, currentPieceX, currentPieceY - 1, deletePiece(cloneDeepWith(map), currentPiece));
  moveLeft(false);
}

const moveTetriRight = (props) => {
  const { pieceMove, map, room, currentPieceX, currentPieceY, currentPiece, moveRight } = props;
  pieceMove({ posX: currentPieceX, posY: currentPieceY + 1});
  placePiece(props, currentPieceX, currentPieceY + 1, deletePiece(cloneDeepWith(map), currentPiece));
  moveRight(false);
}

const deletePiece = (map, currentPiece) => {
  return map.map((row, i) => {
    return row.map((cell, j) => {
      if (cell == currentPiece) return 0;
    });
  });
};

const mapStateToProps = (state, router) => {
  const room = state.game.getIn(['room']) ? state.game.getIn(['room']).toJS() : null;
  return {
    router,
    room,
    map: state.game.getIn(['map']).toJS(),
    currentPiece: state.game.getIn(['currentPiece']),
    pieceNotPlaced: state.game.getIn(['pieceNotPlaced']),
    currentPieceX: state.game.getIn(['currentPieceX']),
    currentPieceY: state.game.getIn(['currentPieceY']),
    needToMoveDown: state.game.getIn(['needToMoveDown']),
    intervalStarted: state.game.getIn(['intervalStarted']),
    left: state.game.getIn(['moveLeft']),
    right: state.game.getIn(['moveRight']),
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
    pieceMove: (data) => dispatch(pieceMove(data)),
    moveLeft: (data) => dispatch(moveLeft(data)),
    moveRight: (data) => dispatch(moveRight(data)),
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

const GameBoard = withRouter(connect(mapStateToProps, mapDispatchToProps)(functional(gameBoard)));
export {
  GameBoard,
};

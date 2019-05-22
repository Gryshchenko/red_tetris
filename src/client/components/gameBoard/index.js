import React from 'react'
import './styles.css';
import { connect } from 'react-redux';
import setCurrentUser from '../../actions/setCurrentUser';
import createNewPlayer from '../../actions/createNewPlayer';
import { getRoomName, getName } from '../../utils';

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

const gameBoard = ({ map, room, createNewPlayer, router }) => {
  if (!room) {
    addUser(createNewPlayer, router);
  }
  return (
    <Wrapper>
      {setRows(map)}
    </Wrapper>
  )
};

const mapStateToProps = (state, router) => {
  console.warn(router);
  return {
    router,
    room: state.game.getIn(['room']),
    map: state.game.getIn(['map']),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNewPlayer: (data) => dispatch(createNewPlayer(data)),
    setCurrentUser: (data) => dispatch(setCurrentUser(data)),
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

const GameBoard = connect(mapStateToProps, mapDispatchToProps)(gameBoard)
export {
  GameBoard,
};

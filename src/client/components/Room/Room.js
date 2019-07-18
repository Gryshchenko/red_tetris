import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { GameBoard } from '../gameBoard';
import startGame from '../../actions/startGame';
// import moveLeft from '../../actions/moveLeft';
// import moveRight from '../../actions/moveRight';
import './styles.css'
import { GameBoardInfo } from '../gameBoardInfo/gameBoardInfo';
import setCurrentUser from '../../actions/setCurrentUser';
import createNewPlayer from '../../actions/createNewPlayer';
import setNewLocalMap from '../../actions/setNewLocalMap';
import startInterval from '../../actions/startInterval';
import startMove from '../../actions/startMove';
import stopMove from '../../actions/stopMove';
import pieceMove from '../../actions/pieceMove';
import moveLeft from '../../actions/moveLeft';
import moveRight from '../../actions/moveRight';
import moveDown from '../../actions/moveDown';
import forceMoveDown from '../../actions/forceMoveDown';
import rotatePiece from '../../actions/rotatePiece';
import pieceLanded from '../../actions/pieceLanded';
import { getRoomName, getName, placePieceOnBoard, isPossibleToPlace } from '../../utils';
import { cloneDeepWith } from 'lodash';
import functional from 'react-functional';
import { withRouter } from 'react-router';

const KEY_TYPE = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  SPACE: 'Space',
  ENTER: 'Enter',
};

const RoomComponent = ( props ) => {
  const { room, startGame, map, currentPiece,
    pieceNotPlaced, needToMoveDown, stopMove,
    startInterval, startMove, intervalStarted,
    currentPieceX, currentPieceY, left, right, down } = props;

  useEffect(() => {
    keyPressHandler(props);
    return () => {
      removeEventListener("keyup", keyPressHandler);
    };
  }, []);

  useEffect(() => {
    if (pieceNotPlaced && currentPiece) {
      placePiece(props, currentPieceX, currentPieceY, map);
    }
    if (!intervalStarted && currentPiece) {
      startInterval(setInterval(() => startMove(), 1000));
    }
  
    if (left){
      moveTetriLeft(props);
    } else if (right) {
      moveTetriRight(props);
    } else if (down) {
      moveTetriDown(props);
    }
    if (needToMoveDown) {
      moveTetriDown(props);
      stopMove();
   }
  });

  return (
    <div className={'roomMain'}>
      <div className={'tetrisViewMain'}>
        <div className={'roomMainFlex'}>
          <div>
            <GameBoard />
          </div>
          <div>
            <GameBoardInfo />
          </div>
        </div>
        <div className={'control'}>
          <div className={'generalButton'}>
            <div className={'topButton'}>
              <div className={'tetrisButton tetrisButtonSmall'} />
              <div className={'tetrisButton tetrisButtonSmall'} />
              <div className={'tetrisButton tetrisButtonSmall'} />
            </div>
            <div className={'spaceButton'}>
              <div className={'tetrisButton tetrisButtonBig'} onClick={(event) => onStartGame(room, startGame)}/>
            </div>
          </div>

          <div className={'moveButton'}>
            <div className={'tetrisButton tetrisButtonMiddle'} />
            <div className={'moveButtonMiddle'} >
              <div className={'tetrisButton tetrisButtonMiddle flex1'} />
              <div className={'flex1'} />
              <div className={'tetrisButton tetrisButtonMiddle flex1'} />
            </div>
            <div className={'tetrisButton tetrisButtonMiddle'} />
          </div>
        </div>
      </div>
    </div>
  );
}

const onStartGame = (room, startGame) => {
  const gameId = room._id;
  startGame({
    gameId: gameId
  })
}

const keyPressHandler = (props) => addEventListener('keyup', function (event) {
  const { room, startGame } = props;
  console.log(props);
  if (event) {
    switch (event.code) {
      case KEY_TYPE.ARROW_DOWN:
        return props.moveDown(true);
      case KEY_TYPE.ARROW_UP:
      case KEY_TYPE.ARROW_LEFT:
        return props.moveLeft(true);
      case KEY_TYPE.ARROW_RIGHT:
        return props.moveRight(true);
      case KEY_TYPE.SPACE:
      case KEY_TYPE.ENTER:
        return onStartGame( room, startGame)
    }
  }
});

const placePiece = (props, posX, posY, map) => {
  const { room, currentPiece, setNewLocalMap } = props;
  let newMap = cloneDeepWith(map);

  newMap = placePieceOnBoard(newMap, room.pieceList[currentPiece - 1].shape, posX, posY, currentPiece);
  setNewLocalMap(newMap);
};

const moveTetriDown = (props) => {
  const { pieceMove, map, room, currentPieceX, currentPieceY, currentPiece, pieceLanded, moveDown, currentUser } = props;
  // console.log(props)
  if (isPossibleToPlace(map, room.pieceList[currentPiece - 1].shape, currentPieceX, currentPieceY + 1, currentPiece)) {
    pieceMove({ posX: currentPieceX, posY: currentPieceY + 1});
    placePiece(props, currentPieceX, currentPieceY + 1, deletePiece(cloneDeepWith(map), currentPiece));
  } else {
    pieceLanded({
      playerId: currentUser._id,
      gameId: room._id,
      playerMap: map,
      currentPiece
    });
  }
  moveDown(false);
};

const moveTetriLeft = (props) => {
  const { pieceMove, map, room, currentPieceX, currentPieceY, currentPiece, moveLeft } = props;
  if (isPossibleToPlace(map, room.pieceList[currentPiece - 1].shape, currentPieceX - 1, currentPieceY, currentPiece)) {
    pieceMove({ posX: currentPieceX - 1, posY: currentPieceY});
    placePiece(props, currentPieceX - 1, currentPieceY, deletePiece(cloneDeepWith(map), currentPiece));
  }
  moveLeft(false);
}

const moveTetriRight = (props) => {
  const { pieceMove, map, room, currentPieceX, currentPieceY, currentPiece, moveRight } = props;
  if (isPossibleToPlace(map, room.pieceList[currentPiece - 1].shape, currentPieceX + 1, currentPieceY, currentPiece)) {
    pieceMove({ posX: currentPieceX + 1, posY: currentPieceY});
    placePiece(props, currentPieceX + 1, currentPieceY, deletePiece(cloneDeepWith(map), currentPiece));
  }
  moveRight(false);
}

const deletePiece = (map, currentPiece) => {
  return map.map((row, i) => {
    return row.map((cell, j) => {
      if (cell == currentPiece) {
        return 0;
      } else return cell;
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
    currentUser: state.game.getIn(['currentUser']).toJS(),
    pieceNotPlaced: state.game.getIn(['pieceNotPlaced']),
    currentPieceX: state.game.getIn(['currentPieceX']),
    currentPieceY: state.game.getIn(['currentPieceY']),
    needToMoveDown: state.game.getIn(['needToMoveDown']),
    intervalStarted: state.game.getIn(['intervalStarted']),
    left: state.game.getIn(['moveLeft']),
    right: state.game.getIn(['moveRight']),
    down: state.game.getIn(['moveDown']),
    forceDown: state.game.getIn(['forceMoveDown']),
    rotate: state.game.getIn(['rotatePiece']),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: (data) => dispatch(startGame(data)),
    createNewPlayer: (data) => dispatch(createNewPlayer(data)),
    setCurrentUser: (data) => dispatch(setCurrentUser(data)),
    setNewLocalMap: (data) => dispatch(setNewLocalMap(data)),
    startInterval: (data) => dispatch(startInterval(data)),
    startMove: (data) => dispatch(startMove(data)),
    stopMove: (data) => dispatch(stopMove(data)),
    pieceMove: (data) => dispatch(pieceMove(data)),
    moveLeft: (data) => dispatch(moveLeft(data)),
    moveRight: (data) => dispatch(moveRight(data)),
    moveDown: (data) => dispatch(moveDown(data)),
    forceMoveDown: (data) => dispatch(forceMoveDown(data)),
    rotatePiece: (data) => dispatch(rotatePiece(data)),
    pieceLanded: (data) => dispatch(pieceLanded(data))
  }
}

const Room = connect(mapStateToProps, mapDispatchToProps)(RoomComponent);

export {
  Room
};
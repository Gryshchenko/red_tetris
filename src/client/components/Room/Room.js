import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { GameBoard } from '../gameBoard';
import startGame from '../../actions/startGame';
import './styles.css'
import { GameBoardInfo } from '../gameBoardInfo/gameBoardInfo';
import {ModalWindow} from '../modal/Modal'
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
import needToRotatePiece from '../../actions/needToRotatePiece';
import pieceLanded from '../../actions/pieceLanded';
import setCurrentShape from '../../actions/setCurrentShape';
import { placePieceOnBoard, isPossibleToPlace, rotatePiece, clearFullRows } from '../../utils';
import { cloneDeepWith } from 'lodash';
import endGame from '../../actions/endGame';
import constants from '../../../server/const';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor        : 'red',
  }
};

const KEY_TYPE = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  SPACE: 'Space',
  ENTER: 'Enter',
};

const RoomComponent = ( props ) => {
  const {
    room,
    startGame,
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
    down,
    rotate,
    forceDown,
    currentUser,
    endGame
  } = props;

  useEffect(() => {
    _keyPressHandler(props);
    return () => {
      removeEventListener("keyup", _keyPressHandler);
    };
  }, []);

  useEffect(() => {

    if (room.playerList.length == 2 && _enemyLost(room.playerList, currentUser)) {
      // announce current player as winner
    }

    if (pieceNotPlaced && currentPiece) {
      if (_gameIsOver(map)) {
        endGame({
          playerId: currentUser._id,
          gameId: room._id
        });
      } else {
        _placePiece(props, currentPieceX, currentPieceY, map, room.pieceList[currentPiece - 1].shape);
      }
    }

    if (!intervalStarted && currentPiece) {
      startInterval(setInterval(() => startMove(), 1000));
    }

    if (left){
      _moveTetriLeft(props);
    } else if (right) {
      _moveTetriRight(props);
    } else if (down) {
      _moveTetriDown(props);
    } else if (rotate) {
      _rotateTetri(props);
    } else if (forceDown) {
      _forceMoveDownTetri(props);
    }

    if (needToMoveDown) {
      _moveTetriDown(props);
      stopMove();
   }
  });

  const isWaitingPlayer = room && room.playerList && room.playerList.length != 2;
  const isGameStarted = room && room.status === constants.gameStatuses.STARTED;

  return (
    <React.Fragment>
      <ModalWindow
        style={customStyles}
        isOpen={isWaitingPlayer || !isGameStarted}
      >
        {
          isWaitingPlayer && !isGameStarted && (
            <div>
              wait pls another player...
            </div>
          )
        }
        {
          !isWaitingPlayer && !isGameStarted && (
            <div>
              Enemy player connected, don't forget press 'Enter' to start game
            </div>
          )
        }
      </ModalWindow>
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
              <div className={'tetrisButton tetrisButtonBig'} onClick={(event) => _onStartGame(room, startGame)}/>
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
    </React.Fragment>
  );
}

const _gameIsOver = (map) => {
  console.log(map[0].find(cell => cell != 0))
  return map[0].find(cell => cell != 0) != undefined;
}

const _enemyLost = (playerList, currentUser) => {
  return playerList.find(player => player._id != currentUser._id).lost;
}

const _onStartGame = (room, startGame) => {
  const gameId = room._id;
  startGame({
    gameId: gameId
  })
}

const _keyPressHandler = (props) => addEventListener('keyup', function (event) {
  const { room, startGame } = props;
  // console.error(room, event.code)
  // if (event && room && room.playerList && room.playerList.length == 2 && room.status === constants.gameStatuses.STARTED) {
  if (event) {    
    switch (event.code) {
      case KEY_TYPE.ARROW_DOWN:
        return props.moveDown(true);
      case KEY_TYPE.ARROW_UP:
        return props.needToRotatePiece(true);
      case KEY_TYPE.ARROW_LEFT:
        return props.moveLeft(true);
      case KEY_TYPE.ARROW_RIGHT:
        return props.moveRight(true);
      case KEY_TYPE.SPACE:
        return props.forceMoveDown(true);
      case KEY_TYPE.ENTER:
        return _onStartGame( room, startGame)
    }
  // } else if (event && event.code === KEY_TYPE.ENTER && room && room.playerList && room.playerList.length == 2 && room.status === constants.gameStatuses.NOT_STARTED) {
      // return _onStartGame( room, startGame)
  }
});

const _placePiece = (props, posX, posY, map, shape, needToClearFullRows = false) => {
  const { currentPiece, setNewLocalMap } = props;
  let resultOfClearing;
  let newMap = cloneDeepWith(map);

  newMap = placePieceOnBoard(newMap, shape, posX, posY, currentPiece);
  if (needToClearFullRows) {
    resultOfClearing = clearFullRows(newMap);
    newMap = resultOfClearing.newBoard;
  }
  setNewLocalMap(newMap);
  return resultOfClearing ? resultOfClearing.clearedRows : null;
};

const _rotateTetri = (props) => {
  const { room, map, currentPiece, currentPieceX, currentPieceY, needToRotatePiece, setCurrentShape } = props;

  let newShape = rotatePiece(room.pieceList[currentPiece - 1].shape);

  if (isPossibleToPlace(map, newShape, currentPieceX, currentPieceY, currentPiece)) {
    _placePiece(props, currentPieceX, currentPieceY, _deletePiece(cloneDeepWith(map), currentPiece), newShape);
    let newPieceList = cloneDeepWith(room.pieceList.map((piece, index) => {
      if (index == currentPiece - 1) {
        return {
          ...piece,
          shape: newShape
        };
      }
      return piece;
    }));
    setCurrentShape({
      ...room,
      pieceList: newPieceList
    });
  }
  needToRotatePiece(false);
}

const _calculateScore = (clearedRows) => {
  let score = 0;

  switch (clearedRows) {
    case 1:
      score = 20;
      break ;
    case 2:
      score = 50;
      break ;
    case 3:
      score = 80;
      break ;
  }
  return score;
}

const _forceMoveDownTetri = (props) => {
  const { forceMoveDown, map, room, currentPieceX, currentPieceY, currentPiece, pieceLanded, currentUser } = props;

  let y = currentPieceY + 1;

  while (isPossibleToPlace(map, room.pieceList[currentPiece - 1].shape, currentPieceX, y, currentPiece)) {
    y++;
  }
  let clearedRows = _placePiece(props, currentPieceX, y - 1, _deletePiece(cloneDeepWith(map), currentPiece), room.pieceList[currentPiece - 1].shape, true);
  let score = _calculateScore(clearedRows);

  pieceLanded({
    playerId: currentUser._id,
    gameId: room._id,
    playerMap: map,
    currentPiece,
    score: room.playerList.find(player => player._id == currentUser._id).score + score,
    clearedRows: room.playerList.find(player => player._id == currentUser._id).clearedRows + clearedRows
  });

  forceMoveDown(false);
}

const _moveTetriDown = (props) => {
  const { pieceMove, map, room, currentPieceX, currentPieceY, currentPiece, pieceLanded, moveDown, currentUser } = props;
  if (isPossibleToPlace(map, room.pieceList[currentPiece - 1].shape, currentPieceX, currentPieceY + 1, currentPiece)) {
    pieceMove({ posX: currentPieceX, posY: currentPieceY + 1});
    _placePiece(props, currentPieceX, currentPieceY + 1, _deletePiece(cloneDeepWith(map), currentPiece), room.pieceList[currentPiece - 1].shape);
  } else {
    let clearedRows = _placePiece(props, currentPieceX, currentPieceY, _deletePiece(cloneDeepWith(map), currentPiece), room.pieceList[currentPiece - 1].shape, true);
    let score = _calculateScore(clearedRows);

    pieceLanded({
      playerId: currentUser._id,
      gameId: room._id,
      playerMap: map,
      currentPiece,
      score: room.playerList.find(player => player._id == currentUser._id).score + score,
      clearedRows: room.playerList.find(player => player._id == currentUser._id).clearedRows + clearedRows
    });
  }
  moveDown(false);
};

const _moveTetriLeft = (props) => {
  const { pieceMove, map, room, currentPieceX, currentPieceY, currentPiece, moveLeft } = props;
  if (isPossibleToPlace(map, room.pieceList[currentPiece - 1].shape, currentPieceX - 1, currentPieceY, currentPiece)) {
    pieceMove({ posX: currentPieceX - 1, posY: currentPieceY});
    _placePiece(props, currentPieceX - 1, currentPieceY, _deletePiece(cloneDeepWith(map), currentPiece), room.pieceList[currentPiece - 1].shape);
  }
  moveLeft(false);
}

const _moveTetriRight = (props) => {
  const { pieceMove, map, room, currentPieceX, currentPieceY, currentPiece, moveRight } = props;
  if (isPossibleToPlace(map, room.pieceList[currentPiece - 1].shape, currentPieceX + 1, currentPieceY, currentPiece)) {
    pieceMove({ posX: currentPieceX + 1, posY: currentPieceY});
    _placePiece(props, currentPieceX + 1, currentPieceY, _deletePiece(cloneDeepWith(map), currentPiece), room.pieceList[currentPiece - 1].shape);
  }
  moveRight(false);
}

const _deletePiece = (map, currentPiece) => {
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
    rotate: state.game.getIn(['needToRotatePiece']),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    endGame: (data) => dispatch(endGame(data)),
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
    needToRotatePiece: (data) => dispatch(needToRotatePiece(data)),
    pieceLanded: (data) => dispatch(pieceLanded(data)),
    setCurrentShape: (data) => dispatch(setCurrentShape(data)),
  }
}

const Room = connect(mapStateToProps, mapDispatchToProps)(RoomComponent);

export {
  Room
};

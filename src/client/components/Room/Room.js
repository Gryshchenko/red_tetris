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
import setNeedToPause from '../../actions/needToPause';
import pauseGame from '../../actions/pauseGame';
import { placePieceOnBoard, isPossibleToPlace, rotatePiece, clearFullRows, getEnemyTime } from '../../utils';
import { cloneDeepWith } from 'lodash';
import endGame from '../../actions/endGame';
import constants from '../../../server/const';
import pingPong from '../../actions/pingPong';
import { Button } from '../_base/button/Button';
import retry from '../../actions/retry';
import { Bord } from '../bord/Bord';
import { EnemyBoard } from '../enemyBoard';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : '#d9e476',
  }
};

const KEY_TYPE = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  SPACE: 'Space',
  ENTER: 'Enter',
  PAUSE: 'KeyP'
};

const _onStartGame = (room, startGame, status) => {
  const gameId = room._id;
  startGame({
    gameId: gameId,
    status,
  })
};

let interval;

let blockMovement = false;

let themeAudio;
let resultsAudio;
let moveAudio = new Audio('../../../sounds/Rotate.wav');

const RoomComponent = ( props ) => {
  const {
    room,
    startGame,
    map,
    currentPiece,
    pieceNotPlaced,
    needToMoveDown,
    stopMove,
    pingPong,
    setPingPong,
    startMove,
    currentPieceX,
    currentPieceY,
    left,
    right,
    down,
    rotate,
    forceDown,
    currentUser,
    endGame,
    needToPause,
    pauseGame,
    setPause,
    dispatch,
    isSingle,
    needToRotatePiece,
    moveDown,
    moveLeft,
    moveRight,
    forceMoveDown
  } = props;

  useEffect(() => {
    _keyPressHandler(props);
    const isSingleMode = room && room.status === constants.gameStatuses.SINGLE;
    if (isSingleMode || isSingle) {
      _onStartGame(room, startGame, constants.gameStatuses.SINGLE);
    }
    return () => {
        removeEventListener("keyup", _keyPressHandler);
    };
  }, []);

  useEffect(() => {
    if (!pingPong.pending) {
      setPingPong({playerId: currentUser._id, lastActiveTime: Math.floor((new Date()).getTime() / 1000)});
    }

    if (!interval && currentPiece && room.status != 2 && room.status != 3) {
      interval = setInterval(() => startMove(), 1000);
    }

    if (needToPause) {
      pauseGame({
        gameId: room._id,
        isSingle,
      });
      setPause(false);
    }
    if (room && room.status === constants.gameStatuses.PAUSED) {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
      if (needToMoveDown) {
        stopMove();
      }
    } else if (room && room.status === constants.gameStatuses.FINISHED) {
      // display results of the game
      if (interval) {
        clearInterval(interval);
        interval = null;
        console.log(interval);
        console.log('Interval cleared');
      }

      if (!resultsAudio) {
        themeAudio.pause();
        themeAudio = null;
        resultsAudio = new Audio('../../../sounds/Results.mp3');
        resultsAudio.loop = true;
        resultsAudio.play();
      }

      if (needToMoveDown) {
        stopMove();
      }

    } else if (room && (room.status === constants.gameStatuses.STARTED || room.status === constants.gameStatuses.SINGLE) && room.status !== constants.gameStatuses.PAUSED) {

      if (resultsAudio) {
        resultsAudio.pause();
        resultsAudio = null;
      }

      if (!themeAudio) {
        themeAudio = new Audio('../../../sounds/GameTheme.mp3');
        themeAudio.loop = true;
        themeAudio.play();
      }

      if (
        (room.status !== constants.gameStatuses.SINGLE)
        && !isSingle
        && (getEnemyTime(room.playerList, currentUser.name) + 20) < Math.floor((new Date()).getTime() / 1000)) {
        endGame({
          playerId: currentUser._id,
          gameId: room._id,
        });
        console.log('Ended game due to disconnect')
        // startMove(false);
      }

      if (pieceNotPlaced && currentPiece) {
        if (_gameIsOver(map)) {
          endGame({
            playerId: currentUser._id,
            gameId: room._id,
          });
          console.log('Ended game due to full map')
        } else {
          _placePiece(props, currentPieceX, currentPieceY, map, room.pieceList[currentPiece - 1].shape);
        }
      }

      if (blockMovement) {
        moveDown(false);
        moveLeft(false);
        moveRight(false);
        needToRotatePiece(false);
        stopMove(false);
        forceMoveDown(false);
      } else {
        // if (forceDown || left || right || down || rotate) {
        //   moveAudio.play();
        // }
        if (forceDown) {
          _forceMoveDownTetri(props);
          blockMovement = true;
          setTimeout(() => { blockMovement = false }, 100);
          console.warn("Force");
        }
        else if (left){
          _moveTetriLeft(props);
          console.warn("Left");
        }
        else if (right) {
          _moveTetriRight(props);
          console.warn("Right");
        }
        else if (down) {
          _moveTetriDown(props);
          console.warn("Down");
        }
        else if (rotate) {
          _rotateTetri(props);
        }
        if (needToMoveDown) {
          _moveTetriDown(props);
          stopMove();
       }
      }
    } else if (room && room.status == 0) {

    }

  });

  const isSingleMode = room && room.status === constants.gameStatuses.SINGLE;
  const isWaitingPlayer = room && room.playerList && room.playerList.length != 2 &&  isSingleMode !== true && isSingle !== true;
  const isGameStarted = room && room.status === constants.gameStatuses.NOT_STARTED && currentUser.isHost === false && !isSingle;
  const isHost = room && room.status === constants.gameStatuses.NOT_STARTED && currentUser.isHost === true;
  const isFinish = room && room.status === constants.gameStatuses.FINISHED;
  const isPaused = room && room.status === constants.gameStatuses.PAUSED;
  return (
    <React.Fragment>
      <div className={"enemyBord"}>
        <EnemyBoard/>
      </div>
      <ModalWindow
        style={customStyles}
        isOpen={isWaitingPlayer || isGameStarted || isHost || isFinish || isPaused}
      >
        {
          isWaitingPlayer && (
            <div>
              Waiting for another player...
            </div>
          )
        }
        {
          !isWaitingPlayer && isGameStarted && (
            <div>
              Waiting for host to start the game...
            </div>
          )
        }
        {
          !isWaitingPlayer && isHost && (
            <div>
              <div className={"roomPadding"}>
                Press button to start the game...
              </div>
              <div className='buttonWidth'>
                <Button
                  onClick={() => _onStartGame(room, startGame, constants.gameStatuses.STARTED)}
                  type={'submit'}
                  title={'Start'}
                />
              </div>
            </div>
          )
        }
        {
          isFinish && currentUser.isHost && (
            <div>
              <Bord
                playerList={room.playerList}
                reason={"finished"}
              />
              <div className='buttonWidth'>
                <div className={"roomPadding"}>
                  <Button
                    onClick={() => dispatch(retry({
                      gameId: room._id,
                      playerList: room.playerList,
                      room: room.name,
                      status: room.status,
                    }))}
                    type={'submit'}
                    title={'Retry'}
                  />
                </div>
                <div className={"roomPadding"}>
                  <Button
                    onClick={() => location.reload()}
                    type={'submit'}
                    title={'To main'}
                  />
                </div>
              </div>
            </div>
          )
        }
        {
          isFinish && !currentUser.isHost && (
            <div>
              <Bord
                playerList={room.playerList}
                title={"Game over"}
              />
              <div className={"roomPadding"}>
                <Button
                  onClick={() => location.reload()}
                  type={'submit'}
                  title={'To main'}
                />
              </div>
            </div>
          )
        }
        {
          isPaused && (
            <div>
              <Bord
                playerList={room.playerList}
                title={"PAUSE"}
              />
              <div className={"roomPadding"}>
                <Button
                  onClick={() => location.reload()}
                  type={'submit'}
                  title={'To main'}
                />
              </div>
              {
                currentUser.isHost && (
                  <div className={"roomPadding"}>
                    <Button
                      onClick={() => {
                        props.dispatch(setNeedToPause(false));
                        pauseGame({
                          gameId: room._id,
                          isSingle,
                        });
                      }}
                      type={'submit'}
                      title={'Resume'}
                    />
                  </div>
                )
              }
            </div>
          )
        }
      </ModalWindow>
    <div className={'roomMain'}>
      <div className={'tetrisViewMain'}>
        <div className={'roomMainFlex'}>
            <GameBoard />
          <div>
            <GameBoardInfo />
          </div>
        </div>
        <div className={'control'}>
          <div className={'generalButton'}>
            <div className={'topButton'}>
              <div className={"roomFontSize pause"}>Pause</div>
              <div className={"roomFontSize sound"}>Sound</div>
            </div>
            <div className={'topButton'}>
              <div onClick={() => props.dispatch(setNeedToPause(true))} className={'tetrisButton tetrisButtonSmall'} />
              <div className={'tetrisButton tetrisButtonSmall'} />
              {/*<div className={'tetrisButton tetrisButtonSmall'} />*/}
            </div>
            <div className={'spaceButton'}>
              <div className={"roomFontSize start"}>
                {room.status === constants.gameStatuses.NOT_STARTED || room.status === constants.gameStatuses.SINGLE
                  ? "Force down"
                  : "Start Game"
                }
              </div>
              <div className={'tetrisButton tetrisButtonBig'} onClick={
                  () => {
                    if (room.status === constants.gameStatuses.NOT_STARTED) {
                      _onStartGame(room, startGame, constants.gameStatuses.SINGLE)
                    } else {
                      props.dispatch(forceMoveDown(true))
                    }
                    }
                }
              />
            </div>
          </div>

          <div className={'moveButton'}>
            <div className={"roomFontSize rotate"}>Rotate</div>
            <div onClick={() => props.dispatch(needToRotatePiece(true))} className={'tetrisButton tetrisButtonMiddle'} />
            <div className={'moveButtonMiddle'} >
              <div className={"roomFontSize left"}>Left</div>
              <div onClick={() => props.dispatch(moveLeft(true))} className={'tetrisButton tetrisButtonMiddle flex1'} />
              <div className={'flex1'} />
              <div onClick={() => props.dispatch(moveRight(true))} className={'tetrisButton tetrisButtonMiddle flex1'} />
              <div className={"roomFontSize right"}>Right</div>
            </div>
            <div className={"roomFontSize down"}>Down</div>
            <div onClick={() => props.dispatch(moveDown(true))} className={'tetrisButton tetrisButtonMiddle'} />
          </div>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
}

const _gameIsOver = (map) => {
  return map[0].find(cell => cell != 0) != undefined;
}

const _enemyLost = (playerList, currentUser) => {
  return playerList.find(player => player._id != currentUser._id).lost;
}


const _keyPressHandler = (props) => addEventListener('keyup', function (event) {
  // window.keyPressHandler = true;
  // console.error(event.code);
  // const { room, startGame, currentUser } = props
  // if (event && room && room.playerList && room.playerList.length == 2) {
  //   const isGameStarted = room && room.status === constants.gameStatuses.STARTED;
  switch (event.code) {
    case KEY_TYPE.ARROW_DOWN:
      // if (isGameStarted) {
      props.dispatch(moveDown(true));
      // }
      break;
    case KEY_TYPE.ARROW_UP:
      // if (isGameStarted) {
      props.dispatch(needToRotatePiece(true));
      // }
      break;
    case KEY_TYPE.ARROW_LEFT:
      // if (isGameStarted) {
      props.dispatch(moveLeft(true));
      // }
      break;
    case KEY_TYPE.ARROW_RIGHT:
      // if (isGameStarted) {
      props.dispatch(moveRight(true));
      // }
      break;
    case KEY_TYPE.SPACE:
      // if (isGameStarted) {
          clearInterval(interval);
          interval = null;
      props.dispatch(forceMoveDown(true));
      // }
      break;
    case KEY_TYPE.PAUSE:
      props.dispatch(needToPause(true));
    // case KEY_TYPE.ENTER:
    //   // if (currentUser.isHost && !isGameStarted) {
    //     return _onStartGame( room, startGame)
    //   }
    // }
    // }
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
      score = 100;
      break ;
    case 4:
      score = 150;
  }
  return score;
}

const _forceMoveDownTetri = (props) => {
  const { forceMoveDown, map, room, currentPieceX, currentPieceY, currentPiece, pieceLanded, currentUser } = props;

  let y = currentPieceY + 1;

  while (isPossibleToPlace(map, room.pieceList[currentPiece - 1].shape, currentPieceX, y, currentPiece)) {
    y++;
    pieceMove({ posX: currentPieceX, posY: y - 1});
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
  const map = state.game.getIn(['map']) ? state.game.getIn(['map']).toJS() : null;
  const currentUser = state.game.getIn(['currentUser']) ?  state.game.getIn(['currentUser']).toJS() : null;
  return {
    router,
    room,
    map,
    currentPiece: state.game.getIn(['currentPiece']),
    currentUser,
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
    pingPong: state.game.getIn(['pingPong']).toJS(),
    needToPause: state.game.getIn(['needToPause']),
    isSingle: state.game.getIn(['isSingle']),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPingPong: (data) => dispatch(pingPong(data)),
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
    setPause: (data) => dispatch(setNeedToPause(data)),
    pauseGame: (data) => dispatch(pauseGame(data)),
    dispatch,
  }
}

const Room = connect(mapStateToProps, mapDispatchToProps)(RoomComponent);

export {
  Room
};

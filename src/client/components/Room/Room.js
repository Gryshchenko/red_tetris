import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { GameBoard } from '../gameBoard';
import startGame from '../../actions/startGame';
import moveLeft from '../../actions/moveLeft';
import moveRight from '../../actions/moveRight';
import './styles.css'
import { GameBoardInfo } from '../gameBoardInfo/gameBoardInfo';

const KEY_TYPE = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  SPACE: 'Space',
  ENTER: 'Enter',
};

const Room = ( props ) => {
  useEffect(() => {
    keyPressHandler(props);
    return () => {
      removeEventListener("keyup", keyPressHandler);
    };
  }, []);
  const { room, startGame } = props;
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
              <div className={'tetrisButton tetrisButtonBig'} onClick={(event) => onStartGame(event, room, startGame)}/>
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

const onStartGame = (event, room, startGame) => {
  console.warn(startGame)
  const gameId = room.getIn(['_id']);
  startGame({
    gameId: gameId
  })
}

const keyPressHandler = (props) => addEventListener('keyup', function (event) {
  if (event) {
    switch (event.code) {
      case KEY_TYPE.ARROW_DOWN:
      case KEY_TYPE.ARROW_UP:
      case KEY_TYPE.ARROW_LEFT:
        return props.moveLeft(true);
      case KEY_TYPE.ARROW_RIGHT:
        return props.moveRight(true);
      case KEY_TYPE.SPACE:
      case KEY_TYPE.ENTER:
    }
  }
});

const mapStateToProps = (state, initialValues) => {
  return {
    initialValues,
    room: state.game.getIn(['room']),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: (data) => dispatch(startGame(data)),
    moveLeft: (data) => dispatch(moveLeft(data)),
    moveRight: (data) => dispatch(moveRight(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);

{ /* <div>
<EnemyBoard />
</div> */ }


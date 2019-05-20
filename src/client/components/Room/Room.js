import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { GameBoard } from '../gameBoard';
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

const Room = () => {
  useEffect(() => {
    keyPressHandler();
    return () => {
      removeEventListener("keyup", keyPressHandler);
    };
  }, []);
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
              <div className={'tetrisButton tetrisButtonBig'} />
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

const keyPressHandler = () => addEventListener('keyup', function (event) {
  if (event) {
    switch (event.code) {
      case KEY_TYPE.ARROW_DOWN:
      case KEY_TYPE.ARROW_UP:
      case KEY_TYPE.ARROW_LEFT:
      case KEY_TYPE.ARROW_RIGHT:
      case KEY_TYPE.SPACE:
      case KEY_TYPE.ENTER:
    }
  }
});

const mapStateToProps = (state, router) => {
  return {
    router,
    room: state.game.getIn(['room']),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    // createNewPlayer: (data) => dispatch(createNewPlayer(data)),
    // setCurrentUser: (data) => dispatch(setCurrentUser(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);

{ /* <div>
<EnemyBord />
</div> */ }


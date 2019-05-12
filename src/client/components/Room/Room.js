import React, { useState, useEffect } from 'react';
import { GameBord } from '../gameBord';
import { EnemyBord } from '../enemyBord';
import './styles.css'
import { GameBordInfo } from '../gameBordInfo/gameBordInfo';

const KEY_TYPE = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  SPACE: 'Space',
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
            <GameBord />
          </div>
          <div>
            <GameBordInfo />
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
    }
  }
});

export default (Room);

{ /* <div>
<EnemyBord />
</div> */ }


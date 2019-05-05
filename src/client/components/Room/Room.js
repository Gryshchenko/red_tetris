import React from 'react'
import { GameBord } from '../gameBord';
import { EnemyBord } from '../enemyBord';
import './styles.css'
import { GameBordInfo } from '../gameBordInfo/gameBordInfo';

const Room = () => {
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
export default (Room);

{/* <div>
<EnemyBord />
</div> */}


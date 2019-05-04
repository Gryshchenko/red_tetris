import React from 'react'
import { GameBord } from '../gameBord';
import { EnemyBord } from '../enemyBord';
import './styles.css'
import { GameBordInfo } from '../gameBordInfo/gameBordInfo';

const Room = () => {
  return (
    <div className={'roomMain'}>
      <div className={'roomMainFlex'}>
        <div>
          <GameBord />
        </div>
        <div>
          <GameBordInfo />
        </div>
      </div>
      {/* <div>
        <EnemyBord />
      </div> */}
    </div>
  );
}
export default (Room);



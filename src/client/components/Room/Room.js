import React from 'react'
import { GameBord } from '../gameBord';
import { EnemyBord } from '../enemyBord';
import './styles.css'

const Room = () => {
  return (
    <div className={'roomMain'}>
      <div>
        <GameBord />
      </div>
      <div>
        <EnemyBord />
      </div>
    </div>
  );
}
export default (Room);



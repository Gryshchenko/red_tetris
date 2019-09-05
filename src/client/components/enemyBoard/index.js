import React, { useEffect, useState } from 'react'
import './styles.css';
import { connect } from 'react-redux';
import { getEnemyMap } from '../../utils';
import {map as cleanMap} from '../../reducers/index';

const setBlockClassName = (color) => {
  if (color != 0) return 'base';
  return '';
}

const setRows = (map) => {
  const result = map.map((rows, idx) => {
    return (
      <Y key={`y-${idx}`}>
        {
          rows.map((cols, idx) => {
            return (
              <X key={`x-${idx}`} color={cols} />
            );
          })
        }
      </Y>
    );
  })
  return result;
}

const enemyBoard = (props) => {
  const { room, currentUser } = props;
  const [enemyMap, setEnemyMap] = useState(null);

  useEffect(() => {
    setEnemyMap(getEnemyMap(room.playerList, currentUser.name));
  });

  return (
      <Wrapper>
        {setRows(enemyMap && enemyMap.length ? enemyMap : cleanMap)}
      </Wrapper>
  )
};

const mapStateToProps = (state) => {
  const room = state.game.getIn(['room']) ? state.game.getIn(['room']).toJS() : null;
  const currentUser = state.game.getIn(['currentUser']) ?  state.game.getIn(['currentUser']).toJS() : null;

  return {
    room,
    currentUser
  };
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

const EnemyBoard = connect(mapStateToProps)(enemyBoard);
export {
  EnemyBoard,
};

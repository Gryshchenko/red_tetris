import React from 'react'
import './styles.css';
import { connect } from 'react-redux';
import { getEnemyMap } from '../../utils';

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
  const { map } = props;
  if (!map) {
    return null;
  }
  return (
      <Wrapper>
        {setRows(map)}
      </Wrapper>
  )
};

const mapStateToProps = (state, router) => {
  const room = state.game.getIn(['room']) ? state.game.getIn(['room']).toJS() : null;
  const currentUser = state.game.getIn(['currentUser']) ?  state.game.getIn(['currentUser']).toJS() : null;
  let map = null;
  if (room && currentUser) {
    map = getEnemyMap(room.playerList, currentUser.name);
  }
  return {
    map,
  };
}

const mapDispatchToProps = (dispatch) => {
  return { }
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

const EnemyBoard = connect(mapStateToProps, mapDispatchToProps)(enemyBoard);
export {
  EnemyBoard,
};

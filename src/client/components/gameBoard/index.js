import React from 'react'
import './styles.css';
import { connect } from 'react-redux';

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

const gameBoard = (props) => {
  const { map } = props;
  return (
      <Wrapper>
        {setRows(map)}
      </Wrapper>
  )
};

const mapStateToProps = (state, router) => {
  return {
    map: state.game.getIn(['map']).toJS(),
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

const GameBoard = connect(mapStateToProps, mapDispatchToProps)(gameBoard);
export {
  GameBoard,
};

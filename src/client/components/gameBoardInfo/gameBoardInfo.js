
import React from 'react';
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

const gameBoardInfo = (props) => {
    const { currentPiece, room } = props;

    return (
        <div className={'gameBoardInfoWidth'}>
            <div className={'gameBoardInfoValue'}>
                <span className={'textMargin'}>Score</span>
                <span className={'textMargin'}>0000</span>
            </div>
            <div className={'gameBoardInfoValue'}>
                <span className={'textMargin'}>Cleans</span>
                <span className={'textMargin'}>0000</span>
            </div>
            {/* <div className={'gameBoardInfoValue'}>
                <span className={'textMargin'}>Level</span>
                <span className={'textMargin'}>0000</span>
            </div> */}
            <div className={'gameBoardInfoValue'}>
                <span className={'textMargin'}>Next</span>
                {/* <div>
                    <div className='rows rowsJustifyContent'>
                        <div className={`block blockBorder`} />
                        <div className={`block blockBorder`} />
                        <div className={`block blockBorder`} />
                        <div className={`block blockBorder`} />
                    </div>
                    <div className='rows rowsJustifyContent'>
                        <div className={`block blockBorder`} />
                        <div className={`block blockBorder`} />
                        <div className={`block blockBorder`} />
                        <div className={`block blockBorder`} />
                    </div>
                    <div className='rows rowsJustifyContent'>
                        <div className={`block blockBorder`} />
                        <div className={`block blockBorder`} />
                        <div className={`block blockBorder`} />
                        <div className={`block blockBorder`} />
                    </div>
                    <div className='rows rowsJustifyContent'>
                        <div className={`block blockBorder`} />
                        <div className={`block blockBorder`} />
                        <div className={`block blockBorder`} />
                        <div className={`block blockBorder`} />
                    </div>
                </div> */}
                <div>
                    {currentPiece ? setRows(room.pieceList[currentPiece].shape) : null}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state, router) => {
    const room = state.game.getIn(['room']) ? state.game.getIn(['room']).toJS() : null;
  
    return {
      router,
      room,
      currentPiece: state.game.getIn(['currentPiece']),
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return { }
  }

const GameBoardInfo = connect(mapStateToProps, mapDispatchToProps)(gameBoardInfo);

export {
    GameBoardInfo,
};

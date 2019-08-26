import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import './styles.css'
import getPlayers from '../../actions/getPlayers';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : '#d9e476',
    maxHeight             :  'calc(100% - 100px)',
  }
};

const ScoreRoom = ({ players, getPlayers }) => {
  // useEffect(() => {
  //   getPlayers();
  // });
  if (!players) {
    return null;
  }
  return (
    <div>
      {
        Object.keys(players).map((key) => {
          return (
            <React.Fragment key={key}>
              <div className={'waitingRoomPlayerMain'}>
                <div className={'waitingRoomPlayer'}>
                  <div className={'waitingRoomName'}>Room name: {players[key].name}</div>
                  <div className={'waitingRoomName'}>Player score: {players[key].score}</div>
                </div>
              </div>
            </React.Fragment >
          );
        })
      }
    </div>
  );
}

const mapStateToProps = (state, router) => {
  const players = state.game.getIn(['players']) ? state.game.getIn(['players']).toJS() : null;
    return {
        router,
        players,
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPlayers: () => dispatch(getPlayers()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScoreRoom));

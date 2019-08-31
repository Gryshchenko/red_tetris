import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import './styles.css'
import getPlayers from '../../actions/getPlayers';
import Logo from '../logo/Logo';

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

const ScoreRoom = ({ players, getPlayers, router }) => {
  useEffect(() => {
    if (!players) {
      getPlayers();
    }
  });
  if (!players) {
    return (
      <div className={'emptyList'}>
        <Logo />
        <div >
          Score list is empty <a className={'emptyText'} onClick={() => router.history.push(`/`)}> go to main page</a>
        </div>
      </div>
      );
  } else {
    players = players.sort((fp, sp) => fp.score > sp.score).slice(0, 20);
    return (
      <div className={'scoreBase'}>
        <Logo />
        {
          Object.keys(players).map((key) => {
            return (
              <React.Fragment key={key}>
                <div className={'waitingRoomPlayerMain'}>
                  <div className={'waitingRoomPlayer'}>
                    <div className={'waitingRoomName'}>Player name: {players[key].name}</div>
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

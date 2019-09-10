import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import createGameFromQueryString from '../../actions/createGameFromQueryString';
import './styles.css'
import { Room } from '../Room/Room';
import { getRoomName, getName } from '../../utils';
import constants from '../../../server/const';


const addUser = (createGameFromQueryString, router) => {
  const roomName = getRoomName(window);
  const name = getName(window);
  if (!name || !roomName) {
    router.history.push(`/`);
  } else {
    createGameFromQueryString({
      name,
      room: roomName,
    });
  }
}


const WaitingRoom = ({ router, room, createGameFromQueryString, errorCode }) => {
    if (room) {
      return <Room />;
    } else {
      if (errorCode === constants.gameErrorCode.CANT_CREATE) {
        router.history.push(`/`);
      }
      addUser(createGameFromQueryString, router);
      return (
        <div style={{
          width: '100%',
          height: '100%',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          Wait pls
        </div>
        );
    }
}

const mapStateToProps = (state, router) => {
    return {
        router,
        room: state.game.getIn(['room']),
        errorCode: state.game.getIn(['errorCode']),
        // currentUser: state.game.getIn(['currentUser']),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createGameFromQueryString: (data) => dispatch(createGameFromQueryString(data)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WaitingRoom));

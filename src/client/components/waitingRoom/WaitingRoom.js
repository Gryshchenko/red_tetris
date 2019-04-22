import React from 'react'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import './styles.css'

const WaitingRoom = ({ router, room }) => {
    console.warn(router);
    console.warn(room);
    return (
        <div className={'waitingRoom'}>
        adasdasd
        </div>
    );
}

const mapStateToProps = (state, router) => {
    return {
        router,
        room: state.game.getIn(['room']),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createNewPlayer: (data) => dispatch(createNewPlayer(data)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WaitingRoom));

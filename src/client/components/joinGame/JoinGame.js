
import React from 'react';
import { connect } from 'react-redux';
import { Input } from '../_base/input/input';
import { Button } from '../_base/button/Button';
import { withRouter } from 'react-router';
import './styles.css';
import createNewPlayer from '../../actions/createNewPlayer';
import setCurrentUser from '../../actions/setCurrentUser';
import getGames from '../../actions/getGames';
import { ErrorMsg } from '../_base/errorMsg/ErrorMsg';

const VALID_ID = {
    JOIN_NAME_VALID: 'joinGameName',
    JOIN_ROOM_VALID: 'joinRoomName'
}
const JoinGame = ({ router, createNewPlayer, setCurrentUser, games }) => {
    if (!games) {
      return null;
    }
    return (
        <div className="joinGameWrap">
            <form onSubmit={(e) => handledSumbit(e, createNewPlayer, router, setCurrentUser, games)}>
                {/*<ErrorMsg id={VALID_ID.JOIN_ROOM_VALID}>*/}
                {/*    <Input*/}
                {/*        title={'Room name'}*/}
                {/*        id={'joinRoomName'}*/}
                {/*    />*/}
                {/*</ErrorMsg>*/}
                <ErrorMsg id={VALID_ID.JOIN_NAME_VALID}>
                    <Input
                        title={'Your name'}
                        id={'joinGameName'}
                    />
                </ErrorMsg>
                <div className='buttonWidth'>
                    <Button
                        title={'Join'}
                    />
                </div>
            </form>
        </div>
    );
}

const handledSumbit = (e, createNewPlayer, router, setCurrentUser, games) => {
    e.preventDefault();
    const hostName = document.getElementById('joinGameName').value;
    const roomName = games.game.name;
    if (inputValueValid(hostName, roomName)) {
        createNewPlayer({
            name: hostName,
            room: roomName,
        });
        router.history.push(`/game/${roomName}[${hostName}]`);
    }

}

const inputValueValid = (name, room) => {
    let isValid = true;
    // if (!/^[a-zA-Z]*$/g.test(name)) {
    //     document.getElementById(VALID_ID.JOIN_NAME_VALID).innerHTML = 'The name should contain the only alphabet character';
    //     isValid = false;
    // }
    // if (!/^[a-zA-Z]*$/g.test(room)) {
    //     document.getElementById(VALID_ID.JOIN_ROOM_VALID).innerHTML = 'The room name should contain the only alphabet character';
    //     isValid = false;
    // }
    if (name === '') {
        document.getElementById(VALID_ID.JOIN_NAME_VALID).innerHTML = 'Name is required';
        isValid = false;

    }
    if (room === '') {
        document.getElementById(VALID_ID.JOIN_ROOM_VALID).innerHTML = 'Room name is required';
        isValid = false;

    }
    return isValid;
}

const mapStateToProps = (state, router) => {
  const games = state.game.getIn(['games']) ? state.game.getIn(['games']).toJS() : null;
    return {
        router,
        room: state.game.getIn(['room']),
        games,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createNewPlayer: (data) => dispatch(createNewPlayer(data)),
        setCurrentUser: (data) => dispatch(setCurrentUser(data)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JoinGame));

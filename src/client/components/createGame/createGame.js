import React from 'react';
import { connect } from 'react-redux';
import './styles.css';
import createNewPlayer from '../../actions/createNewPlayer';
import { Input } from '../_base/input/input';
import { Button } from '../_base/button/Button';
import { withRouter } from 'react-router';
import { ErrorMsg } from '../_base/errorMsg/ErrorMsg';

const VALID_ID = {
    NAME_VALID: 'nameValid',
    ROOM_VALID: 'roomValid',
}

const CreateGame = ({ router, createNewPlayer }) => {
    return (
        <div className="createGameWrap">
            <form onSubmit={(e) => handledSumbit(e, createNewPlayer, router)}>
                <ErrorMsg id={VALID_ID.NAME_VALID}>
                    <Input
                        title={'Room name'}
                        id={'name'}
                    />
                </ErrorMsg>
                <ErrorMsg id={VALID_ID.ROOM_VALID}>
                    <Input
                        title={'Your name'}
                        id={'roomName'}
                    />
                </ErrorMsg>
                <div className='buttonWidth'>
                    <Button
                        type={'submit'}
                        title={'Create'}
                    />
                </div>
            </form>
        </div>
    );
}

const handledSumbit = (e, createNewPlayer, router) => {
    e.preventDefault()
    const hostName = document.getElementById('name').value
    const roomName = document.getElementById('roomName').value
    if (inputValueValid(hostName, roomName)) {
        createNewPlayer({
            name: hostName,
            room: roomName,
        });
        router.history.push(`/game/${roomName}-${hostName}`)
    }

}

const inputValueValid = (name, room) => {
    let isValid = true;
    if (!/^[a-zA-Z]*$/g.test(name)) {
        document.getElementById(VALID_ID.NAME_VALID).innerHTML = 'The name should contain the only alphabet character';
        isValid = false;
    }
    if (!/^[a-zA-Z]*$/g.test(room)) {
        document.getElementById(VALID_ID.ROOM_VALID).innerHTML = 'The room name should contain the only alphabet character';
        isValid = false;
    }
    if (name === '') {
        document.getElementById(VALID_ID.NAME_VALID).innerHTML = 'Name is required';
        isValid = false;

    }
    if (room === '') {
        document.getElementById(VALID_ID.ROOM_VALID).innerHTML = 'Room name is required';
        isValid = false;

    }
    return isValid;
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateGame));

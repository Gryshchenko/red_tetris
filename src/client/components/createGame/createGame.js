import React, { useState } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import createNewGame from '../../actions/createNewGame';
import { Input } from '../_base/input/input';
import { Button } from '../_base/button/Button';
import { withRouter } from 'react-router';
import { ErrorMsg } from '../_base/errorMsg/ErrorMsg';

const CreateGame = (props) => {
    const [roomName, setRoomName] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [singleMode, setSingleMode] = useState(false);

    const [roomNameError, setRoomNameError] = useState('');
    const [playerNameError, setPlayerNameError] = useState('');

    const { createNewGame } = props;

    return (
        <div className="createGameWrap">
            <form onSubmit={(e) => handledSumbit(e, createNewGame, roomName, playerName, singleMode, setRoomNameError, setPlayerNameError)}>
                <ErrorMsg errorMessage={roomNameError}>
                    <Input
                        title={'Room name'}
                        value={roomName}
                        onChange={(event) => {
                            setRoomName(event.target.value);
                            setRoomNameError('');
                        }}
                    />
                </ErrorMsg>
                <ErrorMsg errorMessage={playerNameError}>
                    <Input
                        title={'Your name'}
                        value={playerName}
                        onChange={(event) => {
                            setPlayerName(event.target.value);
                            setPlayerNameError('');
                        }}
                    />
                </ErrorMsg>
                <Input
                    type={'checkbox'}
                    text={'Single mode'}
                    value={singleMode}
                    onChange={(event) => {
                        setSingleMode(event.target.value);
                    }}
                    wrapperStyle={{
                        display: 'flex',
                        height: '10px'
                    }}
                    textStyle={{
                        margin: '3px',
                        height: '10px'
                    }}
                />
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

const handledSumbit = (e, createNewGame, roomName, hostName, singleMode, setRoomNameError, setPlayerNameError) => {
    e.preventDefault()
    if (inputValueValid(hostName, roomName, setRoomNameError, setPlayerNameError)) {
        createNewGame({
            name: hostName,
            room: roomName,
            isSingleMode: singleMode,
        });
    }

}

const inputValueValid = (name, room, setRoomNameError, setPlayerNameError) => {
    let isValid = true;
    if (name === '') {
        setPlayerNameError('Player name is required');
        isValid = false;

    }
    if (room === '') {
        setRoomNameError('Room name is required');
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
        createNewGame: (data) => dispatch(createNewGame(data)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateGame));


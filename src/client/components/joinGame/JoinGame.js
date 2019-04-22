
import React from 'react';
import { connect } from 'react-redux';
import { Input } from '../_base/input/input';
import { Button } from '../_base/button/Button';
import { withRouter } from 'react-router';
import './styles.css';
import createNewPlayer from '../../actions/createNewPlayer';

const JoinGame = ({ router, createNewPlayer, room }) => {
    return (
        <div className="joinGameWrap">
            <form onSubmit={(e) => handledSumbit(e, createNewPlayer, router)}>
                <Input
                    onChange={() => console.warn(1)}
                    title={'Your name'}
                    id={'joinGameName'}
                />
                <div className='buttonWidth'>
                    <Button
                        onClick={() => console.warn(2)}
                        title={'Join'}
                    />
                </div>
            </form>
        </div>
    );
}

const handledSumbit = (e, createNewPlayer, router) => {
    e.preventDefault()
    const name = document.getElementById('joinGameName').value
    if (inputValueValid(name)) {
        createNewPlayer({
            name: name,
        });
        router.history.push(`/waitingRoom`)
    }

}

const inputValueValid = (name) => {
    let isValid = true;
    if (!/^[a-zA-Z]*$/g.test(name)) {
        document.getElementById(VALID_ID.NAME_VALID).innerHTML = 'The name should contain the only alphabet character';
        isValid = false;
    }
    if (name === '') {
        document.getElementById(VALID_ID.NAME_VALID).innerHTML = 'Name is required';
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

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(JoinGame));

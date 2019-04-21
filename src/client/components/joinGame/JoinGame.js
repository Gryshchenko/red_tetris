
import React from 'react';
import { connect } from 'react-redux';
import { Input } from '../_base/input/input';
import { Button } from '../_base/button/Button';
import './styles.css';

const JoinGame = ({ router, createNewPlayer, room }) => {
    return (
        <div className="joinGameWrap">
            <Input
                onChange={() => console.warn(1)}
                title={'Your name'}
                value={'asdasd'}
                id={'joinGameName'}
            />
            <div className='buttonWidth'>
                <Button
                    onClick={() => console.warn(2)}
                    title={'Join'}
                />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);

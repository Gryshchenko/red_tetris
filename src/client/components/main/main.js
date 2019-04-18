import React from 'react';
import { connect } from 'react-redux';
import './styles.css';
import createNewPlayer from '../../actions/createNewPlayer';

const Main = ({ router, createNewPlayer, room }) => {
    return (
        <section className='main'>
            {
                !room && (
                    <form className='form' onSubmit={(e) => {
                        e.preventDefault()
                        const hostName = document.getElementById('name').value
                        const roomName = document.getElementById('roomName').value
                        if (hostName !== '' && roomName !== '') {
                            createNewPlayer({
                                name: hostName,
                                room: roomName,
                            });
                            router.history.push(`#${roomName}-${hostName}`)
                        }
                    }}>
                        <legend className='legend'>Create your game</legend>
                        <input className={'input'} type={'text'} id={'name'} placeholder={'Name'} />
                        <input type={'number'} className={'input'} type={'text'} id={'roomName'} placeholder={'Room Name'} />
                        <button className={'button'} type={'submit'}>Create</button>
                    </form>
                )
            }
            {
                room && (
                    <form className='form start-game-color' onSubmit={(e) => {
                        e.preventDefault()
                    }}>
                        <legend className='legend'>Start game</legend>
                        <div> 0 / 5 </div>
                        <button className={'button'} type={'submit'}>Start</button>
                    </form>
                )
            }
        </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);


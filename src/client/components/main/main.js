import React from 'react';
import { connect } from 'react-redux';
import './styles.css';
import createNewPlayer from '../../actions/createNewPlayer';

const Main = ({ router, createNewPlayer }) => {
    return (
        <section className='main'>
            <form className='form' onSubmit={(e) => {
                e.preventDefault()
                const hostName = document.getElementById('name').value
                const roomName = document.getElementById('roomName').value

                if (hostName !== '' && roomName !== '') {
                    createNewPlayer({name: hostName, room: roomName});
                    router.history.push(`#${roomName}-${hostName}`)
                }
            }}>
                <legend className='legend'>Create your game</legend>
                <input className={'input'} type={'text'} id={'name'} placeholder={'Name'} />
                <input type={'number'} className={'input'} type={'text'} id={'roomName'} placeholder={'Room Name'} />
                <button className={'button'} type={'submit'}>Start</button>
            </form>
        </section>
    );
}

const mapStateToProps = (state, router) => {
    return {
        router,
    };
}   

const mapDispatchToProps = (dispatch) => {
    return {
        createNewPlayer: (data) => dispatch(createNewPlayer(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);


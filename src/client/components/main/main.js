import React from 'react';
import './styles.css';
import createNewPlayer from '../../actions/createNewPlayer';
import CreateGame from '../createGame/createGame';
import JoinGame from '../joinGame/JoinGame';
import Collapsible from 'react-collapsible';
// import { Logo } from '../logo/Logo';

const Main = () => {
    return (
        <section className='main'>
            {/* <Logo /> */}
            <div className='marginRight'>
                <Collapsible trigger={<div className='collapsibleTrigger'>Join game</div>}>
                    <JoinGame />
                </Collapsible>
                <Collapsible trigger={<div className='collapsibleTrigger'>Create game</div>}>
                    <CreateGame />
                </Collapsible>
            </div>
            {/* {
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
                            router.history.push(`game/${roomName}-${hostName}`)
                        }
                    }}>
                        <div className='legend'>Create your game</div>
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
                        <div> 1 / 2 </div>
                        <button className={'button'} type={'submit'}>Start</button>
                    </form>
                )
            } */}
        </section>
    );
}

// const mapStateToProps = (state, router) => {
//     return {
//         router,
//         room: state.game.getIn(['room']),
//     };
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         createNewPlayer: (data) => dispatch(createNewPlayer(data)),
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Main);

export default Main;


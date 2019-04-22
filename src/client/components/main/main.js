import React from 'react';
import './styles.css';
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
        </section>
    );
}
export default Main;


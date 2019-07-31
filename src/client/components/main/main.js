import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import getGames from '../../actions/getGames';
import './styles.css';
import CreateGame from '../createGame/createGame';
import JoinGame from '../joinGame/JoinGame';
import Collapsible from 'react-collapsible';
import { Logo } from '../logo/Logo';
const Main = ({getGames}) => {
    const [openJoinGame, setOpenJoinGame] = useState(false);
    const [openCreateGame, setOpenCreateGame] = useState(false);
    const [topPosition, setTopPosition] = useState('-110');
    useEffect(() => {
        setTimeout(() => setTopPosition('10%'), 1000);
        setTimeout(() => setOpenJoinGame(true), 1500);
        setTimeout(() => setOpenCreateGame(true), 2000);
        getGames();
    });
    return (
        <section className='main'>
            <Logo />
            <div className='centerMain' style={{top: topPosition}}>
                <Collapsible open={openJoinGame} trigger={<div className='collapsibleTrigger'>Join game</div>}>
                    <JoinGame />
                </Collapsible>
                <Collapsible open={openCreateGame} trigger={<div className='collapsibleTrigger'>Create game</div>}>
                    <CreateGame />
                </Collapsible>
            </div>
        </section>
    );
}


const mapDispatchToProps = (dispatch) => {
  return {
    getGames: () => dispatch(getGames()),
  }
}

export default connect(null, mapDispatchToProps)(Main);


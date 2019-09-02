import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './styles.css';
import getGames from '../../actions/getGames';
import CreateGame from '../createGame/createGame';
import JoinGame from '../joinGame/JoinGame';
import Collapsible from 'react-collapsible';
import Logo from '../logo/Logo';
import constants from '../../../server/const';

const createGameErrors = {
  [constants.gameErrorCode.BOTH_EXIST]: "These player and room names already exist",
  [constants.gameErrorCode.GAME_EXIST]: 'This room name already exists',
  [constants.gameErrorCode.PLAYER_EXIST]: 'This player name already exists',
}

const Main = ({getGames, currentUser, games, router, room}) => {
    const [openJoinGame, setOpenJoinGame] = useState(false);
    const [openCreateGame, setOpenCreateGame] = useState(false);
    const [topPosition, setTopPosition] = useState('-110');
    useEffect(() => {
        setTimeout(() => setTopPosition('10%'), 1000);
        setTimeout(() => setOpenJoinGame(true), 1500);
        setTimeout(() => setOpenCreateGame(true), 2000);
        if (!games || Object.keys(games).length < 1) {
          getGames();
        }
        if (currentUser && !currentUser.errorCode) {
          router.history.push(`/game/${room.name}[${currentUser.name}]`);
        }
    });
    return (
        <section className='main'>
            <Logo />
            <div onClick={() => router.history.push('/score')} className={"scoreLink"}>TOP 20</div>
            <div className='centerMain' style={{top: topPosition}}>
              {
                ( games && Object.keys(games).length > 0)  && (
                  <Collapsible open={openJoinGame} trigger={<div className='collapsibleTrigger'>Join game</div>}>
                    <JoinGame />
                  </Collapsible>
                )
              }
                <Collapsible open={openCreateGame} trigger={<div className='collapsibleTrigger'>Create game</div>}>
                    <CreateGame />
                    {currentUser && currentUser.errorCode && (
                      <span>{createGameErrors[currentUser.errorCode]}</span>
                    )}
                </Collapsible>
            </div>
        </section>
    );
}



export default withRouter(connect((state, router) => {
  const currentUser = state.game.getIn(['currentUser']) ? state.game.getIn(['currentUser']).toJS() : null;
  const games = state.game.getIn(['games']) ? state.game.getIn(['games']).toJS() : null;
  const room = state.game.getIn(['room']) ? state.game.getIn(['room']).toJS() : null;
  return {
    router,
    currentUser,
    games,
    room,
  };

}, (dispatch) => ({
  getGames: () => dispatch(getGames()),
}))(Main));



import React from 'react'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import './styles.css'
import { Button } from '../_base/button/Button';
import Collapsible from 'react-collapsible';

const WaitingRoom = ({ router, room }) => {
    // const playerList = [
    //     { name: 'Dima' },
    //     { name: 'Dima1' },
    //     { name: 'DIma3' }
    // ]
    const playerList = null;
    let players = null;
    if (playerList) {
        players = playerList.map((player, i) => {
            return (
                <React.Fragment key={i}>
                    <Collapsible trigger={<div className={'waitingRoomPlayer'}>{player.name}</div>}>
                        <div className={'waitingRoomButton'}>
                            <Button
                                title={'Join'}
                                onClick={() => console.warn(1)}
                            />
                        </div>
                    </Collapsible>
                </React.Fragment>
            );
        });
    }
    return (
        <div className={'waitingRoom'}>
            <div className={'waitingRoomPlayers'}>
                {
                    players
                        ? players
                        : (
                            <div>
                                wait while someone connect ...
                            </div>
                        )
                }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WaitingRoom));

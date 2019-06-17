import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import createNewPlayer from '../../actions/createNewPlayer';
import './styles.css'
import { Button } from '../_base/button/Button';
import Room from '../Room/Room';
import { getRoomName, getName } from '../../utils';


const addUser = (createNewPlayer, router) => {
  const roomName = getRoomName();
  const name = getName();
  if (!name || !roomName) {
    router.history.push(`/`);
  } else {
    createNewPlayer({
      name,
      room: roomName,
    });
  }
}


const WaitingRoom = ({ router, room, createNewPlayer }) => {
    if (room) {
      return <Room />;
    } else {
      addUser(createNewPlayer, router);
      return (
        <div style={{
          width: '100%',
          height: '100%',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          Wait pls
        </div>
        );
    }
}

const mapStateToProps = (state, router) => {
    return {
        router,
        room: state.game.getIn(['room']),
        // currentUser: state.game.getIn(['currentUser']),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createNewPlayer: (data) => dispatch(createNewPlayer(data)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WaitingRoom));
// const WaitingRoom = ({ router, room }) => {
//   console.warn(currentUser);
//   if (currentUser === null) router.history.push('/');
//   const playerList = [
//     { name: 'game', playerList: [{ name: 'name' }] },
//     { name: 'game1', playerList: [{ name: 'name1' }] },
//     { name: 'game2', playerList: [{ name: 'name2' }] },
//   ];
//   let players = null;
//   if (playerList) {
//     players = playerList.map((player, i) => {
//       return (
//         <React.Fragment key={i}>
//           <div className={'waitingRoomPlayerMain'}>
//             <div className={'waitingRoomPlayer'}>
//               <div className={'waitingRoomName'}>Room name: {player.name}</div>
//               <div className={'waitingRoomName'}>Player name: {player.playerList[0].name}</div>
//             </div>
//             <div className={'waitingRoomButton'}>
//               <Button
//                 title={'Join'}
//                 onClick={() => router.history.push(`/game/${player.name}-${currentUser}`)}
//               />
//             </div>
//           </div>
//         </React.Fragment >
//       );
//     });
//   }
//   return (
//     <div className={'waitingRoom'}>
//       <div className={'waitingRoomPlayers'}>
//         {
//           players
//             ? (
//               <div>
//                                 <span className={'availableRooms'}>
//                                     Available rooms
//                                 </span>
//                 {players}
//               </div>
//             )
//             : (
//               <div>
//                 wait while someone connect ...
//               </div>
//             )
//         }
//       </div>
//     </div>
//   );
// }
//
// const mapStateToProps = (state, router) => {
//   return {
//     router,
//     room: state.game.getIn(['room']),
//     currentUser: state.game.getIn(['currentUser']),
//   };
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     createNewPlayer: (data) => dispatch(createNewPlayer(data)),
//   }
// }
//
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WaitingRoom));

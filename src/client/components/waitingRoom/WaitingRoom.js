import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import createGameFromQueryString from '../../actions/createGameFromQueryString';
import './styles.css'
import { Room } from '../Room/Room';
import { getRoomName, getName } from '../../utils';
import constants from '../../../server/const';


const addUser = (createGameFromQueryString, router) => {
  const roomName = getRoomName();
  const name = getName();
  if (!name || !roomName) {
    router.history.push(`/`);
  } else {
    createGameFromQueryString({
      name,
      room: roomName,
    });
  }
}


const WaitingRoom = ({ router, room, createGameFromQueryString, errorCode }) => {
    if (room) {
      return <Room />;
    } else {
      if (errorCode === constants.gameErrorCode.CANT_CREATE) {
        router.history.push(`/`);
      }
      addUser(createGameFromQueryString, router);
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
        errorCode: state.game.getIn(['errorCode']),
        // currentUser: state.game.getIn(['currentUser']),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createGameFromQueryString: (data) => dispatch(createGameFromQueryString(data)),
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

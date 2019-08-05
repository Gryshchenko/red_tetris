
import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Input } from '../_base/input/input';
import {ModalWindow} from '../modal/Modal'
import { Button } from '../_base/button/Button';
import { withRouter } from 'react-router';
import './styles.css';
import createNewPlayer from '../../actions/createNewPlayer';
import joinGame from '../../actions/joinGame';
import checkUser from '../../actions/checkUser';
import { ErrorMsg } from '../_base/errorMsg/ErrorMsg';
import constants from '../../../server/const';

const VALID_ID = {
    JOIN_NAME_VALID: 'joinGameName',
    JOIN_ROOM_VALID: 'joinRoomName'
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : '#d9e476',
    maxHeight             :  'calc(100% - 100px)',
  }
};

const joinGameErrors = {
  [constants.gameErrorCode.PLAYER_EXIST]: 'Selected name are exist',
}

const JoinGame = ({ router, games, createNewPlayer, joinGame, joinGameResponse, checkUser, checkUserData }) => {
    const [isModal, setModal] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const setModalOff = () => setModal(false);
    const setModalOn = () => setModal(true);
    if (!games) {
      return null;
    }
    return (
        <div className="joinGameWrap">
            <form onSubmit={(e) => handledSumbit(e, setModalOn, setCurrentUser, checkUser, checkUserData)}>
                <ErrorMsg id={VALID_ID.JOIN_NAME_VALID}>
                    <Input
                        title={'Your name'}
                        id={'joinGameName'}
                    />
                </ErrorMsg>
                {checkUserData.isExistUserName === false && (
                  <span>Selected name are exist</span>
                )}
                <div className='buttonWidth'>
                    <Button
                        title={'Join'}
                    />
                </div>
            </form>
          <ModalWindow
            style={customStyles}
            isOpen={isModal}
          >
            {
              Object.keys(games).map((key) => {
                return (
                  <React.Fragment key={key}>
                    <div className={'waitingRoomPlayerMain'}>
                      <div className={'waitingRoomPlayer'}>
                        <div className={'waitingRoomName'}>Room name: {games[key].name}</div>
                        <div className={'waitingRoomName'}>Player name: {games[key].playerList[0].name}</div>
                      </div>
                      <div className={'waitingRoomButton'}>
                      <Button
                        title={'Join'}
                        onClick={() => {
                          joinGame({
                            room: games[key].name,
                            name: currentUser,
                          });
                        }}/>
                      </div>
                    </div>
                  </React.Fragment >
                );
              })
            }
          </ModalWindow>
        </div>
    );
}

const handledSumbit = (e, setModalOn, setCurrentUser, checkUser, checkUserData) => {
    e.preventDefault();
    const currentUser = document.getElementById('joinGameName').value;

    if (inputValueValid(currentUser)) {
        checkUser(currentUser);
      if (checkUserData.isExistUserName) {
        setModalOn();
        setCurrentUser(currentUser);
      }
    }

}

const inputValueValid = (name) => {
    let isValid = true;
    if (name === '') {
        document.getElementById(VALID_ID.JOIN_NAME_VALID).innerHTML = 'Name is required';
        isValid = false;

    }
    return isValid;
}

const mapStateToProps = (state, router) => {
  const games = state.game.getIn(['games']) ? state.game.getIn(['games']).toJS() : null;
  const checkUserData = state.game.getIn(['checkUser']) ? state.game.getIn(['checkUser']).toJS() : null;
  const joinGameResponse = state.game.getIn(['joinGame']) ? state.game.getIn(['joinGame']).toJS() : null;
    return {
        router,
        room: state.game.getIn(['room']),
        games,
        joinGameResponse,
        checkUserData,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createNewPlayer: (data) => dispatch(createNewPlayer(data)),
        joinGame: (date) => dispatch(joinGame(date)),
        checkUser: (data) => dispatch(checkUser(data)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JoinGame));

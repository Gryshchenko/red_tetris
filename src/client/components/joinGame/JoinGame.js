
import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Input } from '../_base/input/input';
import {ModalWindow} from '../modal/Modal'
import { Button } from '../_base/button/Button';
import { withRouter } from 'react-router';
import './styles.css';
import createNewPlayer from '../../actions/createNewPlayer';
import { ErrorMsg } from '../_base/errorMsg/ErrorMsg';

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

const JoinGame = ({ router, games, createNewPlayer }) => {
    const [isModal, setModal] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const setModalOff = () => setModal(false);
    const setModalOn = () => setModal(true);
    if (!games) {
      return null;
    }
    return (
        <div className="joinGameWrap">
            <form onSubmit={(e) => handledSumbit(e, setModalOn, setCurrentUser)}>
                <ErrorMsg id={VALID_ID.JOIN_NAME_VALID}>
                    <Input
                        title={'Your name'}
                        id={'joinGameName'}
                    />
                </ErrorMsg>
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
                          createNewPlayer({
                            name: games[key].name,
                            room: currentUser,
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

const handledSumbit = (e, setModalOn, setCurrentUser) => {
    e.preventDefault();
    const currentUser = document.getElementById('joinGameName').value;
    if (inputValueValid(currentUser)) {
      setModalOn();
      setCurrentUser(currentUser);
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
    return {
        router,
        room: state.game.getIn(['room']),
        games,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createNewPlayer: (data) => dispatch(createNewPlayer(data)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JoinGame));

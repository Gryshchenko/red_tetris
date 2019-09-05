import React, { useEffect } from 'react';
import './styles.css';
import { ModalWindow } from '../modal/Modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : '#d9e476',
  }
};
const Bord = ({playerList, title, isSingleMode}) => {
    if (!playerList || !playerList.length) {
      return null;
    }
    let winName = null;
    return (
        <React.Fragment>
          {/*<ModalWindow*/}
          {/*  style={customStyles}*/}
          {/*  isOpen={true}*/}
          {/*>*/}
            <div>
              <div className={"bordMainTitle"}>{title}</div>
              {
                playerList.map((player, index) => {
                  if (!isSingleMode && !player.lost) {
                    winName = player.name;
                  }
                  return (
                    <div key={index} className={"bordBase"}>
                      <div className={"bordTextBase"}>
                        <div className={"bordTitleText"}>Player name:</div>
                        <div className={"bordText"}>{player.name}</div>
                      </div>
                      <div className={"bordTextBase"}>
                        <div className={"bordTitleText"}>Score:</div>
                        <div className={"bordText"}>{player.score}</div>
                      </div>
                    </div>
                  );
                })
              }
              {
                !isSingleMode && (
                  <div>
                    <div className={"bordTextBase "}>
                      <div className={"bordTitleText"}>Winner is:</div>
                      <div className={"bordText"}>{winName}</div>
                    </div>
                  </div>
                )
              }
            </div>
          {/*</ModalWindow>*/}
        </React.Fragment>
    );
}

export {
  Bord,
}




import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import './styles.css';

const ModalComponent = ({room, children, isOpen, style }) => {
    return (
        <React.Fragment>
          <Modal style={style} isOpen={isOpen}>
            {children}
          </Modal>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
  const room = state.game.getIn(['room']) ? state.game.getIn(['room']).toJS() : null;
  return {
    room,
  };
}

const ModalWindow = connect(mapStateToProps, null)(ModalComponent);

export {
    ModalWindow,
};

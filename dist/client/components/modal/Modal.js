'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalWindow = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactRedux = require('react-redux');

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModalComponent = function ModalComponent(_ref) {
  var room = _ref.room,
      children = _ref.children,
      isOpen = _ref.isOpen,
      style = _ref.style;

  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement(
      _reactModal2.default,
      { style: style, isOpen: isOpen, ariaHideApp: false },
      children
    )
  );
};

var mapStateToProps = function mapStateToProps(state) {
  var room = state.game.getIn(['room']) ? state.game.getIn(['room']).toJS() : null;
  return {
    room: room
  };
};

var ModalWindow = (0, _reactRedux.connect)(mapStateToProps, null)(ModalComponent);

exports.ModalWindow = ModalWindow;
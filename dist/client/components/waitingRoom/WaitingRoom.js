'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _createGameFromQueryString2 = require('../../actions/createGameFromQueryString');

var _createGameFromQueryString3 = _interopRequireDefault(_createGameFromQueryString2);

require('./styles.css');

var _Room = require('../Room/Room');

var _utils = require('../../utils');

var _const = require('../../../server/const');

var _const2 = _interopRequireDefault(_const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addUser = function addUser(createGameFromQueryString, router) {
  var roomName = (0, _utils.getRoomName)(window);
  var name = (0, _utils.getName)(window);
  if (!name || !roomName) {
    router.history.push('/');
  } else {
    createGameFromQueryString({
      name: name,
      room: roomName
    });
  }
};

var WaitingRoom = function WaitingRoom(_ref) {
  var router = _ref.router,
      room = _ref.room,
      createGameFromQueryString = _ref.createGameFromQueryString,
      errorCode = _ref.errorCode;

  if (room) {
    return _react2.default.createElement(_Room.Room, null);
  } else {
    if (errorCode === _const2.default.gameErrorCode.CANT_CREATE) {
      router.history.push('/');
    }
    addUser(createGameFromQueryString, router);
    return _react2.default.createElement(
      'div',
      { style: {
          width: '100%',
          height: '100%',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        } },
      'Wait pls'
    );
  }
};

var mapStateToProps = function mapStateToProps(state, router) {
  return {
    router: router,
    room: state.game.getIn(['room']),
    errorCode: state.game.getIn(['errorCode'])
    // currentUser: state.game.getIn(['currentUser']),
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    createGameFromQueryString: function createGameFromQueryString(data) {
      return dispatch((0, _createGameFromQueryString3.default)(data));
    }
  };
};

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(WaitingRoom));
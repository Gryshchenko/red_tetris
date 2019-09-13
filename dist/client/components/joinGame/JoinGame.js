'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _input = require('../_base/input/input');

var _Modal = require('../modal/Modal');

var _Button = require('../_base/button/Button');

var _reactRouter = require('react-router');

require('./styles.css');

var _createNewPlayer2 = require('../../actions/createNewPlayer');

var _createNewPlayer3 = _interopRequireDefault(_createNewPlayer2);

var _joinGame2 = require('../../actions/joinGame');

var _joinGame3 = _interopRequireDefault(_joinGame2);

var _checkUser2 = require('../../actions/checkUser');

var _checkUser3 = _interopRequireDefault(_checkUser2);

var _ErrorMsg = require('../_base/errorMsg/ErrorMsg');

var _const = require('../../../server/const');

var _const2 = _interopRequireDefault(_const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VALID_ID = {
  JOIN_NAME_VALID: 'joinGameName',
  JOIN_ROOM_VALID: 'joinRoomName'
};

var customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#d9e476',
    maxHeight: 'calc(100% - 100px)'
  }
};

var joinGameErrors = _defineProperty({}, _const2.default.gameErrorCode.PLAYER_EXIST, 'Selected name are exist');

var JoinGame = function JoinGame(_ref) {
  var router = _ref.router,
      games = _ref.games,
      createNewPlayer = _ref.createNewPlayer,
      joinGame = _ref.joinGame,
      joinGameResponse = _ref.joinGameResponse,
      checkUser = _ref.checkUser,
      checkUserData = _ref.checkUserData;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isModal = _useState2[0],
      setModal = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      currentUser = _useState4[0],
      setCurrentUser = _useState4[1];

  var _useState5 = (0, _react.useState)(''),
      _useState6 = _slicedToArray(_useState5, 2),
      joinGameName = _useState6[0],
      setJoinGameName = _useState6[1];

  var _useState7 = (0, _react.useState)(''),
      _useState8 = _slicedToArray(_useState7, 2),
      joinGameNameError = _useState8[0],
      setJoinGameNameError = _useState8[1];

  var setModalOff = function setModalOff() {
    return setModal(false);
  };
  var setModalOn = function setModalOn() {
    return setModal(true);
  };
  if (!games || Object.keys(games).length < 1) {
    return null;
  }
  return _react2.default.createElement(
    'div',
    { className: 'joinGameWrap' },
    _react2.default.createElement(
      'form',
      { onSubmit: function onSubmit(e) {
          return handledSumbit(e, setModalOn, setCurrentUser, checkUser, checkUserData, joinGameName, setJoinGameNameError);
        } },
      _react2.default.createElement(
        _ErrorMsg.ErrorMsg,
        { errorMessage: joinGameNameError },
        _react2.default.createElement(_input.Input, {
          title: 'Your name',
          value: joinGameName,
          onChange: function onChange(event) {
            setJoinGameName(event.target.value);
            setJoinGameNameError('');
          }
        })
      ),
      checkUserData.isExistUserName === false && _react2.default.createElement(
        'span',
        null,
        'Selected name are exist'
      ),
      _react2.default.createElement(
        'div',
        { className: 'buttonWidth' },
        _react2.default.createElement(_Button.Button, {
          title: 'Join'
        })
      )
    ),
    _react2.default.createElement(
      _Modal.ModalWindow,
      {
        style: customStyles,
        isOpen: isModal
      },
      Object.keys(games).map(function (key) {
        return _react2.default.createElement(
          _react2.default.Fragment,
          { key: key },
          _react2.default.createElement(
            'div',
            { className: 'waitingRoomPlayerMain' },
            _react2.default.createElement(
              'div',
              { className: 'waitingRoomPlayer' },
              _react2.default.createElement(
                'div',
                { className: 'waitingRoomName' },
                'Room name: ',
                games[key].name
              ),
              _react2.default.createElement(
                'div',
                { className: 'waitingRoomName' },
                'Player name: ',
                games[key].playerList[0].name
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'waitingRoomButton' },
              _react2.default.createElement(_Button.Button, {
                title: 'Join',
                onClick: function onClick() {
                  joinGame({
                    room: games[key].name,
                    name: currentUser
                  });
                } })
            )
          )
        );
      })
    )
  );
};

var handledSumbit = function handledSumbit(e, setModalOn, setCurrentUser, checkUser, checkUserData, currentUser, setJoinGameNameError) {
  e.preventDefault();

  if (inputValueValid(currentUser, setJoinGameNameError)) {
    checkUser(currentUser);
    if (checkUserData.isExistUserName) {
      setModalOn();
      setCurrentUser(currentUser);
    }
  }
};

var inputValueValid = function inputValueValid(name, setJoinGameNameError) {
  var isValid = true;
  if (name === '') {
    setJoinGameNameError('Name is required');
    isValid = false;
  }
  return isValid;
};

var mapStateToProps = function mapStateToProps(state, router) {
  var games = state.game.getIn(['games']) ? state.game.getIn(['games']).toJS() : null;
  var checkUserData = state.game.getIn(['checkUser']) ? state.game.getIn(['checkUser']).toJS() : null;
  var joinGameResponse = state.game.getIn(['joinGame']) ? state.game.getIn(['joinGame']).toJS() : null;
  return {
    router: router,
    room: state.game.getIn(['room']),
    games: games,
    joinGameResponse: joinGameResponse,
    checkUserData: checkUserData
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    createNewPlayer: function createNewPlayer(data) {
      return dispatch((0, _createNewPlayer3.default)(data));
    },
    joinGame: function joinGame(date) {
      return dispatch((0, _joinGame3.default)(date));
    },
    checkUser: function checkUser(data) {
      return dispatch((0, _checkUser3.default)(data));
    }
  };
};

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(JoinGame));
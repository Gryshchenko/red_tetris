'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createGameErrors;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

require('./styles.css');

var _getGames2 = require('../../actions/getGames');

var _getGames3 = _interopRequireDefault(_getGames2);

var _createGame = require('../createGame/createGame');

var _createGame2 = _interopRequireDefault(_createGame);

var _JoinGame = require('../joinGame/JoinGame');

var _JoinGame2 = _interopRequireDefault(_JoinGame);

var _reactCollapsible = require('react-collapsible');

var _reactCollapsible2 = _interopRequireDefault(_reactCollapsible);

var _Logo = require('../logo/Logo');

var _Logo2 = _interopRequireDefault(_Logo);

var _const = require('../../../server/const');

var _const2 = _interopRequireDefault(_const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createGameErrors = (_createGameErrors = {}, _defineProperty(_createGameErrors, _const2.default.gameErrorCode.BOTH_EXIST, "These player and room names already exist"), _defineProperty(_createGameErrors, _const2.default.gameErrorCode.GAME_EXIST, 'This room name already exists'), _defineProperty(_createGameErrors, _const2.default.gameErrorCode.PLAYER_EXIST, 'This player name already exists'), _createGameErrors);

var Main = function Main(_ref) {
  var getGames = _ref.getGames,
      currentUser = _ref.currentUser,
      games = _ref.games,
      router = _ref.router,
      room = _ref.room;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      openJoinGame = _useState2[0],
      setOpenJoinGame = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      openCreateGame = _useState4[0],
      setOpenCreateGame = _useState4[1];

  var _useState5 = (0, _react.useState)('-110'),
      _useState6 = _slicedToArray(_useState5, 2),
      topPosition = _useState6[0],
      setTopPosition = _useState6[1];

  (0, _react.useEffect)(function () {
    setTimeout(function () {
      return setTopPosition('10%');
    }, 1000);
    setTimeout(function () {
      return setOpenJoinGame(true);
    }, 1500);
    setTimeout(function () {
      return setOpenCreateGame(true);
    }, 2000);
    if (!games || Object.keys(games).length < 1) {
      getGames();
    }
    if (currentUser && !currentUser.errorCode) {
      router.history.push('/game/' + room.name + '[' + currentUser.name + ']');
    }
  });
  return _react2.default.createElement(
    'section',
    { className: 'main' },
    _react2.default.createElement(_Logo2.default, null),
    _react2.default.createElement(
      'div',
      { onClick: function onClick() {
          return router.history.push('/score');
        }, className: "scoreLink" },
      'TOP 20'
    ),
    _react2.default.createElement(
      'div',
      { className: 'centerMain', style: { top: topPosition } },
      games && Object.keys(games).length > 0 && _react2.default.createElement(
        _reactCollapsible2.default,
        { open: openJoinGame, trigger: _react2.default.createElement(
            'div',
            { className: 'collapsibleTrigger' },
            'Join game'
          ) },
        _react2.default.createElement(_JoinGame2.default, null)
      ),
      _react2.default.createElement(
        _reactCollapsible2.default,
        { open: openCreateGame, trigger: _react2.default.createElement(
            'div',
            { className: 'collapsibleTrigger' },
            'Create game'
          ) },
        _react2.default.createElement(_createGame2.default, null),
        currentUser && currentUser.errorCode && _react2.default.createElement(
          'span',
          null,
          createGameErrors[currentUser.errorCode]
        )
      )
    )
  );
};

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(function (state, router) {
  var currentUser = state.game.getIn(['currentUser']) ? state.game.getIn(['currentUser']).toJS() : null;
  var games = state.game.getIn(['games']) ? state.game.getIn(['games']).toJS() : null;
  var room = state.game.getIn(['room']) ? state.game.getIn(['room']).toJS() : null;
  return {
    router: router,
    currentUser: currentUser,
    games: games,
    room: room
  };
}, function (dispatch) {
  return {
    getGames: function getGames() {
      return dispatch((0, _getGames3.default)());
    }
  };
})(Main));
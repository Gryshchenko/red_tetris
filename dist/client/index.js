'use strict';

var _redux = require('redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _socketIoMiddleWare = require('./middleware/socketIoMiddleWare');

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _main = require('./components/main/main');

var _main2 = _interopRequireDefault(_main);

require('./styles.css');

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _WaitingRoom = require('./components/waitingRoom/WaitingRoom');

var _WaitingRoom2 = _interopRequireDefault(_WaitingRoom);

var _ScoreRoom = require('./components/scoreRoom/ScoreRoom');

var _ScoreRoom2 = _interopRequireDefault(_ScoreRoom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Room from './components/Room/Room';
// import { Room } from './components/Room/Room';
require("babel-core/register");
require("babel-polyfill");

var configureStore = function configureStore(reducer, socket) {
  return (0, _redux.createStore)((0, _redux.combineReducers)({
    game: reducer
  }), composeEnhancers((0, _redux.applyMiddleware)((0, _socketIoMiddleWare.socketIoMiddleWare)(socket), _reduxThunk2.default)));
};
var socket = (0, _socket2.default)('localhost:5000');
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
var store = configureStore(_reducers2.default, socket);

_reactDom2.default.render(_react2.default.createElement(
  _reactRouterDom.HashRouter,
  null,
  _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _react2.default.Fragment,
      null,
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _main2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { path: '/game', component: _WaitingRoom2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { path: '/score', component: _ScoreRoom2.default })
    )
  )
), document.getElementById('tetris'));
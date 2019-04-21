import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createHashHistory } from 'history'
import io from 'socket.io-client';
import { socketIoMiddleWare } from './middleware/socketIoMiddleWare';
import reducer from './reducers';
import App from './components/app';
import Main from './components/main/main';
import './styles.css';
import JoinGame from './components/joinGame/JoinGame';

require("babel-core/register");
require("babel-polyfill");


const configureStore = (reducer, socket) => createStore(
  combineReducers({
    routing: routerReducer,
    game: reducer,
  }),
  composeEnhancers(
    applyMiddleware(
      socketIoMiddleWare(socket),
      thunk
    )),
)
const socket = io('localhost:5000');
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = configureStore(reducer, socket);
const history = syncHistoryWithStore(createHashHistory(), store);

ReactDom.render((
  <Provider store={store}>
    <Router history={history}>
        <Route exact path='/' component={Main} />
        <Route path='/game' component={App} />
        <Route path='/join-game' component={JoinGame} />
    </Router>
  </Provider>
), document.getElementById('tetris'))
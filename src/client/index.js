import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import React from 'react'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import io from 'socket.io-client';
import { socketIoMiddleWare } from './middleware/socketIoMiddleWare';
import reducer from './reducers';
import Room from './components/Room/Room';
import Main from './components/main/main';
import './styles.css';
import JoinGame from './components/joinGame/JoinGame';

import { Provider } from 'react-redux'
// import { Router, Route } from 'react-router'
// import { createHashHistory } from 'history'
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import { HashRouter, Route } from 'react-router-dom';
import WaitingRoom from './components/waitingRoom/WaitingRoom';


require("babel-core/register");
require("babel-polyfill");


const configureStore = (reducer, socket) => createStore(
  combineReducers({
    // routing: routerReducer,
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
// const history = syncHistoryWithStore(createHashHistory(), store);

ReactDom.render((
  <HashRouter >
    <Provider store={store}>
      <React.Fragment>
        {/* <Router history={history}> */}
        <Route exact path='/' component={Main} />
        <Route path='/game' component={Room} />
        <Route path='/join-game' component={JoinGame} />
        <Route path='/waiting-room:[:playerName]' component={WaitingRoom} />
      </React.Fragment>
      {/* </Router> */}
    </Provider>
  </HashRouter>
), document.getElementById('tetris'))
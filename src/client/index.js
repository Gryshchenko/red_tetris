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
import { Provider } from 'react-redux'

import { HashRouter, Route } from 'react-router-dom';


require("babel-core/register");
require("babel-polyfill");


const configureStore = (reducer, socket) => createStore(
  combineReducers({
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

ReactDom.render((
  <HashRouter >
    <Provider store={store}>
      <React.Fragment>
         {/*<Router history={history}> */}
        <Route exact path='/' component={Main} />
        <Route path='/game' component={Room} />
      </React.Fragment>
       {/*</Router> */}
    </Provider>
  </HashRouter>
), document.getElementById('tetris'))

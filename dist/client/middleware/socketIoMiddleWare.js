'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socketIoMiddleWare = exports.parseUrl = undefined;

var _createNewPlayer = require('../actions/createNewPlayer');

var _createNewPlayer2 = _interopRequireDefault(_createNewPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import disconnect from '../actions/disconnect'
var parseUrl = function parseUrl(data) {
  var hash = data.hash;
  var matches = hash && hash.match(/#([^\[]+)\[([^\]]+)\]/);
  return matches ? { name: matches[2], room: matches[1] } : null;
};
var socketIoMiddleWare = function socketIoMiddleWare(socket) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;

    if (socket) {
      socket.on('action', dispatch);
    }
    return function (next) {
      return function (action) {
        if (action.type == '@@router/LOCATION_CHANGE') {
          var data = parseUrl(action.payload);
          var state = getState();
          if (state.game.room) {}
          // dispatch(disconnect(data))


          // dispatch(createNewPlayer(data))
        }
        if (socket && action.type && action.type.indexOf('server/') === 0) {
          var serverAction = action.type.split('/');
          socket.emit(serverAction[1], action.data);
        }

        return next(action);
      };
    };
  };
};

exports.parseUrl = parseUrl;
exports.socketIoMiddleWare = socketIoMiddleWare;
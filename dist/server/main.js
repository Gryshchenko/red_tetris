'use strict';

var _params = require('../../params');

var _params2 = _interopRequireDefault(_params);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require('./socket/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require("babel-core/register");
require("babel-polyfill");

var app = (0, _express2.default)();
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

var server = require('http').createServer(app);

global.io = require('socket.io')(server);
_mongoose2.default.Promise = global.Promise;

_mongoose2.default.connect('mongodb://' + _params2.default.db.dbHost + ':' + _params2.default.db.dbPort + '/' + _params2.default.db.dbName, { useNewUrlParser: true });

var db = _mongoose2.default.connection;

app.get('/', function (req, res) {
  return res.end();
});

io.on('connection', function (socket) {
  (0, _index2.default)(socket);
});

db.once('open', function () {
  app.emit('ready');
});

server.listen(_params2.default.server.port, _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('listening on ' + _params2.default.server.port);

        case 1:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));
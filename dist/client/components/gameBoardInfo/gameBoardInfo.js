'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameBoardInfo = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./styles.css');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setBlockClassName = function setBlockClassName(color) {
  if (color != 0) return 'base';
  return '';
};

var setRows = function setRows(map) {
  var result = map.map(function (rows, idx) {
    return _react2.default.createElement(
      Y,
      { key: 'y-' + idx },
      rows.map(function (cols, idx) {
        return _react2.default.createElement(X, { key: 'x-' + idx, color: cols });
      })
    );
  });
  return result;
};

var X = function X(_ref) {
  var color = _ref.color,
      idx = _ref.idx;

  return _react2.default.createElement('div', { key: idx, className: 'block blockBorder ' + setBlockClassName(color) });
};

var Y = function Y(_ref2) {
  var children = _ref2.children,
      idx = _ref2.idx;

  return _react2.default.createElement(
    'div',
    { key: idx, className: 'rows' },
    children
  );
};

var _formatGameboardInfo = function _formatGameboardInfo(number) {
  var result = '';
  var stringScore = number.toString();

  for (var i = 0; i < 4 - stringScore.length; i++) {
    result += '0';
  }
  result += stringScore;
  return result;
};

var gameBoardInfo = function gameBoardInfo(props) {
  var currentPiece = props.currentPiece,
      room = props.room,
      currentUser = props.currentUser;


  return _react2.default.createElement(
    'div',
    { className: 'gameBoardInfoWidth' },
    _react2.default.createElement(
      'div',
      { className: 'gameBoardInfoValue' },
      _react2.default.createElement(
        'span',
        { className: 'textMargin' },
        'Score'
      ),
      _react2.default.createElement(
        'span',
        { className: 'textMargin' },
        _formatGameboardInfo(room.playerList.find(function (player) {
          return player._id == currentUser._id;
        }).score)
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'gameBoardInfoValue' },
      _react2.default.createElement(
        'span',
        { className: 'textMargin' },
        'Cleans'
      ),
      _react2.default.createElement(
        'span',
        { className: 'textMargin' },
        _formatGameboardInfo(room.playerList.find(function (player) {
          return player._id == currentUser._id;
        }).clearedRows)
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'gameBoardInfoValue' },
      _react2.default.createElement(
        'span',
        { className: 'textMargin' },
        'Next'
      ),
      _react2.default.createElement(
        'div',
        null,
        currentPiece ? setRows(room.pieceList[currentPiece].shape) : null
      )
    )
  );
};

var mapStateToProps = function mapStateToProps(state, router) {
  var room = state.game.getIn(['room']) ? state.game.getIn(['room']).toJS() : null;

  return {
    router: router,
    room: room,
    currentPiece: state.game.getIn(['currentPiece']),
    currentUser: state.game.getIn(['currentUser']).toJS()
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

var GameBoardInfo = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(gameBoardInfo);

exports.GameBoardInfo = GameBoardInfo;
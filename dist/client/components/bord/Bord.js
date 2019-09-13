'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bord = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./styles.css');

var _Modal = require('../modal/Modal');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#d9e476'
  }
};
var Bord = function Bord(_ref) {
  var playerList = _ref.playerList,
      title = _ref.title,
      isSingleMode = _ref.isSingleMode,
      isPaused = _ref.isPaused;

  if (!playerList || !playerList.length) {
    return null;
  }
  var winName = null;
  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: "bordMainTitle" },
        title
      ),
      playerList.map(function (player, index) {
        if (!isSingleMode && !player.lost) {
          winName = player.name;
        }
        return _react2.default.createElement(
          'div',
          { key: index, className: "bordBase" },
          _react2.default.createElement(
            'div',
            { className: "bordTextBase" },
            _react2.default.createElement(
              'div',
              { className: "bordTitleText" },
              'Player name:'
            ),
            _react2.default.createElement(
              'div',
              { className: "bordText" },
              player.name
            )
          ),
          _react2.default.createElement(
            'div',
            { className: "bordTextBase" },
            _react2.default.createElement(
              'div',
              { className: "bordTitleText" },
              'Score:'
            ),
            _react2.default.createElement(
              'div',
              { className: "bordText" },
              player.score
            )
          )
        );
      }),
      !isSingleMode && !isPaused && _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: "bordTextBase " },
          _react2.default.createElement(
            'div',
            { className: "bordTitleText" },
            'Winner is:'
          ),
          _react2.default.createElement(
            'div',
            { className: "bordText" },
            winName
          )
        )
      )
    )
  );
};

exports.Bord = Bord;
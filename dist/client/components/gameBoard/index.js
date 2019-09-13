'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameBoard = undefined;

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

var gameBoard = function gameBoard(props) {
  var map = props.map;

  return _react2.default.createElement(
    Wrapper,
    null,
    setRows(map)
  );
};

var mapStateToProps = function mapStateToProps(state, router) {
  return {
    map: state.game.getIn(['map']).toJS()
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
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

var Wrapper = function Wrapper(_ref3) {
  var children = _ref3.children;

  return _react2.default.createElement(
    'div',
    { className: 'wrapper' },
    children
  );
};

var GameBoard = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(gameBoard);
exports.GameBoard = GameBoard;
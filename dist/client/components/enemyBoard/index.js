'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnemyBoard = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./styles.css');

var _reactRedux = require('react-redux');

var _utils = require('../../utils');

var _index = require('../../reducers/index');

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

var enemyBoard = function enemyBoard(props) {
  var room = props.room,
      currentUser = props.currentUser;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      enemyMap = _useState2[0],
      setEnemyMap = _useState2[1];

  (0, _react.useEffect)(function () {
    setEnemyMap((0, _utils.getEnemyMap)(room.playerList, currentUser.name));
  });

  return _react2.default.createElement(
    Wrapper,
    null,
    setRows(enemyMap && enemyMap.length ? enemyMap : _index.map)
  );
};

var mapStateToProps = function mapStateToProps(state) {
  var room = state.game.getIn(['room']) ? state.game.getIn(['room']).toJS() : null;
  var currentUser = state.game.getIn(['currentUser']) ? state.game.getIn(['currentUser']).toJS() : null;

  return {
    room: room,
    currentUser: currentUser
  };
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

var EnemyBoard = (0, _reactRedux.connect)(mapStateToProps)(enemyBoard);
exports.EnemyBoard = EnemyBoard;
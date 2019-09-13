'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Button = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function Button(_ref) {
    var onClick = _ref.onClick,
        title = _ref.title,
        type = _ref.type;

    return _react2.default.createElement(
        'button',
        { onClick: onClick, type: type, className: 'button center' },
        title,
        _react2.default.createElement('span', { className: 'pulse' })
    );
};

exports.Button = Button;
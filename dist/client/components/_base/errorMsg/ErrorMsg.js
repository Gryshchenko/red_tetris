'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ErrorMsg = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrorMsg = function ErrorMsg(_ref) {
    var children = _ref.children,
        errorMessage = _ref.errorMessage;

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            null,
            children
        ),
        _react2.default.createElement(
            'span',
            { className: 'valid' },
            errorMessage
        )
    );
};

exports.ErrorMsg = ErrorMsg;
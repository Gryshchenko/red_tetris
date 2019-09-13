'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Input = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Input = function Input(_ref) {
    var onChange = _ref.onChange,
        title = _ref.title,
        value = _ref.value,
        id = _ref.id,
        _ref$type = _ref.type,
        type = _ref$type === undefined ? "text" : _ref$type,
        text = _ref.text,
        wrapperStyle = _ref.wrapperStyle,
        textStyle = _ref.textStyle;

    return _react2.default.createElement(
        'div',
        { style: wrapperStyle },
        _react2.default.createElement(
            'label',
            { htmlFor: 'lname', className: 'active' },
            title
        ),
        _react2.default.createElement('input', { id: id, value: value, onChange: onChange, type: type, className: 'cool' }),
        text && _react2.default.createElement(
            'div',
            { style: textStyle },
            text
        )
    );
};

exports.Input = Input;
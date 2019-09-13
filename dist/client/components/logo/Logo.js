'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./styles.css');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logo = function Logo(props) {
    var _useState = (0, _react.useState)(''),
        _useState2 = _slicedToArray(_useState, 2),
        logoText = _useState2[0],
        setLogoText = _useState2[1];

    (0, _react.useEffect)(function () {
        setLogoTextAnimation(setLogoText);
    }, []);
    return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'span',
                { onClick: function onClick() {
                        return props.history.push('/');
                    }, className: 'logo' },
                logoText
            )
        )
    );
};

var setLogoTextAnimation = function setLogoTextAnimation(setLogoText) {
    var newLogoText = 'RED TETRIS';
    var tmp = '';
    var i = 0;

    var interval = setInterval(function () {
        if (i < newLogoText.length) {
            tmp += newLogoText[i];
            setLogoText(tmp);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 100);
};

exports.default = (0, _reactRouter.withRouter)(Logo);
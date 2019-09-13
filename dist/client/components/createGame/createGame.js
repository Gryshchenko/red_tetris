'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

require('./styles.css');

var _createNewGame2 = require('../../actions/createNewGame');

var _createNewGame3 = _interopRequireDefault(_createNewGame2);

var _input = require('../_base/input/input');

var _Button = require('../_base/button/Button');

var _reactRouter = require('react-router');

var _ErrorMsg = require('../_base/errorMsg/ErrorMsg');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreateGame = function CreateGame(props) {
    var _useState = (0, _react.useState)(''),
        _useState2 = _slicedToArray(_useState, 2),
        roomName = _useState2[0],
        setRoomName = _useState2[1];

    var _useState3 = (0, _react.useState)(''),
        _useState4 = _slicedToArray(_useState3, 2),
        playerName = _useState4[0],
        setPlayerName = _useState4[1];

    var _useState5 = (0, _react.useState)(false),
        _useState6 = _slicedToArray(_useState5, 2),
        singleMode = _useState6[0],
        setSingleMode = _useState6[1];

    var _useState7 = (0, _react.useState)(''),
        _useState8 = _slicedToArray(_useState7, 2),
        roomNameError = _useState8[0],
        setRoomNameError = _useState8[1];

    var _useState9 = (0, _react.useState)(''),
        _useState10 = _slicedToArray(_useState9, 2),
        playerNameError = _useState10[0],
        setPlayerNameError = _useState10[1];

    var createNewGame = props.createNewGame;


    return _react2.default.createElement(
        'div',
        { className: 'createGameWrap' },
        _react2.default.createElement(
            'form',
            { onSubmit: function onSubmit(e) {
                    return handledSumbit(e, createNewGame, roomName, playerName, singleMode, setRoomNameError, setPlayerNameError);
                } },
            _react2.default.createElement(
                _ErrorMsg.ErrorMsg,
                { errorMessage: roomNameError },
                _react2.default.createElement(_input.Input, {
                    title: 'Room name',
                    value: roomName,
                    onChange: function onChange(event) {
                        setRoomName(event.target.value);
                        setRoomNameError('');
                    }
                })
            ),
            _react2.default.createElement(
                _ErrorMsg.ErrorMsg,
                { errorMessage: playerNameError },
                _react2.default.createElement(_input.Input, {
                    title: 'Your name',
                    value: playerName,
                    onChange: function onChange(event) {
                        setPlayerName(event.target.value);
                        setPlayerNameError('');
                    }
                })
            ),
            _react2.default.createElement(_input.Input, {
                type: 'checkbox',
                text: 'Single mode',
                checked: singleMode,
                onChange: function onChange(event) {
                    setSingleMode(event.target.checked);
                },
                wrapperStyle: {
                    display: 'flex',
                    height: '10px'
                },
                textStyle: {
                    margin: '3px',
                    height: '10px'
                }
            }),
            _react2.default.createElement(
                'div',
                { className: 'buttonWidth' },
                _react2.default.createElement(_Button.Button, {
                    type: 'submit',
                    title: 'Create'
                })
            )
        )
    );
};

var handledSumbit = function handledSumbit(e, createNewGame, roomName, hostName, singleMode, setRoomNameError, setPlayerNameError) {
    e.preventDefault();
    if (inputValueValid(hostName, roomName, setRoomNameError, setPlayerNameError)) {
        createNewGame({
            name: hostName,
            room: roomName,
            isSingleMode: singleMode
        });
    }
};

var inputValueValid = function inputValueValid(name, room, setRoomNameError, setPlayerNameError) {
    var isValid = true;
    if (name === '') {
        setPlayerNameError('Player name is required');
        isValid = false;
    }
    if (room === '') {
        setRoomNameError('Room name is required');
        isValid = false;
    }
    return isValid;
};

var mapStateToProps = function mapStateToProps(state, router) {
    return {
        router: router,
        room: state.game.getIn(['room'])
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        createNewGame: function createNewGame(data) {
            return dispatch((0, _createNewGame3.default)(data));
        }
    };
};

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CreateGame));
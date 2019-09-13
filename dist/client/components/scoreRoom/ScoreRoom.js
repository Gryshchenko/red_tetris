'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

require('./styles.css');

var _getPlayers2 = require('../../actions/getPlayers');

var _getPlayers3 = _interopRequireDefault(_getPlayers2);

var _Logo = require('../logo/Logo');

var _Logo2 = _interopRequireDefault(_Logo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#d9e476',
    maxHeight: 'calc(100% - 100px)'
  }
};

var ScoreRoom = function ScoreRoom(_ref) {
  var players = _ref.players,
      getPlayers = _ref.getPlayers,
      router = _ref.router;

  (0, _react.useEffect)(function () {
    if (!players) {
      getPlayers();
    }
  });
  if (!players) {
    return _react2.default.createElement(
      'div',
      { className: 'emptyList' },
      _react2.default.createElement(_Logo2.default, null),
      _react2.default.createElement(
        'div',
        null,
        'Score list is empty ',
        _react2.default.createElement(
          'a',
          { className: 'emptyText', onClick: function onClick() {
              return router.history.push('/');
            } },
          ' go to main page'
        )
      )
    );
  } else {
    players = players.sort(function (fp, sp) {
      return fp.score > sp.score;
    }).slice(0, 20);
    return _react2.default.createElement(
      'div',
      { className: 'scoreBase' },
      _react2.default.createElement(_Logo2.default, null),
      Object.keys(players).map(function (key) {
        return _react2.default.createElement(
          _react2.default.Fragment,
          { key: key },
          _react2.default.createElement(
            'div',
            { className: 'waitingRoomPlayerMain' },
            _react2.default.createElement(
              'div',
              { className: 'waitingRoomPlayer' },
              _react2.default.createElement(
                'div',
                { className: 'waitingRoomName' },
                'Player name: ',
                players[key].name
              ),
              _react2.default.createElement(
                'div',
                { className: 'waitingRoomName' },
                'Player score: ',
                players[key].score
              )
            )
          )
        );
      })
    );
  }
};

var mapStateToProps = function mapStateToProps(state, router) {
  var players = state.game.getIn(['players']) ? state.game.getIn(['players']).toJS() : null;
  return {
    router: router,
    players: players
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getPlayers: function getPlayers() {
      return dispatch((0, _getPlayers3.default)());
    }
  };
};

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ScoreRoom));
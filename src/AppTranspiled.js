'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _emojiMartData = require('@emoji-mart/data');

var _emojiMartData2 = _interopRequireDefault(_emojiMartData);

var _emojiMartReact = require('@emoji-mart/react');

var _emojiMartReact2 = _interopRequireDefault(_emojiMartReact);

function App() {
    return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(_emojiMartReact2['default'], { data: _emojiMartData2['default'], onEmojiSelect: console.log })
    );
}

exports['default'] = App;
module.exports = exports['default'];

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// import data from '@emoji-mart/data'
// import Picker from '@emoji-mart/react'

var _emojiPickerReact = require('emoji-picker-react');

var _emojiPickerReact2 = _interopRequireDefault(_emojiPickerReact);

function MyEmojiPicker() {
    return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(_emojiPickerReact2['default'], null)
    );
}

exports['default'] = MyEmojiPicker;
module.exports = exports['default'];
/* <Picker onEmojiSelect={console.log} /> */

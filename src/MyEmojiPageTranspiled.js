'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

require('./MyEmojiPicker.css');

var _MyEmojiPageRowTranspiledJs = require('./MyEmojiPageRowTranspiled.js');

var _MyEmojiPageRowTranspiledJs2 = _interopRequireDefault(_MyEmojiPageRowTranspiledJs);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function MyEmojiPage(_ref) {
    var title = _ref.title;
    var emojis = _ref.emojis;
    var pickEmoji = _ref.pickEmoji;

    var props = _objectWithoutProperties(_ref, ['title', 'emojis', 'pickEmoji']);

    function splitByRows(emojis, rowSize) {
        var result = [];
        var currentRow = [];

        for (var i = 0; i < emojis.length; i++) {
            currentRow.push(emojis[i]);

            if (currentRow.length === rowSize || i === emojis.length - 1) {
                result.push(currentRow);
                currentRow = [];
            }
        }

        return result;
    }

    var emojiPages = splitByRows(emojis, 9).map(function (emojiRow, index) {
        return _react2['default'].createElement(_MyEmojiPageRowTranspiledJs2['default'], { key: index, emojis: emojiRow, pickEmoji: pickEmoji });
    });

    return _react2['default'].createElement(
        'div',
        { className: 'dch-dropdown-emojis' },
        _react2['default'].createElement(
            'div',
            { className: 'dch-px-4' },
            _react2['default'].createElement(
                'div',
                { className: 'dch-dropdown-emojis-title' },
                _react2['default'].createElement(
                    'b',
                    null,
                    title
                )
            ),
            _react2['default'].createElement(
                'div',
                { className: 'dch-dropdown-emojis-list' },
                emojiPages
            )
        )
    );
}

exports['default'] = MyEmojiPage;
module.exports = exports['default'];

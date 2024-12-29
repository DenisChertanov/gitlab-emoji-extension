"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

require('./MyEmojiPicker.css');

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function MyEmojiPageRow(_ref) {
    var emojis = _ref.emojis;
    var pickEmoji = _ref.pickEmoji;

    var props = _objectWithoutProperties(_ref, ["emojis", "pickEmoji"]);

    var emojiItems = emojis.map(function (emoji) {
        return _react2["default"].createElement(
            "button",
            {
                type: "button",
                className: "dch-dropdown-emojis-list-row-button dch-default-button dch-button dch-btn-default-tertiary",
                key: emoji.emoji,
                onClick: function () {
                    pickEmoji(emoji.emoji, emoji.code);
                }
            },
            _react2["default"].createElement(
                "b",
                { className: "dch-emoji-button", title: emoji.code },
                emoji.emoji
            )
        );
    });

    return _react2["default"].createElement(
        "div",
        { className: "dch-dropdown-emojis-list-row" },
        emojiItems
    );
}

exports["default"] = MyEmojiPageRow;
module.exports = exports["default"];

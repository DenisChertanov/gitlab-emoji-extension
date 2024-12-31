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

function MyCrossButton(_ref) {
    var clearState = _ref.clearState;

    var props = _objectWithoutProperties(_ref, ["clearState"]);

    return _react2["default"].createElement(
        "div",
        { className: "dch-cross-btn-div" },
        _react2["default"].createElement(
            "button",
            {
                name: "clear",
                title: "Clear",
                "aria-label": "Clear",
                type: "button",
                className: "dch-cross-btn",
                onClick: function () {
                    return clearState();
                }
            },
            _react2["default"].createElement(
                "svg",
                { className: "gl-button-icon gl-icon dch16 gl-fill-current" },
                _react2["default"].createElement("use", { href: "https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#clear", fill: "#28272d" })
            )
        )
    );
}

exports["default"] = MyCrossButton;
module.exports = exports["default"];

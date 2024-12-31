'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

require('./MyEmojiPicker.css');

var _emojisJson = require('./emojis.json');

var _emojisJson2 = _interopRequireDefault(_emojisJson);

var _MyEmojiPageTranspiledJs = require('./MyEmojiPageTranspiled.js');

var _MyEmojiPageTranspiledJs2 = _interopRequireDefault(_MyEmojiPageTranspiledJs);

var _MyCrossButtonTranspiledJs = require('./MyCrossButtonTranspiled.js');

var _MyCrossButtonTranspiledJs2 = _interopRequireDefault(_MyCrossButtonTranspiledJs);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function MyEmojiPicker(_ref) {
    var pickEmoji = _ref.pickEmoji;
    var getLastUsagedEmojis = _ref.getLastUsagedEmojis;
    var initActiveGroup = _ref.initActiveGroup;
    var initActiveGroupIndex = _ref.initActiveGroupIndex;
    var emojiDiv = _ref.emojiDiv;

    var props = _objectWithoutProperties(_ref, ['pickEmoji', 'getLastUsagedEmojis', 'initActiveGroup', 'initActiveGroupIndex', 'emojiDiv']);

    var _useState = (0, _react.useState)(initActiveGroupIndex);

    var _useState2 = _slicedToArray(_useState, 2);

    var activeEmojiGroupIndex = _useState2[0];
    var setActiveEmojiGroupIndex = _useState2[1];

    var _useState3 = (0, _react.useState)(initActiveGroup);

    var _useState32 = _slicedToArray(_useState3, 2);

    var activeEmojiGroup = _useState32[0];
    var setActiveEmojiGroup = _useState32[1];

    var _useState4 = (0, _react.useState)("");

    var _useState42 = _slicedToArray(_useState4, 2);

    var searchValue = _useState42[0];
    var setSearchValue = _useState42[1];

    var _useState5 = (0, _react.useState)(getLastUsagedEmojis());

    var _useState52 = _slicedToArray(_useState5, 2);

    var lastUsedEmojis = _useState52[0];
    var setLastUsedEmojis = _useState52[1];

    function fetchLastUsedEmojis() {
        var lastUsedEmojis;
        return regeneratorRuntime.async(function fetchLastUsedEmojis$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    context$2$0.next = 2;
                    return regeneratorRuntime.awrap(getLastUsagedEmojis());

                case 2:
                    lastUsedEmojis = context$2$0.sent;

                    setLastUsedEmojis(lastUsedEmojis);

                    return context$2$0.abrupt('return', lastUsedEmojis);

                case 5:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    }

    function clearState() {
        var lastUsedEmojis;
        return regeneratorRuntime.async(function clearState$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    context$2$0.next = 2;
                    return regeneratorRuntime.awrap(fetchLastUsedEmojis());

                case 2:
                    lastUsedEmojis = context$2$0.sent;

                    if (lastUsedEmojis && lastUsedEmojis.emojis.length != 0) {
                        setActiveEmojiGroup(lastUsedEmojis);
                        setActiveEmojiGroupIndex(-1);
                    } else {
                        setActiveEmojiGroup(_emojisJson2['default'][0]);
                        setActiveEmojiGroupIndex(0);
                    }

                    setSearchValue("");

                    // console.log("State after clear:");
                    // console.log(lastUsedEmojis);

                case 5:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    }

    function onSearchInputChage(value) {
        var emojis, i, j, searchEmojiGroup;
        return regeneratorRuntime.async(function onSearchInputChage$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    setSearchValue(value);

                    if (!(value === "")) {
                        context$2$0.next = 4;
                        break;
                    }

                    clearState();
                    return context$2$0.abrupt('return');

                case 4:
                    emojis = [];

                    for (i = 0; i < _emojisJson2['default'].length; i++) {
                        for (j = 0; j < _emojisJson2['default'][i].emojis.length; j++) {
                            if (_emojisJson2['default'][i].emojis[j].code.includes(value)) {
                                emojis.push(_emojisJson2['default'][i].emojis[j]);
                            }
                        }
                    }
                    searchEmojiGroup = { title: "Search", emojis: emojis };

                    setActiveEmojiGroup(searchEmojiGroup);
                    setActiveEmojiGroupIndex(-2);

                case 9:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    }

    function emojiButtonClick(emoji, code) {
        return regeneratorRuntime.async(function emojiButtonClick$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    context$2$0.next = 2;
                    return regeneratorRuntime.awrap(pickEmoji(emoji, code, emojiDiv));

                case 2:
                    context$2$0.next = 4;
                    return regeneratorRuntime.awrap(clearState());

                case 4:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    }

    return _react2['default'].createElement(
        'div',
        { className: 'dch-dropdown' },
        _react2['default'].createElement(
            'div',
            { className: 'dch-dropdown-inner' },
            _react2['default'].createElement(
                'div',
                { className: 'dch-search-box' },
                _react2['default'].createElement(
                    'svg',
                    { className: 'dch-search-box-icon' },
                    _react2['default'].createElement('use', { href: 'https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#search', fill: '#737278' })
                ),
                _react2['default'].createElement('input', {
                    type: 'search',
                    placeholder: 'Search',
                    className: 'dch-search-box-input',
                    'aria-label': 'Search for an emoji',
                    value: searchValue,
                    onChange: function (e) {
                        onSearchInputChage(e.target.value);
                    }
                }),
                searchValue !== "" && _react2['default'].createElement(_MyCrossButtonTranspiledJs2['default'], { clearState: clearState })
            ),
            _react2['default'].createElement(
                'div',
                { className: 'dch-dropdown-emojis-block' },
                _react2['default'].createElement(
                    'div',
                    { className: 'dch-dropdown-contents' },
                    _react2['default'].createElement(
                        'div',
                        { className: 'dch-dropdown-contents-categories' },
                        _react2['default'].createElement(
                            'button',
                            {
                                type: 'button',
                                className: 'dch-dropdown-contents-category dch-default-button dch-btn-default-tertiary ' + (activeEmojiGroupIndex === -1 ? 'dch-emoji-category-active' : ''),
                                onClick: function () {
                                    setActiveEmojiGroup(lastUsedEmojis);
                                    setActiveEmojiGroupIndex(-1);
                                }
                            },
                            _react2['default'].createElement(
                                'svg',
                                { className: 'gl-button-icon gl-icon dch16 gl-fill-current' },
                                _react2['default'].createElement('use', { href: 'https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#history', fill: '#28272d' })
                            )
                        ),
                        _react2['default'].createElement(
                            'button',
                            {
                                'aria-label': 'Smileys & Emotion',
                                type: 'button',
                                className: 'dch-dropdown-contents-category dch-default-button dch-btn-default-tertiary ' + (activeEmojiGroupIndex === 0 ? 'dch-emoji-category-active' : ''),
                                onClick: function () {
                                    setActiveEmojiGroup(_emojisJson2['default'][0]);
                                    setActiveEmojiGroupIndex(0);
                                }
                            },
                            _react2['default'].createElement(
                                'svg',
                                { className: 'gl-button-icon gl-icon s16 gl-fill-current' },
                                _react2['default'].createElement('use', { href: 'https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#smiley', fill: '#28272d' })
                            )
                        ),
                        _react2['default'].createElement(
                            'button',
                            {
                                'aria-label': 'People & Body',
                                type: 'button',
                                className: 'dch-dropdown-contents-category dch-default-button dch-btn-default-tertiary ' + (activeEmojiGroupIndex === 1 ? 'dch-emoji-category-active' : ''),
                                onClick: function () {
                                    setActiveEmojiGroup(_emojisJson2['default'][1]);
                                    setActiveEmojiGroupIndex(1);
                                }
                            },
                            _react2['default'].createElement(
                                'svg',
                                { className: 'gl-button-icon gl-icon s16 gl-fill-current' },
                                _react2['default'].createElement('use', { href: 'https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#users', fill: '#28272d' })
                            )
                        ),
                        _react2['default'].createElement(
                            'button',
                            {
                                'aria-label': 'Animals & Nature',
                                type: 'button',
                                className: 'dch-dropdown-contents-category dch-default-button dch-btn-default-tertiary ' + (activeEmojiGroupIndex === 2 ? 'dch-emoji-category-active' : ''),
                                onClick: function () {
                                    setActiveEmojiGroup(_emojisJson2['default'][2]);
                                    setActiveEmojiGroupIndex(2);
                                }
                            },
                            _react2['default'].createElement(
                                'svg',
                                { className: 'gl-button-icon gl-icon s16 gl-fill-current' },
                                _react2['default'].createElement('use', { href: 'https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#nature', fill: '#28272d' })
                            )
                        ),
                        _react2['default'].createElement(
                            'button',
                            {
                                'aria-label': 'Food & Drink',
                                type: 'button',
                                className: 'dch-dropdown-contents-category dch-default-button dch-btn-default-tertiary ' + (activeEmojiGroupIndex === 3 ? 'dch-emoji-category-active' : ''),
                                onClick: function () {
                                    setActiveEmojiGroup(_emojisJson2['default'][3]);
                                    setActiveEmojiGroupIndex(3);
                                }
                            },
                            _react2['default'].createElement(
                                'svg',
                                { className: 'gl-button-icon gl-icon s16 gl-fill-current' },
                                _react2['default'].createElement('use', { href: 'https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#food', fill: '#28272d' })
                            )
                        ),
                        _react2['default'].createElement(
                            'button',
                            {
                                'aria-label': 'Travel & Places',
                                type: 'button',
                                className: 'dch-dropdown-contents-category dch-default-button dch-btn-default-tertiary ' + (activeEmojiGroupIndex === 4 ? 'dch-emoji-category-active' : ''),
                                onClick: function () {
                                    setActiveEmojiGroup(_emojisJson2['default'][4]);
                                    setActiveEmojiGroupIndex(4);
                                }
                            },
                            _react2['default'].createElement(
                                'svg',
                                { className: 'gl-button-icon gl-icon s16 gl-fill-current' },
                                _react2['default'].createElement('use', { href: 'https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#car', fill: '#28272d' })
                            )
                        ),
                        _react2['default'].createElement(
                            'button',
                            {
                                'aria-label': 'Activities',
                                type: 'button',
                                className: 'dch-dropdown-contents-category dch-default-button dch-btn-default-tertiary ' + (activeEmojiGroupIndex === 5 ? 'dch-emoji-category-active' : ''),
                                onClick: function () {
                                    setActiveEmojiGroup(_emojisJson2['default'][5]);
                                    setActiveEmojiGroupIndex(5);
                                }
                            },
                            _react2['default'].createElement(
                                'svg',
                                { className: 'gl-button-icon gl-icon s16 gl-fill-current' },
                                _react2['default'].createElement('use', { href: 'https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#dumbbell', fill: '#28272d' })
                            )
                        ),
                        _react2['default'].createElement(
                            'button',
                            {
                                'aria-label': 'Objects',
                                type: 'button',
                                className: 'dch-dropdown-contents-category dch-default-button dch-btn-default-tertiary ' + (activeEmojiGroupIndex === 6 ? 'dch-emoji-category-active' : ''),
                                onClick: function () {
                                    setActiveEmojiGroup(_emojisJson2['default'][6]);
                                    setActiveEmojiGroupIndex(6);
                                }
                            },
                            _react2['default'].createElement(
                                'svg',
                                { className: 'gl-button-icon gl-icon s16 gl-fill-current' },
                                _react2['default'].createElement('use', { href: 'https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#object', fill: '#28272d' })
                            )
                        ),
                        _react2['default'].createElement(
                            'button',
                            {
                                'aria-label': 'Symbols',
                                type: 'button',
                                className: 'dch-dropdown-contents-category dch-default-button dch-btn-default-tertiary ' + (activeEmojiGroupIndex === 7 ? 'dch-emoji-category-active' : ''),
                                onClick: function () {
                                    setActiveEmojiGroup(_emojisJson2['default'][7]);
                                    setActiveEmojiGroupIndex(7);
                                }
                            },
                            _react2['default'].createElement(
                                'svg',
                                { className: 'gl-button-icon gl-icon s16 gl-fill-current' },
                                _react2['default'].createElement('use', { href: 'https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#trigger-source', fill: '#28272d' })
                            )
                        ),
                        _react2['default'].createElement(
                            'button',
                            {
                                'aria-label': 'Flags',
                                type: 'button',
                                className: 'dch-dropdown-contents-category dch-default-button dch-btn-default-tertiary ' + (activeEmojiGroupIndex === 8 ? 'dch-emoji-category-active' : ''),
                                onClick: function () {
                                    setActiveEmojiGroup(_emojisJson2['default'][8]);
                                    setActiveEmojiGroupIndex(8);
                                }
                            },
                            _react2['default'].createElement(
                                'svg',
                                { className: 'gl-button-icon gl-icon s16 gl-fill-current' },
                                _react2['default'].createElement('use', { href: 'https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#flag', fill: '#28272d' })
                            )
                        )
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    null,
                    _react2['default'].createElement(_MyEmojiPageTranspiledJs2['default'], { title: activeEmojiGroup.title, emojis: activeEmojiGroup.emojis, pickEmoji: emojiButtonClick })
                )
            )
        )
    );
}

exports['default'] = MyEmojiPicker;
module.exports = exports['default'];

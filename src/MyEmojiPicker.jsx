import './MyEmojiPicker.css'

import emojiGroups from './emojis.json'

import MyEmojiPage from './MyEmojiPageTranspiled.js'
import MyCrossButton from './MyCrossButtonTranspiled.js'
import { useState } from 'react'

import React from "react";
import ReactDOM from "react-dom";

function MyEmojiPicker({ pickEmoji, getLastUsagedEmojis, initActiveGroup, initActiveGroupIndex, emojiDiv, ...props }) {

    const [activeEmojiGroupIndex, setActiveEmojiGroupIndex] = useState(initActiveGroupIndex)
    const [activeEmojiGroup, setActiveEmojiGroup] = useState(initActiveGroup)

    const [searchValue, setSearchValue] = useState("")

    const [lastUsedEmojis, setLastUsedEmojis] = useState(getLastUsagedEmojis())

    async function fetchLastUsedEmojis() {
        let lastUsedEmojis = await getLastUsagedEmojis();
        setLastUsedEmojis(lastUsedEmojis);

        return lastUsedEmojis;
    }

    async function clearState() {
        let lastUsedEmojis = await fetchLastUsedEmojis();
        if (lastUsedEmojis && lastUsedEmojis.emojis.length != 0) {
            setActiveEmojiGroup(lastUsedEmojis);
            setActiveEmojiGroupIndex(-1);
        } else {
            setActiveEmojiGroup(emojiGroups[0]);
            setActiveEmojiGroupIndex(0);
        }

        setSearchValue("");

        // console.log("State after clear:");
        // console.log(lastUsedEmojis);
    }

    async function onSearchInputChage(value) {
        setSearchValue(value);

        if (value === "") {
            clearState()
            return;
        }

        let emojis = [];
        for (let i = 0; i < emojiGroups.length; i++) {
            for (let j = 0; j < emojiGroups[i].emojis.length; j++) {
                if (emojiGroups[i].emojis[j].code.includes(value)) {
                    emojis.push(emojiGroups[i].emojis[j]);
                }
            }
        }
        let searchEmojiGroup = { title: "Search", emojis: emojis };

        setActiveEmojiGroup(searchEmojiGroup);
        setActiveEmojiGroupIndex(-2);
    }

    async function emojiButtonClick(emoji, code) {
        await pickEmoji(emoji, code, emojiDiv);
        await clearState();
    }

    return (
        <div className="dch-dropdown">
            <div className="dch-dropdown-inner">
                <div className="dch-search-box">
                    <svg className="dch-search-box-icon">
                        <use href='https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#search' fill='#737278' />
                    </svg>
                    <input
                        type="search"
                        placeholder="Search"
                        className="dch-search-box-input"
                        aria-label="Search for an emoji"
                        value={searchValue}
                        onChange={(e) => {
                            onSearchInputChage(e.target.value);
                        }}
                    />
                    {searchValue !== "" && <MyCrossButton clearState={clearState}/>}
                </div>
                <div className='dch-dropdown-emojis-block'>
                    <div className="dch-dropdown-contents">
                        <div className="dch-dropdown-contents-categories">
                            <button
                                type="button"
                                className={`dch-dropdown-contents-category dch-default-button dch-btn-default-tertiary ${activeEmojiGroupIndex === -1 ? 'dch-emoji-category-active' : ''}`}
                                onClick={() => {
                                    setActiveEmojiGroup(lastUsedEmojis);
                                    setActiveEmojiGroupIndex(-1);
                                }}
                            >
                                <svg className="gl-button-icon gl-icon dch16 gl-fill-current">
                                    <use href='https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#history' fill='#28272d' />
                                </svg>
                            </button>
                            <button
                                aria-label="Smileys &amp; Emotion"
                                type="button"
                                className={`dch-dropdown-contents-category dch-default-button dch-btn-default-tertiary ${activeEmojiGroupIndex === 0 ? 'dch-emoji-category-active' : ''}`}
                                onClick={() => {
                                    setActiveEmojiGroup(emojiGroups[0]);
                                    setActiveEmojiGroupIndex(0);
                                }}
                            >
                                <svg className="gl-button-icon gl-icon s16 gl-fill-current">
                                    <use href='https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#smiley' fill='#28272d' />
                                </svg>
                            </button>
                            <button
                                aria-label="People &amp; Body"
                                type="button"
                                className={`dch-dropdown-contents-category dch-default-button dch-btn-default-tertiary ${activeEmojiGroupIndex === 1 ? 'dch-emoji-category-active' : ''}`}
                                onClick={() => {
                                    setActiveEmojiGroup(emojiGroups[1]);
                                    setActiveEmojiGroupIndex(1);
                                }}
                            >
                                <svg className="gl-button-icon gl-icon s16 gl-fill-current">
                                    <use href='https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#users' fill='#28272d' />
                                </svg>
                            </button>
                            <button
                                aria-label="Animals &amp; Nature"
                                type="button"
                                className={`dch-dropdown-contents-category dch-default-button dch-btn-default-tertiary ${activeEmojiGroupIndex === 2 ? 'dch-emoji-category-active' : ''}`}
                                onClick={() => {
                                    setActiveEmojiGroup(emojiGroups[2]);
                                    setActiveEmojiGroupIndex(2);
                                }}
                            >
                                <svg className="gl-button-icon gl-icon s16 gl-fill-current">
                                    <use href='https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#nature' fill='#28272d' />
                                </svg>
                            </button>
                            <button
                                aria-label="Food &amp; Drink"
                                type="button"
                                className={`dch-dropdown-contents-category dch-default-button dch-btn-default-tertiary ${activeEmojiGroupIndex === 3 ? 'dch-emoji-category-active' : ''}`}
                                onClick={() => {
                                    setActiveEmojiGroup(emojiGroups[3]);
                                    setActiveEmojiGroupIndex(3);
                                }}
                            >
                                <svg className="gl-button-icon gl-icon s16 gl-fill-current">
                                    <use href='https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#food' fill='#28272d' />
                                </svg>
                            </button>
                            <button
                                aria-label="Travel &amp; Places"
                                type="button"
                                className={`dch-dropdown-contents-category dch-default-button dch-btn-default-tertiary ${activeEmojiGroupIndex === 4 ? 'dch-emoji-category-active' : ''}`}
                                onClick={() => {
                                    setActiveEmojiGroup(emojiGroups[4]);
                                    setActiveEmojiGroupIndex(4);
                                }}
                            >
                                <svg className="gl-button-icon gl-icon s16 gl-fill-current">
                                    <use href='https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#car' fill='#28272d' />
                                </svg>
                            </button>
                            <button
                                aria-label="Activities"
                                type="button"
                                className={`dch-dropdown-contents-category dch-default-button dch-btn-default-tertiary ${activeEmojiGroupIndex === 5 ? 'dch-emoji-category-active' : ''}`}
                                onClick={() => {
                                    setActiveEmojiGroup(emojiGroups[5]);
                                    setActiveEmojiGroupIndex(5);
                                }}
                            >
                                <svg className="gl-button-icon gl-icon s16 gl-fill-current">
                                    <use href='https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#dumbbell' fill='#28272d' />
                                </svg>
                            </button>
                            <button
                                aria-label="Objects"
                                type="button"
                                className={`dch-dropdown-contents-category dch-default-button dch-btn-default-tertiary ${activeEmojiGroupIndex === 6 ? 'dch-emoji-category-active' : ''}`}
                                onClick={() => {
                                    setActiveEmojiGroup(emojiGroups[6]);
                                    setActiveEmojiGroupIndex(6);
                                }}
                            >
                                <svg className="gl-button-icon gl-icon s16 gl-fill-current">
                                    <use href='https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#object' fill='#28272d' />
                                </svg>
                            </button>
                            <button
                                aria-label="Symbols"
                                type="button"
                                className={`dch-dropdown-contents-category dch-default-button dch-btn-default-tertiary ${activeEmojiGroupIndex === 7 ? 'dch-emoji-category-active' : ''}`}
                                onClick={() => {
                                    setActiveEmojiGroup(emojiGroups[7]);
                                    setActiveEmojiGroupIndex(7);
                                }}
                            >
                                <svg className="gl-button-icon gl-icon s16 gl-fill-current">
                                    <use href='https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#trigger-source' fill='#28272d' />
                                </svg>
                            </button>
                            <button
                                aria-label="Flags"
                                type="button"
                                className={`dch-dropdown-contents-category dch-default-button dch-btn-default-tertiary ${activeEmojiGroupIndex === 8 ? 'dch-emoji-category-active' : ''}`}
                                onClick={() => {
                                    setActiveEmojiGroup(emojiGroups[8]);
                                    setActiveEmojiGroupIndex(8);
                                }}
                            >
                                <svg className="gl-button-icon gl-icon s16 gl-fill-current">
                                    <use href='https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#flag' fill='#28272d' />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div>
                        <MyEmojiPage title={activeEmojiGroup.title} emojis={activeEmojiGroup.emojis} pickEmoji={emojiButtonClick} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyEmojiPicker
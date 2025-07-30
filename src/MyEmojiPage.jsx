import './MyEmojiPicker.css'

import MyEmojiPageRow from './MyEmojiPageRowTranspiled.js';

import React from "react";
import ReactDOM from "react-dom";

function MyEmojiPage({ title, emojis, pickEmoji, ...props }) {

    function splitByRows(emojis, rowSize) {
        let result = [];
        let currentRow = [];

        for (let i = 0; i < emojis.length; i++) {
            currentRow.push(emojis[i]);

            if (currentRow.length === rowSize || i === emojis.length - 1) {
                result.push(currentRow);
                currentRow = [];
            }
        }

        return result;
    }

    const emojiPages = splitByRows(emojis, 9)
        .map((emojiRow, index) =>
            <MyEmojiPageRow key={index} emojis={emojiRow} pickEmoji={pickEmoji} />
        );

    return (
        <div className="dch-dropdown-emojis">
            <div className="dch-px-4">
                <div className="dch-dropdown-emojis-title">
                    <b>{title}</b>
                </div>
                <div className="dch-dropdown-emojis-list">
                    {emojiPages}
                </div>
            </div>
        </div>
    )
}

export default MyEmojiPage
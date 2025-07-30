import './MyEmojiPicker.css'

import React from "react";
import ReactDOM from "react-dom";

function MyEmojiPageRow({ emojis, pickEmoji, ...props }) {

    const emojiItems = emojis.map((emoji) =>
        <button 
            type="button" 
            className="dch-dropdown-emojis-list-row-button dch-default-button dch-button dch-btn-default-tertiary" 
            key={emoji.emoji}
            onClick={() => { 
                pickEmoji(emoji.emoji, emoji.code);
            }}
        >
            <b className="dch-emoji-button" title={emoji.code}>{emoji.emoji}</b>
        </button>
    );

    return (
        <div className="dch-dropdown-emojis-list-row">
            {emojiItems}
        </div>
    )
}

export default MyEmojiPageRow
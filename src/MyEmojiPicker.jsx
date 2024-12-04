import React from 'react'
// import data from '@emoji-mart/data'
// import Picker from '@emoji-mart/react'
import EmojiPicker from 'emoji-picker-react';

function MyEmojiPicker() {
    return (
        <div>
            {/* <Picker onEmojiSelect={console.log} /> */}
            <EmojiPicker />
        </div>
    )
}

export default MyEmojiPicker
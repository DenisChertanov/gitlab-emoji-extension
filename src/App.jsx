import React from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

function App() {
    return (
        <div>
            <Picker data={data} onEmojiSelect={console.log} />
        </div>
    )
}

export default App;
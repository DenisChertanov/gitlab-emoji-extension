import './MyEmojiPicker.css'

import React from "react";
import ReactDOM from "react-dom";

function MyCrossButton({clearState, ...props}) {

    return (
        <div className="dch-cross-btn-div">
            <button 
                name="clear" 
                title="Clear" 
                aria-label="Clear" 
                type="button" 
                className="dch-cross-btn"
                onClick={() => clearState()}
            >
                <svg className="gl-button-icon gl-icon dch16 gl-fill-current">
                    <use href='https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#clear' fill='#28272d'/>
                </svg>
            </button>
        </div>
    )
}

export default MyCrossButton
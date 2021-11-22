import React, { useState } from 'react';

function Key(props) {
    const [hovered, setHovered] = useState(false);

    // Key is simple element displaying given data and triggering Keyboards handleKeyHover function
    return (
        <div 
            className={`keyboard__key key-${props.id} ${props.pressed ? "pressed" : hovered ? "hovered" : ""}`} 
            onMouseEnter={()=>{props.handleKeyHover(true); setHovered(true); }}
            onMouseLeave={()=>{props.handleKeyHover(false); setHovered(false); }}
        >
            {props.value}
        </div>
    )
}

export default Key;
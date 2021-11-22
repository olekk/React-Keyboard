import React, { useEffect, useRef, useState } from "react";

import Key from "./Key";

import Keys from "../Keys.json";

function Keyboard (props) {

    const [hoveredKeyId, setHoveredKeyId] = useState(null);
    const [mousedown, setMousedown] = useState(false);
    
    const capslock = useRef(false);
    // constant with Keys data without division into rows
    const KeysList = [].concat(...Keys);

    // logic handling mouse clicks and key hovers
    const handleKeyHover = (keyId, entered) => {
        if(entered)
            setHoveredKeyId(keyId);
        else
            setHoveredKeyId(null)
    }

    const handleMouseDownUp = (event) => {
        if(event.type === "mousedown") 
            setMousedown(true);
        else
            setMousedown(false)
    }

    // logic combining mouse and key events which results in Keyboard output to App or toggles capslock
    let timeoutId = useRef([0,0]);
    const handleKeyEvent = () => {
        // function to send repeating output until key is not released
        let loop = (fn) => {
            fn();
            if(mousedown && hoveredKeyId !== null) 
                timeoutId.current[1]=setTimeout(()=>loop(fn), 50);
        }
        
        clearTimeout(timeoutId.current[0]);
        
        if(mousedown && hoveredKeyId !== null) {
            let activeKey = KeysList.filter(x=>x.id === hoveredKeyId)[0];
            switch(activeKey.fn) {
                case 0: 
                    props.output(capslock.current ? activeKey.upper : activeKey.lower)
                    timeoutId.current[0] = setTimeout(()=>loop(()=>props.output(capslock.current ? activeKey.upper : activeKey.lower)), 500);
                break;
                case 'capslock':
                    capslock.current ^= true;
                break;
                default:
                    props.output(activeKey.fn);
                    timeoutId.current[0] = setTimeout(()=>loop(()=>props.output(activeKey.fn)), 500);
                break;
            }
        } else {
            clearTimeout(timeoutId.current[0]);
            clearTimeout(timeoutId.current[1]);
        }
    }

    useEffect(handleKeyEvent,[hoveredKeyId, mousedown, KeysList, props])

    // Keyboard element is listening to mouse clicks and each key listens to its hover
    return (
        <div 
            className="keyboard" 
            onMouseDown={handleMouseDownUp}
            onMouseUp={handleMouseDownUp}
        >
            {Keys.map((row, index) => 
                <div className="keyboard__row" key={index}>

                    {row.map(key => {
                        return (
                            <Key 
                                key={key.id}
                                id={key.id}
                                value={capslock.current ? key.upper : key.lower}
                                pressed={mousedown && hoveredKeyId === key.id}
                                handleKeyHover={(entered)=>handleKeyHover(key.id, entered)}
                            />
                        )
                    }
                        
                    )}

                </div>
            )}
        </div>
    )
}

export default Keyboard;
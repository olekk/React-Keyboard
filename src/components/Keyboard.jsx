import React, { useEffect, useRef, useState } from "react";

import Key from "./Key";

import Keys from "../Keys.json";

function Keyboard (props) {

    // state variables with info about key and mouse events
    const [hoveredKeyId, setHoveredKeyId] = useState(null);
    const [mousedown, setMousedown] = useState(false);
    
    // variable containing capslock boolean
    const capslock = useRef(false);

    // constant with Keys data without division into rows
    const KeysList = [].concat(...Keys);

    // logic combining mouse and key events which results in Keyboard output to App or toggling capslock
    let timeoutId = useRef([0,0]);
    useEffect(() => {

        clearTimeout(timeoutId.current[0]);

        // function to send repeating output until key is not released
        let loop = (fn) => {
            fn();
            if(mousedown && hoveredKeyId !== null) 
                timeoutId.current[1]=setTimeout(()=>loop(fn), 50);
        }
        
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
    },[hoveredKeyId, mousedown, KeysList, props]);

    // Keyboard element is listening to mouse clicks and each key listens to its hover
    return (
        <div 
            className="keyboard" 
            onMouseDown={()=>setMousedown(true)}
            onMouseUp={()=>setMousedown(false)}
        >
            {Keys.map((row, index) => 
                <div className="keyboard__row" key={index}>

                    {row.map(key => 
                        <Key 
                            key={key.id}
                            id={key.id}
                            value={capslock.current ? key.upper : key.lower}
                            pressed={mousedown && hoveredKeyId === key.id}
                            handleKeyHover={(entered)=>setHoveredKeyId(entered ? key.id : null )}
                        />
                    )}

                </div>
            )}
        </div>
    )
}

export default Keyboard;
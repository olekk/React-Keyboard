import React, { useEffect, useState } from "react";

function InputField(props) {

    const [content, setContent] = useState("");
    // on every props change this function interprets incoming data and updates state
    useEffect(()=>{
        if(props.isActive)
            switch(props.data) {
                case 'backspace':
                    setContent(content.slice(0, -1));
                break;
                case 'cls':
                    setContent("");
                break;
                case null: break;
                default:
                    setContent(content + props.data);
            }
    }, [props, content]);


    return (
        <div className={`inputField ${props.isActive ? 'active' : ''}`} onClick={props.setActive}>
            {content}{!props.isActive || <b>|</b>}
        </div>
    )
}

export default InputField;
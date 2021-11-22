import React, {useEffect, useState} from "react";

import Keyboard from "./components/Keyboard";
import InputField from "./components/InputField";

function App() {

    // state variable ram recieves a data from keyboard, then is sent to InputFields and immediately deleted 
    const [ram, setRam] = useState(null);
    const [activeInput, setActiveInput] = useState(0)

    useEffect(()=>{ setRam(null); },[ram])

    return (
        <>
            <InputField
                key={0}
                data={ram}
                isActive={activeInput === 0}
                setActive={()=>setActiveInput(0)}
            />

            <InputField
                key={1}
                data={ram}
                isActive={activeInput === 1}
                setActive={()=>setActiveInput(1)}
            />

            <Keyboard
                output={setRam}
            />
        </>
    )
}

export default App;
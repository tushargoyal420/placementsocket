import { Button } from "bootstrap";
import React, { useState } from "react";

function PopUp() {
    // const [pop, setPop] = useState(false);

    const close = (()=>{
        // setPop(false);
    })
    return (
        <div className="forPopUp">
            <div className="popUp">
                Hlo this is pop Up
            </div>
            {/* <Button onClick={close}> Click</Button> */}
        </div>
    )
}

export default PopUp

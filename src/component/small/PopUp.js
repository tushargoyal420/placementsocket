import React from 'react'

function PopUp() {

    const popUp = (() => {
        // setPop(true)
    })
    const close = (() => {
        // setPop(false)
    })

    return (
        <div className="forPopUp">
            <div className="popUp">
                <div className="closeButtonBox">
                    Close
                    {/* <Button className="closeButton" variant="contained" onClick={close}> X </Button> */}
                </div>
                <div className="submitButtonBox">
                    Button
                </div>
            </div>
        </div>)
}

export default PopUp

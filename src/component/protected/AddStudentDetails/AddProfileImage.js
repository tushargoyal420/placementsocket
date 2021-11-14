import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { Input, TextField } from '@mui/material'


function AddProfileImage() {
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [pop, setPop] = useState(false);

    const handleChange = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };

    const handleUpload = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image.raw);

        await fetch("YOUR_URL", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: formData
        });
    };

    const popUp = (() => {
        setPop(true)
    })
    const close = (() => {
        setPop(false)
    })

    return (
        <div className="d">
            {image.preview ? (
                <img src={image.preview} alt="dummy" width="300" />
            ) : (
                <>
                </>
            )}
            {/* <br /> */}
            {/* <Input onChange={handleChange} type="file" />
            <button onClick={handleUpload}>Upload</button> */}


            <Button onClick={popUp}>  Popup </Button>
            <div className="forPopUp">
                <p>dsc</p>
                </div>
                {(pop) ? (
                    <div className="popUp">
                        <p > This is Pop up</p>
                        <Button onClick={close}>  Close</Button>
                    </div>
                ) : (
                    <p></p>
                )}

        </div>
    )
}

export default AddProfileImage

import React, { useState } from "react";
import firebase from "firebase";
import addImageIcon from '../../img/addImageIcon.png'
import Button from '@mui/material/Button';


const UploadImage = ({ toClose, onClosePopup }) => {
    const [image, setImage] = useState({ preview: "", raw: "" });
    const timeStamp = Date();

    const clearImage = (() => {
        setImage('')
    })
    const selectImage = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };
    const uploadImage = (() => {
        if (image.preview) {

            try {
                const userId = firebase.auth().currentUser.uid;
                firebase.storage().ref('images').child('company/' + userId + "/companyImage").put(image.raw).then(
                    () => {
                        firebase.database().ref("data").child('company/' + userId + '/companyImage').set({
                            'companyImage': 'Uploaded',
                            "timeStamp": timeStamp
                        }).catch((err) => (alert(err)))
                        setImage('')
                        // eslint-disable-next-line
                        { onClosePopup() }
                        // setPop(false)

                    }).catch((err) => (alert(err)))
            } catch (err) {
                alert(err)
            }
        }
        else {
            alert(
                'Select an image'
            )
        }

    })
    return (
        <div>
            <div className="imageBox">
                <label htmlFor="upload-button">
                    {image.preview ?
                        <img src={image.preview} alt="imagePreview" style={{ height: '100%' }} />
                        : (
                            <img style={{ height: '100%' }} src={addImageIcon} alt="profile" />
                        )}
                </label>
                <input type="file" id="upload-button" style={{ display: 'none' }} onChange={selectImage} />
            </div>
            <div className="submitButtonBox">
                <Button variant="contained" onClick={clearImage}> Clear Image</Button>
                <Button variant="contained" onClick={uploadImage}> Submit Image</Button>
            </div>
        </div>
    )
}

export default UploadImage

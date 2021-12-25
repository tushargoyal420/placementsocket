import React, { useState } from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import "../../../../css/Company.css"
import firebase from '../../../../firebase/firebase.js'
import { TextField } from '@mui/material';

function AddAboutCompany({ closePopup }) {
    const [about, setAbout] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [location, setLocation] = useState("");
    const timeStamp = Date();
    const uploadAbout = ((e) => {
        e.preventDefault();
        try {
            const userId = firebase.auth().currentUser.uid;
            firebase.database().ref('data').child('/company/' + userId+ '/about').set({
                    'name': companyName,
                    'location': location,
                    'about': about,
                    'TimeStamp': timeStamp
                })
                .then((e) => {
                    // eslint-disable-next-line
                    { closePopup() }

                }).catch((err) => {
                    alert(err.message)
                });
        } catch (err) {
            alert(err.message);
        }
    })
    const clearAbout = (() => {
        setAbout('')

    })
    return (
        <div >
            <form className="AboutCompany" onSubmit={uploadAbout}>
                <TextField
                    className="textField"
                    onChange={(e) => setCompanyName(e.target.value)}
                    value={companyName}
                    variant="standard"
                    required={true}
                    placeholder='Enter your Company name'
                />
                <TextField
                    className="textField"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                    variant="standard"
                    required={true}
                    placeholder='Enter your Company Location'
                />
                <TextareaAutosize
                    value={about}
                    className="textArea"
                    required={true}
                    onChange={(e) => setAbout(e.target.value)}
                    aria-label="empty textarea" placeholder="Tell us about your company"
                    style={{ minWidth: '100%', minHeight: 'calc(100vh - 600px)', border: '2px dashed rgb(211, 210, 210)' }}
                />
                <div className="ButtonDiv">
                    <Button className="AboutComapnyButton" variant="contained" onClick={clearAbout} >Clear</Button>
                    <Button className="AboutComapnyButton" type="submit" variant="contained"  >Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default AddAboutCompany

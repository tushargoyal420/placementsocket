import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { MenuItem, TextField } from '@mui/material'
import firebase from '../../../../firebase/firebase'

function CompanySocialMedia() {
    const [handle, setHandle] = useState('')
    const [link, setLink] = useState('')
    const timeStamp = Date();
    const [data, setData] = useState([])

    const userId = firebase.auth().currentUser.uid;

    const socialMediaArray = [
        {
            label: 'LinkedIn',
            value: 'LinkedIn'
        },
        {
            label: 'Facebook',
            value: 'Facebook'
        },

        {
            label: 'Instagram',
            value: 'Instagram'
        },
        {
            label: 'Website',
            value: 'Website'
        },
        {
            label: 'Email',
            value: 'Email'
        },
        {
            label: 'Phone Number',
            value: 'Phone Number'
        },

    ]
    const submitDataa = ((e) => {
        e.preventDefault();

        try {
            firebase.database().ref('data/company/' + userId + '/socialAndContact')
                .child(handle).set({
                    'handle': handle,
                    'link': link,
                    'timeStamp': timeStamp
                }).then(() => {
                    setHandle('')
                    setLink('')
                }).catch((err) => {
                    alert(err.message)
                });
        } catch (err) {
            alert(err.message);
        }
    })
    useEffect(() => {
        firebase.database().ref('data/company/' + userId + '/socialAndContact')
            .once('value').then((snapshot) => {
                const dataList = []
                snapshot.forEach((childSnapshot) => {
                    dataList.push(childSnapshot.val())
                })
                setData(dataList);
            }).catch((err) => {
                alert(err)
            })
    })
    return (
        <div>
            <form className="toSingleLineForm"  onSubmit={submitDataa}>
                <TextField onChange={(e) => setHandle(e.target.value)} className="textField" select required value={handle} style={{ minWidth: '80%' }} variant="standard" label="Handle" size="normal" >{socialMediaArray.map((option) => (<MenuItem key={option.value} size="normal" value={option.value}> {option.label}</MenuItem>))}</TextField>
                <TextField onChange={(e) => setLink(e.target.value)}   className="textField" required style={{ minWidth: '80%' }} variant="standard" label="Link"  value={link} size="normal" />
                <Button className='submitButton' type="submit" variant="contained" >Add</Button>
            </form>

            <div className='showSkill'>
                {data.map((single, index) => (
                    <div className="dataBox secondDataBox">
                        <div> <b> {single.handle} </b>- ({single.link})</div>
                        <Button variant="outlined" onClick={(() => {
                            firebase.database().ref('data/company/' + userId + '/socialAndContact/' + single.handle).remove()
                        })} > Delete </Button>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default CompanySocialMedia

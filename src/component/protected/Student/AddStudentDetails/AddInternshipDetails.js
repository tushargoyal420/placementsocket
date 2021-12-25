import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { MenuItem, TextField } from '@mui/material'
import firebase from '../../../../firebase/firebase'


function AddInternshipDetails() {
    const monthArray = [
        {
            label: "January",
            value: "January"
        },
        {
            label: "February",
            value: "February"
        },
        {
            label: "March",
            value: "March"
        },
        {
            label: "April",
            value: "April"
        },
        {
            label: "May ",
            value: "May"
        },
        {
            label: "June",
            value: "June"
        },
        {
            label: "July",
            value: "July"
        },
        {
            label: "August",
            value: "August"
        },
        {
            label: "September",
            value: "September"
        },
        {
            label: "October",
            value: "October"
        },

        {
            label: "Novemeber",
            value: "Novemeber"
        },

        {
            label: "December",
            value: "December"
        }
    ]

    const [organizationName, setOrganizationName] = useState("");
    const [location, setLocation] = useState("");
    const [duration, setDuration] = useState("");
    const [startingMonth, setStartingMonth] = useState("");
    const [endingMonth, setEndingMonth] = useState("");
    const timeStamp = Date();

    const submitDataa = ((e) => {
        e.preventDefault();

        const userId = firebase.auth().currentUser.uid;

        try {
            firebase.database().ref('data/student/' + userId + '/internshipORworK')
                .push().set({
                    'Organization_Name': organizationName,
                    'Location': location,
                    'Duration': duration,
                    'Starting_Month': startingMonth,
                    'Ending_Month': endingMonth,
                    'TimeStamp': timeStamp
                }).catch((err) => {
                    alert(err.message)
                });
        } catch (err) {
            alert(err.message);
        }
    })
    return (
        <div className="backgroundPage">
            <div className="centerWholePage">
                <div className="centerPageHeading">Add Secondary (X) <span className="colorChange"> Details </span> </div>
                <ul className="headingul">
                    <div className="centerPageContent">
                        <section className="rowSection">
                            <form className="detailsForm" onSubmit={submitDataa}>
                                <div className="detailsSection">

                                    <TextField onChange={(e) => setOrganizationName(e.target.value)} className="textField" id="standard-basic" label="Organization Name" variant="standard" />
                                    <TextField onChange={(e) => setLocation(e.target.value)} className="textField" id="standard-basic" label="Location" variant="standard" />
                                    <TextField onChange={(e) => setDuration(e.target.value)} className="textField" id="standard-number" label="Duration(no. of Months)" variant="standard" />
                                    <TextField onChange={(e) => setStartingMonth(e.target.value)} value={startingMonth} className="textField" select required style={{ minWidth: '200px' }} variant="standard" label="Starting Month" size="normal"> {monthArray.map((option) => (<MenuItem key={option.value} size="normal" value={option.value}> {option.label}</MenuItem>))}</TextField>
                                    <TextField onChange={(e) => setEndingMonth(e.target.value)} className="textField" value={endingMonth} select required style={{ minWidth: '200px' }} variant="standard" label="Ending Month" size="normal">{monthArray.map((option) => (<MenuItem key={option.value} size="normal" value={option.value}> {option.label}</MenuItem>))}</TextField>

                                </div>
                                <Button className='submitButton' type="submit" variant="contained" >Submit Details</Button>
                            </form>
                        </section>
                    </div>
                </ul>
            </div>
        </div>
    )

}

export default AddInternshipDetails

import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { MenuItem, TextField } from '@mui/material'
import firebase from '../../../../firebase/firebase'


function AddSecondaryDetails() {
    const boardArray = [
        {
            label: "CBSE",
            value: "CBSE"
        },
        {
            label: "ICSE",
            value: "ICSE"
        },
        {
            label: "State Board",
            value: "State board"
        }]
    const typeArray = [
        {
            label: "Full time",
            value: "Full time"
        },
        {
            label: "Open Board",
            value: "Open Board"
        },
        {
            label: "Not in this list?",
            value: "not in the List"
        }]


    const yearArray = [
        {
            label: "2010",
            value: "2010"
        },
        {
            label: "2011",
            value: "2011"
        },
        {
            label: "2012",
            value: "2012"
        },
        {
            label: "2013",
            value: "2013"
        },
        {
            label: "2014",
            value: "2014"
        },
        {
            label: "2015",
            value: "2015"
        },
        {
            label: "2016",
            value: "2016"
        },
        {
            label: "2017",
            value: "2017"
        },
        {
            label: "2018",
            value: "2018"
        },
        {
            label: "2019",
            value: "2019"
        },

        {
            label: "2020",
            value: "2021"
        },

        {
            label: "2022",
            value: "2022"
        }
    ]

    const [schoolName, setSchoolname] = useState("");
    const [board, setBoard] = useState("");
    const [percentage, setPercentage] = useState("");
    const [startingYear, setStartingYear] = useState("");
    const [endingYear, setEndingYear] = useState("");
    const [type, setType] = useState("");
    const timeStamp = Date();

    const submitDataa = ((e) => {
        e.preventDefault();

        const userId = firebase.auth().currentUser.uid;

        try {
            firebase.database().ref("data").child('student').child(userId).child('educationDetails/secondary').set({
                'School_Name': schoolName,
                'Board': board,
                'Percentage': percentage,
                'Starting_Year': startingYear,
                'Ending_Year': endingYear,
                'Type': type,
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

                                    <TextField onChange={(e) => setSchoolname(e.target.value)} className="textField" id="standard-basic" label="School Name" variant="standard" />


                                    <TextField onChange={(e) => setBoard(e.target.value)} value={board} className="textField" select required="true"
                                        style={{ minWidth: '200px' }} variant="standard" label="Board" size="normal">{boardArray.map((option) => (<MenuItem key={option.value} size="normal" value={option.value}> {option.label}</MenuItem>))}</TextField>
                                    <TextField onChange={(e) => setPercentage(e.target.value)} className="textField" id="standard-basic" label="Percentage" variant="standard" />
                                    <TextField onChange={(e) => setStartingYear(e.target.value)} className="textField" select required="true"
                                        style={{ minWidth: '200px' }} variant="standard"  value={startingYear} label="Starting Year" size="normal">{yearArray.map((option) => (<MenuItem key={option.value} size="normal" value={option.value}> {option.label}</MenuItem>))}</TextField>

                                    <TextField onChange={(e) => setEndingYear(e.target.value)} className="textField" select required="true"
                                        style={{ minWidth: '200px' }} variant="standard" value={endingYear}  label="Ending year" size="normal">{yearArray.map((option) => (<MenuItem key={option.value} size="normal" value={option.value}> {option.label}</MenuItem>))}</TextField>
                                    <TextField onChange={(e) => setType(e.target.value)} className="textField" select required="true"
                                        style={{ minWidth: '200px' }} variant="standard"  value={type} label="Type" size="normal">{typeArray.map((option) => (<MenuItem key={option.value} size="normal" value={option.value}> {option.label}</MenuItem>))}</TextField>
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


export default AddSecondaryDetails

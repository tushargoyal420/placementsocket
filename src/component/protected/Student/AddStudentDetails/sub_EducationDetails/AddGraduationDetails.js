import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { MenuItem, TextField } from '@mui/material'
import firebase from '../../../../../firebase/firebase'

function AddGraduationDetails() {
    const degreeArray = [
        {
            label: "Post Graduate",
            value: "Post Graduate"
        },
        {
            label: "Under Graduate",
            value: "Under Graduate"
        },
        {
            label: "Diploma",
            value: "Diploma"
        }]
    const courseArray = [
        {
            label: "Bachelor of Arts",
            value: "Bachelor of Arts"
        },
        {
            label: "Bachelor of Science",
            value: "Bachelor of Science"
        },
        {
            label: "Bachelor of Technology",
            value: "Bachelor of Technology"
        },
        {
            label: "Bachelor of Law",
            value: "Bachelor of Law"
        },
        {
            label: "Bachelor of Medicine ",
            value: "Bachelor of Medicine"
        },
        {
            label: "Bachelor of Computer Application",
            value: "Bachelor of Computer Application"
        },
        {
            label: "Not in this list?",
            value: "not in the List"
        }]

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

    const [degree, setDegree] = useState("");
    const [college, setCollege] = useState("");
    const [course, setCourse] = useState("");
    const [stream, setStream] = useState("");
    const [percentage, setPercentage] = useState("");
    const [backlogs, setActiveBacklogs] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [rollNo, setRollNo] = useState("");
    const [startingMonth, setStartingMonth] = useState("");
    const [startingYear, setStartingYear] = useState("");
    const [endingMonth, setEndingMonth] = useState("");
    const [endingYear, setEndingYear] = useState("");
    const timeStamp = Date();

    const submitDataa = ((e) => {
        e.preventDefault();
        const userId = firebase.auth().currentUser.uid;

        try {
            firebase.database().ref("data").child('student').child(userId).child('educationDetails/graduation').set({
                'Degree': degree,
                'College': college,
                'Course': course,
                'Stream': stream,
                'Percentage': percentage,
                'Backlogs': backlogs,
                'Specialization': specialization,
                'RollNo': rollNo,
                'Starting_Month': startingMonth,
                'Starting_Year': startingYear,
                'Ending_Month': endingMonth,
                'Ending_Year': endingYear,
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
                <div className="centerPageHeading">Add Graduation <span className="colorChange"> Details </span> </div>
                <ul className="headingul">
                    <div className="centerPageContent">
                        <section className="rowSection">
                            <form className="detailsForm" onSubmit={submitDataa}>
                                <div className="detailsSection">
                                    <TextField onChange={(e) => setDegree(e.target.value)} className="textField" select required="true"
                                        style={{ minWidth: '200px' }} variant="standard" value={degree} label="Degree" size="normal">{degreeArray.map((option) => (<MenuItem key={option.value} size="normal" value={option.value}> {option.label}</MenuItem>))}</TextField>

                                    <TextField onChange={(e) => setCollege(e.target.value)}  required="true" className="textField" id="standard-basic" label="College" variant="standard" />
                                    <TextField onChange={(e) => setCourse(e.target.value)} className="textField" select required="true"
                                        style={{ minWidth: '200px' }} variant="standard" label="Course" value={course} size="normal">{courseArray.map((option) => (<MenuItem key={option.value} size="normal" value={option.value}> {option.label}</MenuItem>))}</TextField>

                                    <TextField onChange={(e) => setStream(e.target.value)} className="textField" id="standard-basic" label="Stream" variant="standard" />

                                    <TextField onChange={(e) => setSpecialization(e.target.value)} className="textField" id="standard-basic" label="Specialization" variant="standard" />
                                    <TextField onChange={(e) => setPercentage(e.target.value)} className="textField" id="standard-number" label="Percentage" variant="standard" />
                                    <TextField onChange={(e) => setActiveBacklogs(e.target.value)} className="textField" id="standard-number" label="Active Backlogs" variant="standard" />
                                    <TextField onChange={(e) => setRollNo(e.target.value)} className="textField" id="standard-basic" label="Roll no" variant="standard" />
                                    <TextField onChange={(e) => setStartingMonth(e.target.value)} className="textField" select required="true"
                                        style={{ minWidth: '200px' }} variant="standard" label="Starting month" value={startingMonth} size="normal">{monthArray.map((option) => (<MenuItem key={option.value} size="normal" value={option.value}> {option.label}</MenuItem>))}</TextField>

                                    <TextField onChange={(e) => setStartingYear(e.target.value)} className="textField" select required="true"
                                        style={{ minWidth: '200px' }} variant="standard" label="Starting Year" value={startingYear} size="normal">{yearArray.map((option) => (<MenuItem key={option.value} size="normal" value={option.value}> {option.label}</MenuItem>))}</TextField>

                                    <TextField onChange={(e) => setEndingMonth(e.target.value)} className="textField" select required="true"
                                        style={{ minWidth: '200px' }} variant="standard" label="Ending month" value={endingMonth} size="normal">{monthArray.map((option) => (<MenuItem key={option.value} size="normal" value={option.value}> {option.label}</MenuItem>))}</TextField>

                                    <TextField onChange={(e) => setEndingYear(e.target.value)} className="textField" select required="true"
                                        style={{ minWidth: '200px' }} variant="standard" label="Ending year" value={endingYear} size="normal">{yearArray.map((option) => (<MenuItem key={option.value} size="normal" value={option.value}> {option.label}</MenuItem>))}</TextField>
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

export default AddGraduationDetails

import React, { useState } from 'react'
import { MenuItem, TextField } from '@mui/material'
import Button from '@mui/material/Button';
import firebase from '../../../../firebase/firebase.js'

function AddJobProfiles({closePopup}) {
    const [comapnyName,setComapnyName] = useState("")
    const [jobName, setJobName] = useState("")
    const [aboutrole, setAboutrole] = useState("")
    const [techStack, setTechStack] = useState("")
    const [responsibilities, setResponsibilities] = useState("")
    const [location, setLocation] = useState("")
    const [cTC, setCTC] = useState("")
    const [sPercentage, setSPercentage] = useState("")
    const [sSPercentage, setSSPercentage] = useState("")
    const [uGPercentage, setUGPercentage] = useState("")
    const [passingYear, setPassingYear] = useState("")
    const [backlogs, setBacklogs] = useState("")
    const [bond, setBond] = useState("")
    const [additional, setAdditional] = useState("")
    const [jobType, setJobType] = useState("")
    const timeStamp = Date();


    const submitJob = ((e) => {
        e.preventDefault();
        try {
            const userId = firebase.auth().currentUser.uid;
            const newPostRef =  firebase.database().ref('data/company/' + userId + '/jobProfiles').push()
            const postId = newPostRef.key;

            newPostRef.child("Details").set({
                    'company_name': comapnyName ,
                    'key': postId ,
                    'job_name': jobName,
                    'about_role': aboutrole,
                    'technology_stack': techStack,
                    'responsibilities': responsibilities,
                    'job_locations': location,
                    'ctc': cTC,
                    's_percentage': sPercentage,
                    'ss_percentage': sSPercentage,
                    'ugPerc': uGPercentage,
                    'passingOut': passingYear,
                    'active_backlogs': backlogs,
                    'bond': bond,
                    'additional_details': additional,
                    'job_type': jobType,
                    'TimeStamp': timeStamp
                }).then((e) => {
                    // eslint-disable-next-line
                    {closePopup()} 


                }).catch((err) => {
                    alert(err.message)
                });

        } catch (err) {
            alert(err)
        }

    })
    const jobTypeArray = [{ label: 'Full Time', value: 'Full Time' }, { label: 'Only Internship', value: 'Only Internship' }, { label: 'Part Time', value: 'Part Time', }]
    return (
        <div>
            <form className='toSingleLineForm' onSubmit={submitJob}>
                <TextField onChange={(e) => setComapnyName(e.target.value)}  required={true} value={comapnyName} className="textField" id="standard-basic" label="Company name" variant="standard" />
                <TextField onChange={(e) => setJobName(e.target.value)}  required={true} value={jobName} className="textField" id="standard-basic" label="Job Name" variant="standard" />
                <TextField onChange={(e) => setAboutrole(e.target.value)} required={true} value={aboutrole} className="textField" id="standard-basic" label="About role" variant="standard" />
                <TextField onChange={(e) => setTechStack(e.target.value)} required={true} value={techStack} className="textField" id="standard-basic" label="Technology Stack" variant="standard" />
                <TextField onChange={(e) => setResponsibilities(e.target.value)} required={true} value={responsibilities} className="textField" id="standard-basic" label="Responsibilities" variant="standard" />
                <TextField onChange={(e) => setLocation(e.target.value)} required={true} value={location} className="textField" id="standard-basic" label="Job Locations" variant="standard" />
                <TextField onChange={(e) => setSPercentage(e.target.value)} required={true} value={sPercentage} className="textField" id="standard-basic" label="10th Percentage" variant="standard" />
                <TextField onChange={(e) => setSSPercentage(e.target.value)} required={true} value={sSPercentage} className="textField" id="standard-basic" label="12th Percentage" variant="standard" />
                <TextField onChange={(e) => setUGPercentage(e.target.value)} required={true} value={uGPercentage} className="textField" id="standard-basic" label="Under Graduation Percentage" variant="standard" />
                <TextField onChange={(e) => setPassingYear(e.target.value)} value={passingYear} className="textField" id="standard-basic" label="Graduation Passing year" variant="standard" />
                <TextField onChange={(e) => setBacklogs(e.target.value)} value={backlogs} className="textField" id="standard-basic" label="Active Backlogs" variant="standard" />
                <TextField onChange={(e) => setCTC(e.target.value)} required={true} value={cTC} className="textField" id="standard-basic" label="CTC" variant="standard" />
                <TextField onChange={(e) => setBond(e.target.value)} required={true} value={bond} className="textField" id="standard-basic" label="Bond/Service Agreement" variant="standard" />
                <TextField onChange={(e) => setJobType(e.target.value)} value={jobType} className="textField" id="standard-basic" label="Job type" variant="standard" size="normal" select required style={{ minWidth: '80%' }}> {jobTypeArray.map((option) => (<MenuItem key={option.value} size="normal" value={option.value}> {option.label}</MenuItem>))}</TextField>
                <TextField onChange={(e) => setAdditional(e.target.value)} value={additional} className="textField" id="standard-basic" label="Additional Details" variant="standard" />

                <Button className='submitButton' type="submit" variant="contained" >Submit Details</Button>

            </form>
        </div>
    )
}

export default AddJobProfiles

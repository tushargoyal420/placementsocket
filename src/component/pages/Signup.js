import React, { useState } from 'react'
import { FormControl, Input, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import { Redirect } from 'react-router';
import "../../css/Signup.css"
import firebase from '../../firebase/firebase';
import { Link } from 'react-router-dom';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


function toHide(setShowError) {
    setTimeout(() => setShowError(''), 4000);
}
function Signup() {
    const butStyle = {
        fontSize: "2.0vh",
        width: '120px',
        padding: '8px 10px',
        marginTop: '10px'
    }
    const timeStamp = Date();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [personType, setPersonType] = useState("");

    const submitData = (event) => {
        setShowError('')
        event.preventDefault();
        try {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    userCredential.user.sendEmailVerification();
                    const userId = firebase.auth().currentUser.uid;
                    // eslint-disable-next-line
                    {
                        personType === "student" ?
                            (
                                firebase.database().ref("user").child("student").child(userId).set({
                                    'id': userId,
                                    'email': email,
                                    'time': timeStamp
                                }).then(() => {
                                    firebase.database().ref("data").child('student/' + userId + '/profileImage').set({
                                        'companyImage': 'NotUploaded',
                                        "timeStamp": timeStamp
                                    }).catch((err) => (alert(err)))
                                })
                                    .catch((err) => (alert(err)))
                            ) :
                            personType === 'company' ?
                                (
                                    firebase.database().ref("user").child("company").child(userId).set({
                                        'Id': userId,
                                        'email': email,
                                        'time': timeStamp
                                    }).then(() => {
                                        firebase.database().ref("data").child('company/' + userId + '/companyImage').set({
                                            'companyImage': 'NotUploaded',
                                            "timeStamp": timeStamp
                                        }).catch((err) => (alert(err)))
                                    })
                                ) :
                                personType === 'college' ?
                                    (
                                        firebase.database().ref("user").child("college").child(userId).set({
                                            'Id': userId,
                                            'email': email,
                                            'time': timeStamp
                                        }).then(() => {
                                            firebase.database().ref("data").child('college/' + userId + '/CollegeImage').set({
                                                'companyImage': 'NotUploaded',
                                                "timeStamp": timeStamp
                                            }).catch((err) => (alert(err)))
                                        }).catch((err) => (alert(err)))
                                    ) :
                                    (
                                        setShowError("Please select user type")
                                    )

                        firebase.database().ref("typeList").child(userId).set({
                            'type': personType,
                        })
                        setCurrentUser(true)
                    }

                }).catch((err) => {
                    // alert(err);
                    setShowError(err.message);
                    toHide(setShowError);
                })

        } catch (err) {
            setShowError(err.message);
            toHide(setShowError);
            // alert(err);
        }
    };
    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <div className="sigiInUpform">
            <form className="form signin" onSubmit={submitData}>
                <div className="formHeading"> Sign <span className="colorChange"> Up </span> </div>
                <FormControl className="formcontrol" required>
                    <InputLabel className="inputlabel"> Enter Email </InputLabel>
                    <Input className="input" type="email" required onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl className="formcontrol" required>
                    <InputLabel className="inputlabel"> Enter Password </InputLabel>
                    <Input className="input" type="password" required onChange={event => setPassword(event.target.value)} />
                </FormControl>
                <FormControl component="fieldset" >
                    {/* <FormLabel component="legend">Gender</FormLabel> */}
                    <RadioGroup onChange={event => setPersonType(event.target.value)} required="true" row aria-label="gender" name="row-radio-buttons-group">
                        <FormControlLabel value="student" control={<Radio required={true} />} label="Student" />
                        <FormControlLabel value="company" control={<Radio required={true} />} label="Company" />
                        <FormControlLabel value="college" control={<Radio required={true} />} label="College" />
                    </RadioGroup>
                </FormControl>
                <Button style={butStyle} className='submitButton' type="submit" variant="contained">Submit</Button>
                <div className="formNavigation">
                    <span className="comentLine">Already have an account? </span>
                    <span className="navigationLinkOuter">
                        <Link className="navigationLink" to="/signin"> Sign in</Link>
                    </span>
                </div>
                {showError ? (
                    <div className="errorMessageBox" >
                        <div className="errorMessage" >
                            {showError}
                        </div>
                    </div>
                ) : (
                    <div className="errorMessageBoxNo" >
                        <div className="errorMessageNo" >
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}

export default Signup

import React, { useState } from 'react'
import firebase from '../firebase/firebase';
import { FormControl, Input, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import { Redirect } from 'react-router';
import "../css/Signup.css"
import { Link } from 'react-router-dom';

function Signup() {
    const butStyle = {
        fontSize: "2.0vh",
        width: '120px',
        padding: '8px 10px',
        marginTop: '10px'
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [currentUser, setCurrentUser] = useState(null);
    const submitData = (event) => {
        event.preventDefault();
        try {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    userCredential.user.sendEmailVerification();
                    setCurrentUser(true)
                }).catch((err) => {
                    alert(err);
                })

        } catch (err) {
            alert(err);
        }
    };
    if (currentUser) {
        return <Redirect to="/Profile" />;
    }

    return (
        <div className="sigiInUpform">
            <form className="form signin">
                <div className="formHeading"> Sign <span className="colorChange"> Up </span> </div>
                <FormControl className="formcontrol">
                    <InputLabel className="inputlabel"> Enter Email </InputLabel>
                    <Input className="input" type="email" required onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl className="formcontrol">
                    <InputLabel className="inputlabel"> Enter Password </InputLabel>
                    <Input className="input" type="password" required onChange={event => setPassword(event.target.value)} />
                </FormControl>
                <Button style={butStyle} className='submitButton' variant="contained" onClick={submitData}>Submit</Button>
                <div className="formNavigation">
                    <span className="comentLine">Already have an account? </span>
                    <span className="navigationLinkOuter">
                        <Link className="navigationLink" to="/signin"> Sign in</Link>
                    </span>
                </div>

            </form>

        </div>
    )
}

export default Signup

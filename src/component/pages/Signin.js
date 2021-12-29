import React, {useState} from 'react'
import { FormControl, Input, InputLabel, } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
// import { AuthContext } from '../../firebase/auth';
import firebase from '../../firebase/firebase';
import "../../css/Signup.css"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function toHide(setShowError) {
    setTimeout(() => setShowError(''), 4000);
}

function Signin() {
    const butStyle = {
        fontSize: "2.0vh",
        width: '120px',
        padding: '8px 10px',
        marginTop: '10px'
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState("");
    // const { currentUser } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState(null);

    const submitData = (e) => {
        e.preventDefault();
        try {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    setCurrentUser(true)
                })
                .catch((err) => {
                    // alert(err);
                    setShowError(err.message);
                    toHide(setShowError);
                })
        } catch (err) {
            setShowError(err.message);
            toHide(setShowError);
            // alert(error);
        }
    }
    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <div className="sigiInUpform">
            <form className="form" onSubmit={submitData}>
                <div className="formHeading"> Sign <span className="colorChange"> In </span> </div>

                <FormControl className="formcontrol" required="true">
                    <InputLabel className="inputlabel"  > Enter Email </InputLabel>
                    <Input className="input" required onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl className="formcontrol" required="true">
                    <InputLabel className="inputlabel"> Enter Password </InputLabel>
                    <Input className="input" type="password" required onChange={event => setPassword(event.target.value)} />
                </FormControl>
                <FormControl component="fieldset" >
                    <RadioGroup row aria-label="gender" defaultValue="Student" name="row-radio-buttons-group" >
                        <div className="radioButtons">
                            <FormControlLabel value="student" control={<Radio required={true} />} label="Student" />
                            <FormControlLabel value="company" control={<Radio required={true} />} label="Company" />
                            <FormControlLabel value="college" control={<Radio required={true} />} label="College" />
                        </div>
                    </RadioGroup>
                </FormControl>
                <Button style={butStyle} type="submit" className='submitButton' variant="contained" >Submit</Button>

                <div className="formNavigation">
                    <span className="comentLine">Didn't have any account? </span>
                    <span className="navigationLinkOuter">
                        <Link className="navigationLink" to="/signup"> Sign up</Link>
                    </span>
                </div>
                {showError ? (
                    <div id="errorMessageBox" className="errorMessageBox" >
                        <div id="errorMessage" className="errorMessage" >
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

export default Signin

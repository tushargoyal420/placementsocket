import React, { useState } from 'react'
import { FormControl, Input, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import '../../css/Contact.css'
import firebase from '../../firebase/firebase'


function toHide(setShowError) {
    setTimeout(() => setShowError(''), 4000);
}

function Contact() {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [subject, setSubject] = useState("");
    const [question, setQuestion] = useState("");
    const [showError, setShowError] = useState("");
    const timeStamp = Date();

    const submitData = (event) => {
        event.preventDefault();

        if (name === '') {
            setShowError("Enter Your Name");
            toHide(setShowError);
        }
        else if (email === '') {
            setShowError("Enter Your Email");
            toHide(setShowError);
        }
        else if (mobile === '') {
            setShowError("Enter Your Mobile");
            toHide(setShowError);
        }
        else if (subject === '') {
            setShowError("Enter Your Subject");
            toHide(setShowError);
        }
        else if (question === '') {
            setShowError("Enter Your Question");
            toHide(setShowError);
        } else {
            try {
                firebase.database().ref("contact").push().set({
                    'Name': name,
                    'Email': email,
                    'Mobile': mobile,
                    'Subject': subject,
                    'Question': question,
                    'TimeStamp': timeStamp
                }).catch((err) => {
                    setShowError(err.message)
                });
            } catch (err) {
                setShowError(err.message);
                toHide(setShowError);
            }

        }
    }
    return (
        <div className="backgroundPage">
            <div className="centerWholePage">
                <div className="centerPageHeading">Contact <span className="colorChange"> us</span> </div>
                <ul className="headingul">
                    <div className="centerPageContent">
                        <section className="rowSection">
                            <li><h1 className="heading1"> We here for everything you needs </h1> </li>
                            <div className="rowsectionContent">
                                <span className="paraFirstbigText"> Lorem </span> Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets.
                            </div>
                        </section>
                        <section className="rowSection">
                            <li><h1 className="heading1">Have any questions </h1> </li>
                            <div className="rowsectionContent">
                                <div className="form">
                                    <form className="contact_form">
                                        <FormControl className="formcontrol">
                                            <InputLabel className="inputlabel"> Enter your name </InputLabel>
                                            <Input className="input" type="text" required onChange={(e) => setName(e.target.value)} />
                                        </FormControl>
                                        <FormControl className="formcontrol">
                                            <InputLabel className="inputlabel"> Enter your email </InputLabel>
                                            <Input className="input" type="email" required onChange={(e) => setEmail(e.target.value)} />
                                        </FormControl>
                                        <FormControl className="formcontrol">
                                            <InputLabel className="inputlabel"> Enter your mobile number </InputLabel>
                                            <Input className="input" type="number" required onChange={(e) => setMobile(e.target.value)} />
                                        </FormControl>
                                        <FormControl className="formcontrol">
                                            <InputLabel className="inputlabel"> Enter your subject </InputLabel>
                                            <Input className="input" type="text" required onChange={(e) => setSubject(e.target.value)} />
                                        </FormControl>
                                        <FormControl className="formcontrol bigFormcontrol">
                                            <InputLabel className="inputlabel"> Enter your question </InputLabel>
                                            <Input className="input" type="text" required onChange={(e) => setQuestion(e.target.value)} />
                                        </FormControl>

                                        <Button className='submitButton' variant="contained" onClick={submitData}>Submit</Button>
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
                            </div>
                        </section>
                        <section className="rowSection">
                            <li><h1 className="heading1"> Contact Details </h1> </li>
                            <div className="rowsectionContent">
                                <div className="contactList">
                                    <ul >
                                        <li> <span className="listHead" > Phone: </span> 6396922804 </li>
                                        <li> <span className="listHead" >Email: </span>placementsocket@gmail.com </li>
                                        <li> <span className="listHead" >Address:  </span>Nanda ki chowki, Premenagar, Dehradun Uttarakhand Pin: 248007 </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                    </div>
                </ul>
            </div>
        </div>
    )
}

export default Contact

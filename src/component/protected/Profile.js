import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../firebase/auth";
import Button from '@mui/material/Button';
import profileImage from '../../img/image.png'
import addImageIcon from '../../img/addImageIcon.png'
import "../../css/Profile.css"
import firebase from "firebase";

import GetPersonalDetails from './GetStudentDetails/GetPersonalDetails.js'
import GetGraduationDetails from './GetStudentDetails/GetGraduationDetails.js'
import GetSeniorSecondaryDetails from './GetStudentDetails/GetSeniorSecondaryDetails.js'
import GetSecondaryDetails from './GetStudentDetails/GetSecondaryDetails.js'
import GetProfileHeadingDetails from "./GetStudentDetails/GetProfileHeadingDetails";
import GetInternshipDetails from "./GetStudentDetails/GetInternshipDetails";
import GetTechnicalSkills from "./GetStudentDetails/GetTechnicalSkills";
import PopUp from "../small/PopUp";

function Dashboard() {
    const { currentUser } = useContext(AuthContext);
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [downloadImage, setDownloadImage] = useState({ preview: "", raw: "" });
    const timeStamp = Date();

    const [pop, setPop] = useState(false);


    try {
        const userId = firebase.auth().currentUser.uid;
        firebase.storage().ref('images').child('student/' + userId + "/profileImage").getDownloadURL()
            .then((url) => {
                setDownloadImage(url)
            }).catch((err) => (
                setDownloadImage(null)
            ))
    } catch (err) {
        alert(err)
    }



    const popUp = (() => {
        setPop(true)
    })
    const close = (() => {
        setPop(false)
    })
    const selectImage = e => {

        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };

    const clearImage = (() => {
        setImage('')
    })
    const uploadImage = (() => {
        try {
            const userId = firebase.auth().currentUser.uid;
            firebase.storage().ref('images').child('student/' + userId + "/profileImage").put(image.raw).then(
                () => {
                    firebase.database().ref("data").child('student/' + userId + '/profilePicture').set({
                        'profileImage': 'Uploaded',
                        "timeStamp" : timeStamp
                    }).catch((err) => (alert(err)))
                    setImage('')
                    setPop(false)

                }).catch((err) => (alert(err)))
        } catch (err) {
            alert(err)
        }
    })

    if (!currentUser) {
        return <Redirect to="/signup" />;
    }

    try {
    } catch (err) {
        alert(err);
    }

    return (
        <>
            {(pop) ? (
                <div className="forPopUp">
                    <div className="popUp">
                        <div className="closeButtonBox">
                            <Button className="closeButton" variant="contained" onClick={close}> X </Button>
                        </div>
                        <div className="imageBox">
                            <label htmlFor="upload-button">
                                {image.preview ?
                                    <img src={image.preview} style={{ height: '100%' }} />
                                    : (
                                        <img style={{ height: '100%' }} src={addImageIcon} alt="profile" />
                                    )}
                            </label>
                            <input type="file" id="upload-button" style={{ display: 'none' }} onChange={selectImage} />
                        </div>
                        <div className="submitButtonBox">
                            <Button variant="contained" onClick={clearImage}> Clear Image</Button>
                            <Button variant="contained" onClick={uploadImage}> Submit Image</Button>
                        </div>
                    </div>
                </div>
            ) : (
                <p></p>
            )}

            <div className="backgroundPage">
                {/* <div className="forPopUp">
                this is pop
            </div> */}
                <div className="centerWholePage">
                    <div className="centerPageHeading">Your <span className="colorChange"> Profile</span> </div>

                    <ul className="headingul">
                        <div className="centerPageContent" style={{ borderRadius: '0px' }}>
                            <section className="profileRowSectionOne">
                                <div className="profileUserNameDiv">
                                    <GetProfileHeadingDetails />
                                </div>
                                <div className="profileImageDiv">
                                    {downloadImage ? (
                                        <img src={downloadImage} style={{ height: '100%' }} />
                                    ) : (
                                        <p>
                                            <Button onClick={popUp}>  Add Image </Button>

                                        </p>
                                    )}

                                    {/* <AddProfileImage/> */}
                                    {/* <Button variant="outlined" component={Link} to="/addProfileImage">add image</Button> */}
                                </div>
                            </section>
                        </div>
                    </ul>

                    <ul className="headingul">
                        <div className="centerPageContent" style={{ borderRadius: '0px' }}>
                            <section className="profileRowSectionDetails">
                                <div className="detailsHeading">
                                    <span className="detailsHeadingName">
                                        Personal Details:
                                    </span>
                                    <span className="editButton">
                                        <Button variant="outlined" component={Link} to="/addPersonalDetails">Edit Details</Button>
                                    </span>
                                </div>
                                <div className="details">
                                    <GetPersonalDetails />
                                </div>
                            </section>
                        </div>
                    </ul>
                    <ul className="headingul">
                        <div className="centerPageContent" style={{ borderRadius: '0px' }}>
                            <section className="profileRowSectionDetails">
                                <div className="detailsHeading">
                                    Education Details:
                                </div>
                                <div className="details">
                                    <div className="detailsHeading">
                                        <span className="partitionHeading">
                                            Graduation Details:
                                        </span>
                                        <span className="editButton">
                                            <Button variant="outlined" component={Link} to="/addGraduationDetails">Edit Details</Button>
                                        </span>
                                    </div>
                                    <GetGraduationDetails />

                                </div>
                                <div className="details">
                                    <div className="detailsHeading">
                                        <span className="partitionHeading">
                                            Senior Secondary (XII)Details:
                                        </span>
                                        <span className="editButton">
                                            <Button variant="outlined" component={Link} to="/addSeniorSecondaryDetails">Edit Details</Button>
                                        </span>
                                    </div>
                                    <GetSeniorSecondaryDetails />
                                </div>
                                <div className="details">
                                    <div className="detailsHeading">
                                        <span className="partitionHeading">
                                            Secondary (X) Details:
                                        </span>
                                        <span className="editButton">
                                            <Button variant="outlined" component={Link} to="/addSecondaryDetails">Edit Details</Button>
                                        </span>
                                    </div>
                                    <GetSecondaryDetails />
                                </div>
                            </section>
                        </div>
                    </ul>
                    <ul className="headingul">
                        <div className="centerPageContent" style={{ borderRadius: '0px' }}>
                            <section className="profileRowSectionDetails">
                                <div className="detailsHeading">
                                    <span className="detailsHeadingName">
                                        Internship/Work Experience Details:
                                    </span>
                                    <span className="editButton">
                                        <Button variant="outlined" component={Link} to="/addInternshipDetails">Edit Details</Button>
                                    </span>
                                </div>
                                <div className="details">
                                    <GetInternshipDetails />

                                </div>
                            </section>
                        </div>
                    </ul>
                    <ul className="headingul">
                        <div className="centerPageContent" style={{ borderRadius: '0px' }}>
                            <section className="profileRowSectionDetails">
                                <div className="detailsHeading">
                                    <span className="detailsHeadingName">
                                        Technical Skills:
                                    </span>
                                    <span className="editButton">
                                        <Button variant="outlined" component={Link} to="/addTechnicalSkills">Add Skills</Button>
                                    </span>
                                </div>
                                <div className="details">
                                    <GetTechnicalSkills />

                                </div>
                            </section>
                        </div>
                    </ul>

                </div>
            </div >
        </>
    )
}

export default Dashboard

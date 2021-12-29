import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import addImageIcon from '../../img/addImageIcon.png'
import "../../css/Profile.css"
import firebase from "firebase";

import GetPersonalDetails from './Student/GetStudentDetails/GetPersonalDetails.js'
import GetGraduationDetails from './Student/GetStudentDetails/GetGraduationDetails.js'
import GetSeniorSecondaryDetails from './Student/GetStudentDetails/GetSeniorSecondaryDetails.js'
import GetSecondaryDetails from './Student/GetStudentDetails/GetSecondaryDetails.js'
import GetProfileHeadingDetails from "./Student/GetStudentDetails/GetProfileHeadingDetails";
import GetInternshipDetails from "./Student/GetStudentDetails/GetInternshipDetails";
import GetTechnicalSkills from "./Student/GetStudentDetails/GetTechnicalSkills";


function StudentProfile() {
    // const { currentUser } = useContext(AuthContext);
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [downloadImage, setDownloadImage] = useState({ preview: "", raw: "" });
    const [pop, setPop] = useState(false);
    const timeStamp = Date();

    try {
        const userId = firebase.auth().currentUser.uid;
        firebase.storage().ref('images').child('student/' + userId + "/profileImage").getDownloadURL()
            .then((url) => {
                setDownloadImage(url)
            }).catch((err) => (
                setDownloadImage(null)
                ))
            } catch (err) {
                // alert(err)
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

    const uploadImage = (() => {
        try {
            const userId = firebase.auth().currentUser.uid;
            firebase.storage().ref('images').child('student/' + userId + "/profileImage").put(image.raw).then(
                () => {
                    firebase.database().ref("data").child('student/' + userId + '/profilePicture').set({
                        'profileImage': 'Uploaded',
                        "timeStamp": timeStamp
                    }).catch((err) => (alert(err)))
                    setImage('')
                    setPop(false)

                }).catch((err) => (alert(err)))
        } catch (err) {
            alert(err)
        }
    })

    const clearImage = (() => {
        setImage('')
    })

    // if (!currentUser) {
    //     return <Redirect to="/signup" />;
    // }

    const DataToPrint = [
        {
            sectionHeading: 'Personal Details',
            to: '/addPersonalDetails',
            buttonName: 'Edit details',
            getDataPageLink: <GetPersonalDetails />
        },

        {
            sectionHeading: 'Graduation Details',
            to: '/addGraduationDetails',
            buttonName: 'Edit details',
            getDataPageLink: <GetGraduationDetails />
        },

        {
            sectionHeading: 'Senior Secondary (XII)Details',
            to: '/addSeniorSecondaryDetails',
            buttonName: 'Edit details',
            getDataPageLink: <GetSeniorSecondaryDetails />
        },
        {
            sectionHeading: 'Secondary (X) Details',
            to: '/addSecondaryDetails',
            buttonName: 'Edit details',
            getDataPageLink: <GetSecondaryDetails />
        },

        {
            sectionHeading: 'Internship/Work Experience Details',
            to: '/addInternshipDetails',
            buttonName: 'Edit details',
            getDataPageLink: <GetInternshipDetails />
        },
        {
            sectionHeading: 'Technical Skills',
            to: '/addTechnicalSkills',
            buttonName: 'Add Skills',
            getDataPageLink: <GetTechnicalSkills />
        },

    ]
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
                                    <img src={image.preview} alt="imagePreview" style={{ height: '100%' }} />
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
                                        <img src={downloadImage} alt="Loading." style={{ height: '100%' }} />
                                    ) : (
                                        <p>
                                            <Button onClick={popUp}>  Add Image </Button>
                                        </p>
                                    )}
                                </div>
                            </section>
                        </div>
                    </ul>

                    {DataToPrint.map((data, index) => (
                        <ul className="headingul">
                            <div className="centerPageContent" style={{ borderRadius: '0px' }}>
                                <section className="profileRowSectionDetails">
                                    <div className="detailsHeading">
                                        <span className="detailsHeadingName" key={index}>
                                            {data.sectionHeading}
                                        </span>
                                        <span className="editButton">
                                            <Button variant="outlined" key={index} component={Link} to={data.to}> {data.buttonName}</Button>
                                        </span>
                                    </div>
                                    <div className="details" key={index}>
                                        {data.getDataPageLink}
                                    </div>
                                </section>
                            </div>
                        </ul>
                    ))}
                </div>
            </div >
        </>
    )
}


export default StudentProfile

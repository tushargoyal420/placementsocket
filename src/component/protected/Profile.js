import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../firebase/auth";
import Button from '@mui/material/Button';
import firebase from "../../firebase/firebase";
import profileImage from '../../img/image.png'
import "../../css/Profile.css"
import GetPersonalDetails from './GetStudentDetails/GetPersonalDetails.js'
import GetGraduationDetails from './GetStudentDetails/GetGraduationDetails.js'
import GetSeniorSecondaryDetails from './GetStudentDetails/GetSeniorSecondaryDetails.js'
import GetSecondaryDetails from './GetStudentDetails/GetSecondaryDetails.js'
import GetProfileHeadingDetails from "./GetStudentDetails/GetProfileHeadingDetails";
function Dashboard() {
    const { currentUser } = useContext(AuthContext);
    if (!currentUser) {
        return <Redirect to="/signup" />;
    }

    try {
    } catch (err) {
        alert(err);
    }
    const getConsole = (() => {
    })

    return (
        <div className="backgroundPage">
            <div className="centerWholePage">
                <div className="centerPageHeading">Your <span className="colorChange"> Profile</span> </div>

                <ul className="headingul">
                    <div className="centerPageContent" style={{ borderRadius: '0px' }}>
                        <section className="profileRowSectionOne">
                            <div className="profileUserNameDiv">
                                <div className="userName">Tushar Goyal </div>
                                <ul className="profileUserDetailsList">
                                    {/* <li> Student </li>
                                    <li> 6396922804 </li>
                                    <li> tusshartg420@gmail.com </li> */}
                                    <GetProfileHeadingDetails/>
                                </ul>
                            </div>
                            <div className="profileImageDiv">
                                <img className="profileImage" src={profileImage} alt="profileImage" />
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
                                <GetGraduationDetails/>

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
                              <GetSeniorSecondaryDetails/>  
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
                                <GetSecondaryDetails/>  
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
                                    <Button variant="outlined">Edit Details</Button>
                                </span>
                            </div>
                            <div className="details">

                            </div>
                        </section>
                    </div>
                </ul>

            </div>
        </div >

    )
}

export default Dashboard

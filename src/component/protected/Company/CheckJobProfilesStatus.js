import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import firebase from '../../../firebase/firebase'
import { Link } from 'react-router-dom';

function CheckJobProfilesStatus() {
    const userId = firebase.auth().currentUser.uid;
    const LocalKey = localStorage.getItem('JobCheckStatusId')
    const [gettingKey, setgettingKey] = useState(LocalKey)
    const CurrentJobKey = gettingKey.replace(/['"]+/g, '');
    const [data, setData] = useState([]);
    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        firebase.database().ref('data/company/' + userId + '/jobProfiles/' + CurrentJobKey).once('value').then((snapshot, index) => {
            setData(snapshot.child("Details").val());
            const studentDetails = []
            snapshot.child('Students').forEach((singleStudent, indextwo) => {
                studentDetails.push(singleStudent.val())
            })
            setStudentData(studentDetails)
        }).catch((err) => {
            alert(err)
        })
    }, [])

    const shortlist = ((e) => {
        firebase.database().ref('data/company/' + userId + '/jobProfiles/' + CurrentJobKey).once('value').then((snapshot, index) => {
            setData(snapshot.child("Details").val());
            const studentDetails = []
            snapshot.child('Students').forEach((singleStudent, indextwo) => {
                studentDetails.push(singleStudent.val())
            })
            setStudentData(studentDetails)
        }).catch((err) => {
            alert(err)
        })

    })
    const notShortlist = value => () => (
        console.log(value)
    )

    return (
        <div className="backgroundPage">
            <div className="centerWholePage">
                <div className="centerPageHeading">Profile<span className="colorChange"> Status</span> </div>
                <ul className="headingul">
                    <div className="centerPageContent" style={{ borderRadius: '0px' }}>
                        <section className="profileRowSectionDetails">
                            <div className="detailsHeading">
                                <span className="detailsHeadingName">
                                    Profile Details
                                </span>
                            </div>

                            {(data)
                                ? (
                                    <>
                                        <div className="details" >
                                            <div className="dataBox">
                                                <ul className="getDetails">
                                                    <div className="internshipHeader">
                                                        <div className="organizationName" >{data.job_name}</div>
                                                    </div>
                                                    <li>
                                                        <span className="key"> Role : </span>
                                                        <span >{data.about_role}</span>
                                                    </li>
                                                    <li>
                                                        <span className="key"> CTC : </span>
                                                        <span >{data.ctc}</span>
                                                    </li>
                                                    <li>
                                                        <span className="key"> Responsibilities : </span>
                                                        <span >{data.responsibilities}</span>
                                                    </li>
                                                    <li>
                                                        <span className="key"> Technology Stack : </span>
                                                        <span >{data.technology_stack}</span>
                                                    </li>
                                                    <li>
                                                        <span className="key"> Type : </span>
                                                        <span >{data.job_type}</span>
                                                    </li>
                                                    <li>
                                                        <span className="key"> Location : </span>
                                                        <span >{data.job_locations}</span>
                                                    </li>
                                                    <li>
                                                        <span className="key"> Bonds/Service Agreement : </span>
                                                        <span >{data.bond}</span>
                                                    </li>
                                                    <li>
                                                        <span className="key"> Additional Details : </span>
                                                        <span >{data.additional_details}</span>
                                                    </li>
                                                    <div className="partitionHeading">Criteria :</div>

                                                    <li>
                                                        <span className="key"> 10 Percentage : </span>
                                                        <span >{data.s_percentage}</span>
                                                    </li>
                                                    <li>
                                                        <span className="key"> 12 Percentage : </span>
                                                        <span >{data.ss_percentage}</span>
                                                    </li>
                                                    <li>
                                                        <span className="key"> Under Graduation Percentage : </span>
                                                        <span >{data.ugPerc}</span>
                                                    </li>
                                                    <li>
                                                        <span className="key"> Active Backlogs : </span>
                                                        <span >{data.active_backlogs}</span>
                                                    </li>


                                                    <li>
                                                        <span className="key"> Passing Out year : </span>
                                                        <span >{data.passingOut}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    </>
                                ) : (
                                    <p>Failed to load</p>
                                )
                            }
                        </section>
                        <section className="profileRowSectionDetails">
                            <div className="detailsHeading">
                                <span className="detailsHeadingName">
                                    Student Details
                                </span>
                            </div>
                            {(studentData) ? (
                                studentData.map((singleData, index) => (
                                    <div className="details" >
                                        <div className="dataBox">
                                            <ul className="getDetails">
                                                <div className="internshipHeader">
                                                    <div className="organizationName" >{singleData.Student_Name}</div>
                                                    <Button className="closeButton" variant="contained"
                                                        onClick={(() => (localStorage.setItem('ParticularStudentId', JSON.stringify(singleData.StudentId))))}
                                                        component={Link}
                                                        to="/particularstudentProfile"
                                                        id='withBackgroundButton'
                                                    > Student Details </Button>
                                                </div>

                                                <li>
                                                    <span className="key"> Application Status: </span>
                                                    <span >{singleData.Status}</span>
                                                </li>
                                                <li>
                                                    <span className="key"> SapId: </span>
                                                    <span >{singleData.Student_SapId}</span>
                                                </li>
                                                <li>
                                                    <span className="key"> Email: </span>
                                                    <span >{singleData.Student_Email}</span>
                                                </li>
                                                <li>
                                                    <span className="key"> Personal Email: </span>
                                                    <span >{singleData.Student_Personal_Email}</span>
                                                </li>
                                                <li>
                                                    <span className="key"> Contact number: </span>
                                                    <span >{singleData.Student_Contact_Number}</span>
                                                </li>
                                                <li>
                                                    <span className="key"> Alternate Contact number: </span>
                                                    <span >{singleData.Student_Alternate_Contact_Number}</span>
                                                </li>
                                                <li>
                                                    <span className="key"> TimeStamp: </span>
                                                    <span >{singleData.TimeStamp}</span>
                                                </li>
                                            </ul>
                                            <div className="internshipHeader" style={{ justifyContent: 'flex-end', marginTop: '20px' }}>
                                                <Button className="closeButton" variant="outlined"
                                                    onClick={(() => (
                                                        firebase.database().ref("data").child('company/' + userId + "/jobProfiles/" + CurrentJobKey + "/Students")
                                                            .child(singleData.StudentId).update({
                                                                "Status": "Not Shortlist"
                                                            }).catch((err) => (
                                                                alert(err.message)
                                                            ))
                                                    ))
                                                    }

                                                    id='withBlueBackgroundButton'
                                                > Not Shorlist Student </Button>

                                                <Button className="closeButton" variant="contained"
                                                    onClick={(() => (
                                                        firebase.database().ref("data").child('company/' + userId + "/jobProfiles/" + CurrentJobKey + "/Students")
                                                            .child(singleData.StudentId).update({
                                                                "Status": "Shortlist"
                                                            }).catch((err) => (
                                                                alert(err.message)
                                                            ))
                                                    ))
                                                    }
                                                    id='withBlueBackgroundButton'
                                                > Shorlist Student </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p> no student</p>
                            )
                            }
                        </section>

                    </div>
                </ul>

            </div >
        </div >
    )
}

export default CheckJobProfilesStatus

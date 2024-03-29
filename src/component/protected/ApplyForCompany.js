import React, { useEffect, useState } from 'react'
import firebase from '../../firebase/firebase.js'
import Button from '@mui/material/Button';

function ApplyForCompany(props) {
    const userId = firebase.auth().currentUser.uid;

    const LocalKey = localStorage.getItem('CurrentKey')  // "abc"

    const [gettingKey, setgettingKey] = useState(LocalKey)
    const CurrentKey = gettingKey.replace(/['"]+/g, '');  //abc
        


    const [data, setData] = useState([]);
    const [button, setButton] = useState(true)
    const [deletedText, setDeletedText] = useState(false)
    const [buttonText, setButtonText] = useState("Submit")
    const [companyId, setCompanyId] = useState();

    // students details
    const [studentDetails, setStudentDetails] = useState([]);
    const [graduation, setGraduation] = useState([]);
    const [secondary, setSecondary] = useState([]);
    const [seniorSecondary, setSeniorSecondary] = useState([]);
    const timeStamp = Date();

    useEffect(() => {
        const keyy = []
        firebase.database().ref('data/company').once('value').then((snapshot, index) => {
            snapshot.forEach((eachComapny) => {
                eachComapny.child('jobProfiles').forEach((jobs) => {
                    if (jobs.key === CurrentKey) {
                        setData(jobs.child('Details').val());
                        keyy.push(eachComapny.key)
                    }
                })
                setCompanyId(keyy[0])
            })
        }).catch((err) => {
            alert(err)
        })
    }, []);
    useEffect(() => {
        firebase.database().ref('data').child('student').child(userId).child('personalDetails')
            .once('value').then((snapshot) => {
                setStudentDetails(snapshot.val());
            }).catch((err) => {
                alert("Graduation data is not available")
            })
        firebase.database().ref('data').child('student').child(userId).child('educationDetails/graduation')
            .once('value').then((snapshot) => {
                setGraduation(snapshot.val());
            }).catch((err) => {
                alert("Graduation data is not available")
            })
        firebase.database().ref('data').child('student').child(userId).child('educationDetails/secondary')
            .once('value').then((snapshot) => {
                setSecondary(snapshot.val());
            }).catch((err) => {
                alert("Secondary data is not available")
            })
        firebase.database().ref('data').child('student').child(userId).child('educationDetails/seniorSecondary')
            .once('value').then((snapshot) => {
                setSeniorSecondary(snapshot.val());
            }).catch((err) => {
                alert("Senior Secondary data is not available")
            })
    }, [])
    useEffect(() => {
        try {
            firebase.database().ref('data/company/' + companyId + "/jobProfiles/" + CurrentKey + "/Students").on('value', (snapshot) => {
                if (snapshot.child(userId).exists()) {
                    const status = snapshot.child(userId).child('Status').val()
                    const deletedTime = snapshot.child(userId).child('Deleted_TimeStamp').val()
                    if (status === "Deleted") {
                        setButton(true)
                        setButtonText("Submit again")
                        setDeletedText(true)
                        setDeletedText("You deleted this application on " + deletedTime)
                    } if (status === "Applied") {
                        setButton(false)
                        setButtonText("You already Applied")
                    } if (status === "Shorlisted") {
                        setButton(false)
                        setButtonText("You already Shortlisted")
                    } if (status === "Not Shorlist") {
                        setButton(false)
                        setButtonText("Sorry you are not shorlist")
                    }else{
                        setButton(false)
                        setButtonText(status)
                    }
                }
            })
        } catch (e) {
            alert(e.message)
        }
    })

    const submit = (() => {
        const errorList = []
        try {
            if (secondary.Percentage < data.s_percentage) {
                errorList.push("Secondary Percentage doesn't match the criteria. \n")
            } if (seniorSecondary.Percentage < data.ss_percentage) {
                errorList.push("Senior Secondary Percentage doesn't match the criteria. \n")
            } if (graduation.Percentage < data.ugPerc) {
                errorList.push("Graduation Percentage doesn't match the criteria. \n")
            } if (!(graduation.Ending_Year === data.passingOut)) {
                errorList.push("Graduation passing out year doesn't match the criteria. \n")
            } if (!(graduation.Backlogs === data.active_backlogs)) {
                errorList.push("Backlogs doesn't match the criteria. \n")
            }
        } catch (error) {
            alert(error.message)
        }

        if (errorList.length) {
            alert(errorList)
        } else {
            try {
                firebase.database().ref("data").child('company/' + companyId + "/jobProfiles/" + CurrentKey + "/Students")
                    .child(userId).update({
                        "StudentId": userId,
                        "Student_SapId": studentDetails.SapId,
                        "Student_Name": studentDetails.Name,
                        "Student_Email": studentDetails.Email_address,
                        "Student_Personal_Email": studentDetails.Personal_email_address,
                        "Student_Contact_Number": studentDetails.Mobile_number,
                        "Student_Alternate_Contact_Number": studentDetails.Alternate_mobile_number,
                        "Status": "Applied",
                        "TimeStamp": timeStamp,
                    }).catch((err) => (
                        alert(err.message)
                    ))
            } catch (e) {
                alert(e.message)
            }

        }
    })

    return (
        <div className="backgroundPage">
            <div className="centerWholePage">
                <div className="centerPageHeading">Apply <span className="colorChange"> Job</span> </div>
                {(data)
                    ? (
                        <>
                            <ul className="headingul">
                                <div className="centerPageContent" style={{ borderRadius: '0px' }}>
                                    <section className="profileRowSectionDetails">
                                        <div className="detailsHeading">
                                            <span className="detailsHeadingName">
                                                Profile Details
                                            </span>
                                        </div>
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
                                    </section>
                                </div>
                            </ul>
                        </>

                    ) : (
                        <p>Failed to load</p>
                    )
                }
                {
                    (button) ? (
                        <>
                            {(deletedText) ? (
                                <p className="deletedMessage">Note: {deletedText}</p>

                            ) : (
                                <> </>
                            )
                            }
                            <Button className="closeButton" variant="contained" id="sUbbutton" onClick={submit}> {buttonText}</Button>
                        </>
                    ) : (
                        <Button className="closeButton" variant="contained" id="sUbbutton" onClick={submit} disabled>{buttonText}</Button>
                    )}
            </div>
        </div>
    )
}

export default ApplyForCompany

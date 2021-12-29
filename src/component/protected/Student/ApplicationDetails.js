import React, { useEffect, useState } from 'react'
import firebase from '../../../firebase/firebase'
import Button from '@mui/material/Button';

function ApplicationDetails() {
    const [data, setData] = useState([]);
    const timeStamp = Date();
    const userId = firebase.auth().currentUser.uid;

    const LocalKey = localStorage.getItem('ApplicationId')
    const [gettingKey, setgettingKey] = useState(LocalKey)
    const CurrentKey = gettingKey.replace(/['"]+/g, '');

    const LocalCompanyKey = localStorage.getItem('ApplicationCompanyId')
    const [gettingCompanyKey, setgettingCompanyKey] = useState(LocalCompanyKey)
    const CurrentCompanyKey = gettingCompanyKey.replace(/['"]+/g, '');

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
            })
        }).catch((err) => {
            alert(err)
        })
    }, []);
    const deleteBut = () => {
        try {
            firebase.database().ref("data").child('company/' + CurrentCompanyKey + "/jobProfiles/" + CurrentKey + "/Students")
                .child(userId).update({
                    "Status": "Deleted",
                    "Deleted_TimeStamp": timeStamp
                }).catch((err) => (
                    alert(err.message)
                ))
        } catch (e) {
            alert(e.message)
        }
    }
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
                            <Button className="closeButton" variant="contained" id="sUbbutton" onClick={deleteBut} > Delete</Button>
                        </>

                    ) : (
                        <p>Failed to load</p>
                    )
                }
            </div>
        </div>
    )
}

export default ApplicationDetails

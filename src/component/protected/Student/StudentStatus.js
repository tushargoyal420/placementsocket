import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import firebase from '../../../firebase/firebase'


function StudentStatus() {
    const [data, setData] = useState([]);
    const userId = firebase.auth().currentUser.uid;
    const timeStamp = Date();
    const [companyid, setCompanyid] = useState()
    useEffect(() => {
        firebase.database().ref('data/company/').once('value').then((AllCompany, index) => {
            const dataList = []
            AllCompany.forEach((particularCompany, indextwo) => {
                const companyName = particularCompany.child('about').child('name').val()

                particularCompany.child("jobProfiles").forEach((alljobs, indexthree) => {
                    const companyId = particularCompany.key
                    const JobName = alljobs.child('Details').child('job_name').val()
                    const JobId = alljobs.key
                    alljobs.child("Students").forEach((particularStudent, indexfour) => {
                        if (particularStudent.key == userId) {
                            dataList.push({
                                Company_Id: companyId,
                                Company_Name: companyName,
                                Job_Name: JobName,
                                Job_Id: JobId,
                                Application_Status: particularStudent.child('Status').val(),
                                Application_SubmitTime: particularStudent.child('TimeStamp').val()
                            })
                        }
                    })
                })
            })
            setData(dataList)
        }).catch((err) => {
            alert(err)
        })
    }, []);
    return (
        <div className="backgroundPage">
            <div className="centerWholePage">
                <div className="centerPageHeading">Jobs <span className="colorChange"> Status</span> </div>
                <ul className="headingul">
                    <div className="centerPageContent" style={{ borderRadius: '0px' }}>
                        <section className="profileRowSectionDetails">
                            <div className="details">
                                {(!data) ? (
                                    <div className="dataBox">
                                        <ul className="getDetails">
                                            Please apply for job
                                        </ul>
                                    </div>
                                ) : (
                                    <div>
                                        {data.map((whole, index) => (
                                            <div className="dataBox">
                                                <ul className="getDetails">
                                                    <div className="internshipHeader">
                                                        <div className="organizationName">{whole.Company_Name}</div>
                                                        <div> <span> <b>{whole.Job_Name}</b></span> </div>
                                                    </div>
                                                    <div className="secondBox">
                                                        <div>
                                                            <li>
                                                                <span className="key"> Application Status: </span>
                                                                <span >{whole.Application_Status} </span>
                                                            </li>
                                                            <li>
                                                                <span className="key"> Applied time: </span>
                                                                <span >{whole.Application_SubmitTime} </span>
                                                            </li>
                                                        </div>
                                                    </div>
                                                    <div className='thirdBox'>
                                                        <Button variant="contained" className='submitButton' id='withBackgroundButton' component={Link} style={{ marginLeft: '20px' }} to="/ApplicationDetails"
                                                            onClick={
                                                                (() => (
                                                                    <>
                                                                        {
                                                                            localStorage.setItem('ApplicationId', JSON.stringify(whole.Job_Id))
                                                                        }
                                                                        {
                                                                            localStorage.setItem('ApplicationCompanyId', JSON.stringify(whole.Company_Id))
                                                                        }
                                                                    </>
                                                                )
                                                                )}
                                                        > Application Details </Button>
                                                    </div>
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </ul>

            </div >
        </div >)
}

export default StudentStatus

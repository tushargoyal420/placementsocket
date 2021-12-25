import React, { useEffect, useState } from 'react'
import "../../css/HomePage.css"
import Button from '@mui/material/Button';
import firebase from '../../firebase/firebase.js'
import { Link } from 'react-router-dom';
import ApplyForCompany from '../protected/ApplyForCompany';
function Home({ type }) {
    const [companyData, setCompanyData] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const userId = firebase.auth().currentUser.uid;
        firebase.database().ref('data/company/').once('value').then((snapshot, index) => {

            const dataList = []
            snapshot.forEach((childSnapshot, index) => {

                childSnapshot.forEach((subChildSnapshot, indextwo) => {

                    if (subChildSnapshot.key === 'jobProfiles') {
                        subChildSnapshot.forEach((partiJob, i) => {
                            dataList.push(partiJob.child("Details").val())
                            setData([...data, dataList]);
                        })
                    }
                })
            })
        }).catch((err) => {
            alert(err)
        })
    }, []);

    const apply = (() => {

        // <ApplyForCompany keyy="Ss" />
    })
    const console = (() => {
    })

    return (
        <div className="backgroundPage">
            <div className="heroSection">
                <div className="brandName">
                    Placement Socket
                </div>
                <div className="buttons">
                    <span className="buttonSpan">
                    </span>
                </div>
            </div>
            {type === 'student' ? (
                <div className="homepageContent">
                    {(!data.length) ? (
                        <p> There is no active Jobs</p>
                    ) : (
                        <div className="homepageJobPost">
                            {

                                data.map((whole, index) =>
                                (
                                    whole.map((job, index) => (
                                        <div className="dataBox">
                                            <ul className="getDetails">
                                                <div className="internshipHeader">

                                                    <div className="organizationName" key={job.index}>{job.job_name}</div>
                                                    <div className="rightSideBox">
                                                        <span className="companyName">({job.company_name})</span>
                                                        <div className="jobDate"> {job.TimeStamp}</div>
                                                        <br />
                                                        <Button
                                                            component={Link}
                                                            to={
                                                                { pathname: "/apply",
                                                                    keyy : job.key
                                                                }
                                                            }
                                                            id='withBackgroundButton' variant="contained">Apply</Button>
                                                </div>
                                        </div>
                                        <li>
                                            <span className="key"> Role : </span>
                                            <span key={job.index}>{job.about_role}</span>
                                        </li>
                                        <li>
                                            <span className="key"> CTC : </span>
                                            <span key={job.index}>{job.ctc}</span>
                                        </li>
                                        <li>
                                            <span className="key"> Responsibilities : </span>
                                            <span key={job.index}>{job.responsibilities}</span>
                                        </li>
                                        <li>
                                            <span className="key"> Technology Stack : </span>
                                            <span key={job.index}>{job.technology_stack}</span>
                                        </li>
                                        <li>
                                            <span className="key"> Type : </span>
                                            <span key={job.index}>{job.job_type}</span>
                                        </li>
                                        <li>
                                            <span className="key"> Location : </span>
                                            <span key={job.index}>{job.job_locations}</span>
                                        </li>
                                        <li>
                                            <span className="key"> Bonds/Service Agreement : </span>
                                            <span key={job.index}>{job.bond}</span>
                                        </li>
                                        <li>
                                            <span className="key"> Additional Details : </span>
                                            <span key={job.index}>{job.additional_details}</span>
                                        </li>
                                        <div className="partitionHeading">Criteria :</div>

                                        <li>
                                            <span className="key"> 10 Percentage : </span>
                                            <span key={job.index}>{job.s_percentage}</span>
                                        </li>
                                        <li>
                                            <span className="key"> 12 Percentage : </span>
                                            <span key={job.index}>{job.ss_percentage}</span>
                                        </li>
                                        <li>
                                            <span className="key"> Under Graduation Percentage : </span>
                                            <span key={job.index}>{job.ugPerc}</span>
                                        </li>
                                        <li>
                                            <span className="key"> Active Backlogs : </span>
                                            <span key={job.index}>{job.active_backlogs}</span>
                                        </li>
                                        <li>
                                            <span className="key"> Passing Out year : </span>
                                            <span key={job.index}>{job.passingOut}</span>
                                        </li>

                                            </ul>
                                        </div>
            ))
            )
            )
                            }
        </div>
    )
}
                </div >
            ) : type === 'company' ? (
    <>
        comp
    </>

) : type === "college" ? (
    <>college</>
) : (
    <p>Loading..</p>
)
            }


        </div >
    )
}

export default Home

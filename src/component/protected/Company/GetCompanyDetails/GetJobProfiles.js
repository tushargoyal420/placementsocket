import React, { useState } from 'react'
import firebase from '../../../../firebase/firebase.js'
import Button from '@mui/material/Button';


function GetJobProfiles() {

    const userId = firebase.auth().currentUser.uid;
    const [data, setData] = useState([]);

    firebase.database().ref('data/company/' + userId + '/jobProfiles')
        .once('value').then((snapshot, index) => {
            const dataList = []
            snapshot.forEach((childSnapshot) => {
                // childSnapshot;
                dataList.push(childSnapshot.child("Details").val())
            })
            setData(dataList);
        }).catch((err) => {
            alert(err)
        })
    return (
        <div>
            {(!data.length) ? (
                <p> Please Add job details</p>
            ) : (
                <>
                    {data.map((single, index) => (
                        <div className="dataBox">
                            <ul className="getDetails">
                                <div className="internshipHeader">
                                    <div className="organizationName" key={single.index}>{single.job_name}</div>
                                    <div> 
                                        <Button variant="outlined" onClick={(() => {
                                            firebase.database().ref('data/company/' + userId + '/jobProfiles/' + single.key).remove()
                                        })} > Delete </Button>
                                    </div>
                                </div>
                                <li>
                                    <span className="key"> Role : </span>
                                    <span key={single.index}>{single.about_role}</span>
                                </li>
                                <li>
                                    <span className="key"> CTC : </span>
                                    <span key={single.index}>{single.ctc}</span>
                                </li>
                                <li>
                                    <span className="key"> Responsibilities : </span>
                                    <span key={single.index}>{single.responsibilities}</span>
                                </li>
                                <li>
                                    <span className="key"> Technology Stack : </span>
                                    <span key={single.index}>{single.technology_stack}</span>
                                </li>
                                <li>
                                    <span className="key"> Type : </span>
                                    <span key={single.index}>{single.job_type}</span>
                                </li>
                                <li>
                                    <span className="key"> Location : </span>
                                    <span key={single.index}>{single.job_locations}</span>
                                </li>
                                <li>
                                    <span className="key"> Bonds/Service Agreement : </span>
                                    <span key={single.index}>{single.bond}</span>
                                </li>
                                <li>
                                    <span className="key"> Additional Details : </span>
                                    <span key={single.index}>{single.additional_details}</span>
                                </li>
                                <div className="partitionHeading">Criteria :</div>

                                <li>
                                    <span className="key"> 10 Percentage : </span>
                                    <span key={single.index}>{single.s_percentage}</span>
                                </li>
                                <li>
                                    <span className="key"> 12 Percentage : </span>
                                    <span key={single.index}>{single.ss_percentage}</span>
                                </li>
                                <li>
                                    <span className="key"> Under Graduation Percentage : </span>
                                    <span key={single.index}>{single.ugPerc}</span>
                                </li>
                                <li>
                                    <span className="key"> Active Backlogs : </span>
                                    <span key={single.index}>{single.active_backlogs}</span>
                                </li>


                                <li>
                                    <span className="key"> Passing Out year : </span>
                                    <span key={single.index}>{single.passingOut}</span>
                                </li>
                            </ul>
                        </div>

                    ))
                    }
                </>
            )
            }
        </div>
    )
}

export default GetJobProfiles

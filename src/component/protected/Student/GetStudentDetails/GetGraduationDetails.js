import React, { useState } from 'react'
import firebase from '../../../../firebase/firebase';
import '../../../../css/GetPersonalDetails.css'

function GetGraduationDetails() {
    const userId = firebase.auth().currentUser.uid;
    const [data, setData] = useState("");
    firebase.database().ref('data').child('student').child(userId).child("educationDetails/graduation")
        .once('value').then((snapshot) => {
            setData(snapshot.val());
        }).catch((err) => {
            setData("Error to fetch data")
        })
    return (
        <div>
            {(data) ? (
                <div className="dataBox">

                    <ul className="getDetails">
                        <div className="internshipHeader">
                            <div className="organizationName">{data.College}</div>
                            <div> <span >( {data.Starting_Month} {data.Starting_Year} </span>- <span >{data.Ending_Month} {data.Ending_Year})</span> </div>
                        </div>
                        <div className="secondBox">
                            <div>
                                <li>
                                    <span className="key"> Course: </span>
                                    <span className="value"> {data.Course} </span>
                                </li>

                                <li>
                                    <span className="key"> Degree : </span>
                                    <span >{data.Degree} </span>
                                </li>
                                <li>
                                    <span className="key"> Stream : </span>
                                    <span >{data.Stream} </span>
                                </li>
                                <li>
                                    <span className="key"> Specialization : </span>
                                    <span >{data.Specialization} </span>
                                </li>

                                <li>
                                    <span className="key"> Backlogs: </span>
                                    <span className="value"> {data.Backlogs} </span>
                                </li>
                                <li>
                                    <span className="key"> Roll No: </span>
                                    <span className="value"> {data.RollNo} </span>
                                </li>
                            </div>
                            <div className="percentage"> {data.Percentage}% </div>
                        </div>
                    </ul>
                </div>
            ) : (
                <p> Please fill your Details</p>
            )}
        </div>
    )
}

export default GetGraduationDetails

import React, { useState } from 'react'
import firebase from '../../../firebase/firebase';
import '../../../css/GetPersonalDetails.css'

function GetSeniorSecondaryDetails() {
    const userId = firebase.auth().currentUser.uid;
    const [data, setData] = useState("");
    firebase.database().ref('data').child('student').child(userId).child("educationDetails/seniorSecondary")
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
                            <div className="organizationName">{data.School_Name}</div>
                            <div> <span >({data.Starting_Year} </span>- <span >{data.Ending_Year})</span> </div>
                        </div>
                        <div className="secondBox">
                            <div>
                            <li>
                                <span className="key"> Stream: </span>
                                <span >{data.Stream} </span>
                            </li>
                            <li>
                                <span className="key"> Board: </span>
                                <span >{data.Board} </span>
                            </li>
                            <li>
                                <span className="key"> Type: </span>
                                <span className="value"> {data.Type} </span>
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

export default GetSeniorSecondaryDetails

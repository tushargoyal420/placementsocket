import React, { useState } from 'react'
import firebase from '../../../firebase/firebase';
import '../../../css/GetPersonalDetails.css'

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
                <ul className="getDetails">
                    <li>
                        <span className="key"> Degree : </span>
                        <span className="value"> {data.Degree} </span>
                    </li>
                    <li>
                        <span className="key"> College: </span>
                        <span className="value"> {data.College} </span>
                    </li>
                    <li>
                        <span className="key"> Course: </span>
                        <span className="value"> {data.Course} </span>
                    </li>
                    <li>
                        <span className="key"> Stream: </span>
                        <span className="value"> {data.Stream} </span>
                    </li>
                    <li>
                        <span className="key"> Specialization: </span>
                        <span className="value"> {data.Specialization} </span>
                    </li>
                    <li>
                        <span className="key"> College: </span>
                        <span className="value"> {data.College} </span>
                    </li>
                    <li>
                        <span className="key"> Percentage: </span>
                        <span className="value"> {data.Percentage} </span>
                    </li>
                    <li>
                        <span className="key"> Backlogs: </span>
                        <span className="value"> {data.Backlogs} </span>
                    </li>
                    <li>
                        <span className="key"> RollNo: </span>
                        <span className="value"> {data.RollNo} </span>
                    </li>
                    <li>
                        <span className="key"> Starting_Month: </span>
                        <span className="value"> {data.Starting_Month} </span>
                    </li>
                    <li>
                        <span className="key"> Starting_Year: </span>
                        <span className="value"> {data.Starting_Year} </span>
                    </li>
                    <li>
                        <span className="key"> Ending_Month: </span>
                        <span className="value"> {data.Ending_Month} </span>
                    </li>
                    <li>
                        <span className="key"> Ending_Year: </span>
                        <span className="value"> {data.Ending_Year} </span>
                    </li>
                </ul>
            ) : (
                <p> Please fill your Details</p>
            )}
        </div>
    )
}

export default GetGraduationDetails

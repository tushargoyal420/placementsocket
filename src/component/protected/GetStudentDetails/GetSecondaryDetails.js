import React, { useState } from 'react'
import firebase from '../../../firebase/firebase';
import '../../../css/GetPersonalDetails.css'

function GetSecondaryDetails() {
    const userId = firebase.auth().currentUser.uid;
    const [data, setData] = useState("");
    firebase.database().ref('data').child('student').child(userId).child("educationDetails/secondary")
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
                        <span className="key"> School Name : </span>
                        <span className="value"> {data.School_Name} </span>
                    </li>
                    <li>
                        <span className="key"> Board : </span>
                        <span className="value"> {data.Board} </span>
                    </li>
                    <li>
                        <span className="key"> Percentage : </span>
                        <span className="value"> {data.Percentage} </span>
                    </li>
                    <li>
                        <span className="key"> Starting_Year : </span>
                        <span className="value"> {data.Starting_Year} </span>
                    </li>
                    <li>
                        <span className="key"> Ending_Year : </span>
                        <span className="value"> {data.Ending_Year} </span>
                    </li>
                    <li>
                        <span className="key"> Type : </span>
                        <span className="value"> {data.Type} </span>
                    </li>
                </ul>
            ) : (
                <p> Please fill your Details</p>
            )}
        </div>
    )
}

export default GetSecondaryDetails

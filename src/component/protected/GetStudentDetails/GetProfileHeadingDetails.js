import React, { useState } from 'react'
import firebase from '../../../firebase/firebase';
import '../../../css/GetPersonalDetails.css'

function GetProfileHeadingDetails() {
    const userId = firebase.auth().currentUser.uid;
    const [data, setData] = useState("");
    firebase.database().ref('data').child('student').child(userId).child("personalDetails")
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
                    <span className="value"> {data.userType} </span>
                </li>
                <li>
                    <span className="value"> {data.SapId} </span>
                </li>
                <li>
                    <span className="value"> {data.Email_address} </span>
                </li>
            </ul>
             ):(
                <p> </p>
            )}
        </div>
    )
}

export default GetProfileHeadingDetails

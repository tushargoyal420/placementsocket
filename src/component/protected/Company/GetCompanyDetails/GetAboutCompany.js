import React, { useState } from 'react'
import firebase from '../../../../firebase/firebase';

function GetAboutCompany() {
    const userId = firebase.auth().currentUser.uid;
    const [data, setData] = useState("");
    try {
        firebase.database().ref('data').child('company/' + userId + "/about")
            .once('value').then((snapshot) => {
                setData(snapshot.val());
            }).catch((err) => {
                setData("Error to fetch data")
            })
    }
    catch (err) {

    }
    return (
        <div className='aboutSection'>
            {(data) ? (
                <>
                    {data.about}
                </>
            ) : (
                <p> Please edit your about </p>
            )}
        </div>
    )
}

export default GetAboutCompany

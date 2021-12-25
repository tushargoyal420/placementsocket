import React, { useState } from 'react'
import firebase from '../../../../firebase/firebase'

function GetCompanyProfile() {
    const userId = firebase.auth().currentUser.uid;
    const [data, setData] = useState("");
    try{
        firebase.database().ref('data').child('company/' + userId + "/about")
        .once('value').then((snapshot) => {
            setData(snapshot.val());
        }).catch((err) => {
            setData("Error to fetch data")
        })
    }catch(err){
        
    }
    return (
        <div>
            {(data) ? (
                <>
                    <div className="userName">{data.name}</div>
                    <div className="CompanySubheadingDiv">
                        {data.location}
                    </div>
                </>
            ) : (
                <p> </p>
            )}
        </div>
    )
}

export default GetCompanyProfile

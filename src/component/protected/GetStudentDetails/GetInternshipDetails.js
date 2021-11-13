import React, { useState } from 'react'
import firebase from '../../../firebase/firebase';

function GetInternshipDetails() {
    const [data, setData] = useState([]);
    // useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref('data/student/' + userId + '/internshipORworK')
        .once('value').then((snapshot, index) => {
            const dataList = []
            snapshot.forEach((childSnapshot) => {
                dataList.push(childSnapshot.val())
            })
            setData(dataList);
        }).catch((err) => {
            alert(err)
        })
    // }, []);


    return (
        <div>
            {(!data.length) ? (
                <p> Please fill your Details</p>
            ) : (
                <>
                    {data.map((single, index) => (
                        <div className="dataBox">
                            <ul className="getDetails">
                                <div className="internshipHeader">
                                    <div className="organizationName" key={single.index}>{single.Organization_Name}</div>
                                    <div> <span key={single.index}>({single.Starting_Month} </span>- <span key={single.index}>{single.Ending_Month})</span> </div>
                                </div>
                                <li>
                                    <span className="key"> Duration : </span>
                                    <span key={single.index}>{single.Duration} Months</span>
                                </li>
                                <li>
                                    <span className="key"> Location : </span>
                                    <span key={single.index}>{single.Location} Months</span>
                                </li>
                            </ul>
                        </div>

                    ))
                    }
                </>
            )
            }
        </div >
    )
}

export default GetInternshipDetails

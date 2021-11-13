import React, { useState } from 'react'
import firebase from '../../../firebase/firebase'

function GetTechnicalSkills(props) {
    const userId = firebase.auth().currentUser.uid;
    const [data, setData] = useState([]);

    firebase.database().ref('data/student/' + userId + '/technicalSkills')
        .once('value').then((snapshot) => {
            const dataList = []
            snapshot.forEach((childSnapshot) => {
                dataList.push(childSnapshot.val())
            })
            setData(dataList);
        }).catch((err) => {
            alert(err)
        })

    return (
        <div>
            {(!data.length) ? (
                <p> Please add your skills </p>
            ) : (
                <>
                    {data.map((single, index) => (
                        <>
                            <ul className="getDetails">
                                <li>
                                    <span className="key"> {single.Skill} : </span>
                                    <span className="value"> {single.Proficiency} </span>
                                </li>
                            </ul>
                        </>
                    ))}
                </>
            )
            }
        </div>
    )
}

export default GetTechnicalSkills

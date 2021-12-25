import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import firebase from '../../../../firebase/firebase'

function GetCompanySocialMedia() {
    const userId = firebase.auth().currentUser.uid;
    const [data, setData] = useState([]);

    useEffect(() => {
        firebase.database().ref('data/company/' + userId + '/socialAndContact')
            .once('value').then((snapshot) => {
                const dataList = []
                snapshot.forEach((childSnapshot) => {
                    dataList.push(childSnapshot.val())
                })
                setData(dataList);
            }).catch((err) => {
                alert(err)
            })
    })
    return (
        <div>
            {(!data.length) ? (
                <p> Please add your skills </p>
            ) : (
                <>
                    {data.map((single, index) => (
                        <>
                            <ul className="getDetails" key={index}>
                                <li className='buttons'>
                                    <span>
                                        <span className="key" > {single.handle} : </span>
                                        <span className="value"> {single.link} </span>
                                    </span>
                                    <Button variant="outlined" onClick={(() => {
                                        firebase.database().ref('data/company/' + userId + '/socialAndContact/' + single.handle).remove()
                                    })} > Delete </Button>
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

export default GetCompanySocialMedia

import React, { useState } from 'react'
import firebase from '../../../../firebase/firebase';
import '../../../../css/GetPersonalDetails.css'
function GetPersonalDetails() {
    const userId = firebase.auth().currentUser.uid;
    const [data, setData] = useState("");
    firebase.database().ref('data').child('student').child(userId).child("personalDetails")
            .once('value').then((snapshot) => {
                setData(snapshot.val());
            }).catch((err)=>{
                setData("Error to fetch data")
            })
    return (
        <div>
            {(data) ? (
            <ul className="getDetails">
                <li>
                    <span className="key"> Date of Birth : </span>
                    <span className="value"> {data.Date_of_Birth} </span>
                </li>
                <li>
                    <span className="key"> Gender : </span>
                    <span className="value"> {data.Gender} </span>
                </li>
                <li>
                    <span className="key"> Category : </span>
                    <span className="value"> {data.Category} </span>
                </li>
                <li>
                    <span className="key"> Pan Card number : </span>
                    <span className="value"> {data.Pan_card_number} </span>
                </li>
                <li>
                    <span className="key"> Aadhar card number : </span>
                    <span className="value"> {data.Aadhar_card_number} </span>
                </li>
                <li>
                    <span className="key"> SapId : </span>
                    <span className="value"> {data.SapId} </span>
                </li>
                <li>
                    <span className="key"> Domecile State : </span>
                    <span className="value"> {data.Domecile_State} </span>
                </li>
                <li>
                    <span className="key"> Skype Id : </span>
                    <span className="value"> {data.Skype_Id} </span>
                </li>
                <li>
                    <span className="key"> LinkedIn Id : </span>
                    <span className="value"> {data.LinkedIn_Id} </span>
                </li>
                <li>
                    <span className="key"> Github Id : </span>
                    <span className="value"> {data.Github_Id} </span>
                </li>
                <div className="partitionHeading">Family Details:</div>

                <li>
                    <span className="key"> Father's name : </span>
                    <span className="value"> {data.Fathers_name} </span>
                </li>
                <li>
                    <span className="key"> Father's email : </span>
                    <span className="value"> {data.Fathers_email} </span>
                </li>
                <li>
                    <span className="key"> Father's occupation : </span>
                    <span className="value"> {data.Fathers_occupation} </span>
                </li>
                <li>
                    <span className="key"> Father's organization : </span>
                    <span className="value"> {data.Fathers_organization} </span>
                </li>
                <li>
                    <span className="key"> Father's designation : </span>
                    <span className="value"> {data.Fathers_designation} </span>
                </li>
                <li>
                    <span className="key"> Mother's name : </span>
                    <span className="value"> {data.Mothers_name} </span>
                </li>
                <li>
                    <span className="key"> Mother's email : </span>
                    <span className="value"> {data.Mothers_email} </span>
                </li>
                <li>
                    <span className="key"> Mother's occupation : </span>
                    <span className="value"> {data.Mothers_occupation} </span>
                </li>
                <li>
                    <span className="key"> Mother's organization : </span>
                    <span className="value"> {data.Mothers_organization} </span>
                </li>
                <li>
                    <span className="key"> Mother's designation : </span>
                    <span className="value"> {data.Mothers_designation} </span>
                </li>
                <div className="partitionHeading">Contact Details:</div>

                <li>
                    <span className="key"> Mobile number : </span>
                    <span className="value"> {data.Mobile_number} </span>
                </li>
                <li>
                    <span className="key"> Alternate mobile number : </span>
                    <span className="value"> {data.Alternate_mobile_number} </span>
                </li>
                <li>
                    <span className="key"> Email address : </span>
                    <span className="value"> {data.Email_address} </span>
                </li>
                <li>
                    <span className="key"> Personal email address : </span>
                    <span className="value"> {data.Personal_email_address} </span>
                </li>
                <li>
                    <span className="key"> Alternate email address : </span>
                    <span className="value"> {data.Alternate_email_address} </span>
                </li>
                
                <div className="partitionHeading">Address:</div>
                <li>
                    <span className="key"> Current address line 1 : </span>
                    <span className="value"> {data.Current_address_line_one} </span>
                </li>
                <li>
                    <span className="key"> Current address line 2 : </span>
                    <span className="value"> {data.Current_address_line_two} </span>
                </li>
                <li>
                    <span className="key"> Current address City : </span>
                    <span className="value"> {data.Current_address_City} </span>
                </li>
                <li>
                    <span className="key"> Current address State : </span>
                    <span className="value"> {data.Current_address_State} </span>
                </li>
                <li>
                    <span className="key"> Current address Pin code : </span>
                    <span className="value"> {data.Current_address_Pin_code} </span>
                </li>
                <li>
                    <span className="key"> Permanent address line 1 : </span>
                    <span className="value"> {data.Permanent_address_line_one} </span>
                </li>
                <li>
                    <span className="key"> Permanent address line 2 : </span>
                    <span className="value"> {data.Permanent_address_line_two} </span>
                </li>
                <li>
                    <span className="key"> Permanent address City : </span>
                    <span className="value"> {data.Permanent_address_City} </span>
                </li>
                <li>
                    <span className="key"> Permanent State : </span>
                    <span className="value"> {data.Permanent_address_State} </span>
                </li>
                <li>
                    <span className="key"> Permanent PinCode : </span>
                    <span className="value"> {data.Permanent_address_Pin_code} </span>
                </li>
            </ul>
            ):(
                <p> Please fill your Details</p>
            )}
        </div>
    )
}

export default GetPersonalDetails

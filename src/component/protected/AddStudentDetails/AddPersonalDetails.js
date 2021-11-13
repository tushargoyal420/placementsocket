import React, { useState } from 'react'
import { MenuItem, TextField } from '@mui/material'
import '../../../css/AddDetails.css'
import Button from '@mui/material/Button';
import firebase from '../../../firebase/firebase'

function AddPersonalDetails() {
    const genderArray = [
        {
            label: "Male",
            value: "Male"
        },
        {
            label: "Female",
            value: "Female"
        },
        {
            label: "Other",
            value: "Other"
        }]
    const categoryArray = [
        {
            label: "General",
            value: "General"
        },
        {
            label: "OBC",
            value: "OBC"
        },
        {
            label: "SC",
            value: "SC"
        },
        {
            label: "ST",
            value: "ST"
        }]

    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [category, setCategory] = useState("");
    const [panCard, setPanCard] = useState("");
    const [aadharCard, setAadharCard] = useState("");
    const [sapId, setSapId] = useState("");
    const [domecileState, setDomecileState] = useState("");
    const [skypeId, setSkypeId] = useState("");
    const [linkedInId, setLinkedInId] = useState("");
    const [githubId, setGithubId] = useState("");
    const [fName, setFName] = useState("");
    const [fEmail, setFEmail] = useState("");
    const [fOccupation, setFOccupation] = useState("");
    const [fOrganization, setFOrganization] = useState("");
    const [fDesignation, setFDesignation] = useState("");

    const [mName, setMName] = useState("");
    const [mEmail, setMEmail] = useState("");
    const [mOccupation, setMOccupation] = useState("");
    const [mOrganization, setMOrganization] = useState("");
    const [mDesignation, setMDesignation] = useState("");

    const [mobileNumber, setMobileNumber] = useState("");
    const [altMobileNumber, setAltMobileNumber] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [personalEmailAddress, setPersonalEmailAddress] = useState("");
    const [altEmailAddress, setAltEmailAddress] = useState("");
    const [cAddressOne, setCAddressOne] = useState("");
    const [cAddressTwo, setCAddressTwo] = useState("");
    const [cCity, setCCity] = useState("");
    const [cState, setCState] = useState("");
    const [cPinCode, setCPinCode] = useState("");
    const [pAddressOne, setPAddressOne] = useState("");
    const [pAddressTwo, setPAddressTwo] = useState("");
    const [pCity, setPCity] = useState("");
    const [pState, setPState] = useState("");
    const [pPinCode, setPPinCode] = useState("");
    const timeStamp = Date();

    const submitDataa = ((event) => {
        event.preventDefault();
        const userId = firebase.auth().currentUser.uid;

        try {
            firebase.database().ref("data").child('student').child(userId).child('personalDetails').set({
                'Name': name,
                'Date_of_Birth': dateOfBirth,
                'Gender': gender,
                'Category': category,
                'Pan_card_number': panCard,
                'Aadhar_card_number': aadharCard,
                'SapId': sapId,
                'Domecile_State': domecileState,
                'Skype_Id': skypeId,
                'LinkedIn_Id': linkedInId,
                'Github_Id': githubId,
                'Fathers_name': fName,
                'Fathers_email': fEmail,
                'Fathers_occupation': fOccupation,
                'Fathers_organization': fOrganization,
                'Fathers_designation': fDesignation,
                'Mothers_name': mName,
                'Mothers_email': mEmail,
                'Mothers_occupation': mOccupation,
                'Mothers_organization': mOrganization,
                'Mothers_designation': mDesignation,
                'Mobile_number': mobileNumber,
                'Alternate_mobile_number': altMobileNumber,
                'Email_address': emailAddress,
                'Personal_email_address': personalEmailAddress,
                'Alternate_email_address': altEmailAddress,
                'Current_address_line_one': cAddressOne,
                'Current _address_line_two': cAddressTwo,
                'Current_address_City': cCity,
                'Current_address_State': cState,
                'Current_address_Pin_code': cPinCode,
                'Permanent_address_line_one': pAddressOne,
                'Permanent_address_line_two': pAddressTwo,
                'Permanent_address_City': pCity,
                'Permanent_address_State': pState,
                'Permanent_address_Pin_code': pPinCode,
                'UserType': "Student",
                'TimeStamp': timeStamp
            }).catch((err) => {
                alert(err.message)
            });
        } catch (err) {
            alert(err.message);
        }


    })
    return (
        <div className="backgroundPage">
            <div className="centerWholePage">
                <div className="centerPageHeading">Add/Edit Personal <span className="colorChange"> Details </span> </div>

                <ul className="headingul">
                    <div className="centerPageContent">
                        <section className="rowSection">
                            <form className="detailsForm" onSubmit={submitDataa}>
                                <div className="detailsSection">
                                    <TextField onChange={(e) => setName(e.target.value)} className="textField" id="standard-basic" type="text" label="Name" variant="standard" />
                                    <TextField onChange={(e) => setDateOfBirth(e.target.value)} className="textField" id="standard-number" type="date" label="Date of Birth" variant="standard" InputLabelProps={{ shrink: true, }} />
                                    <TextField onChange={(e) => setGender(e.target.value)} className="textField" select required="true" style={{ minWidth: '200px' }} variant="standard" value={gender} label="Gender" size="normal">{genderArray.map((option) => (<MenuItem key={option.value} size="normal" value={option.value}> {option.label}</MenuItem>))}</TextField>
                                    <TextField onChange={(e) => setCategory(e.target.value)} className="textField" select required="true" style={{ minWidth: '200px' }} variant="standard" value={category} label="Category" size="normal">{categoryArray.map((option) => (<MenuItem key={option.value} size="normal" value={option.value}> {option.label}</MenuItem>))}</TextField>
                                    <TextField onChange={(e) => setPanCard(e.target.value)} className="textField" id="standard-basic" label="Pan Card" variant="standard" />
                                    <TextField onChange={(e) => setAadharCard(e.target.value)} className="textField" id="standard-basic" label="Aadhar Card number" variant="standard" />
                                    <TextField onChange={(e) => setSapId(e.target.value)} className="textField" id="standard-basic" label="SapID" variant="standard" />
                                    <TextField onChange={(e) => setDomecileState(e.target.value)} className="textField" id="standard-basic" label="Domecile State" variant="standard" />
                                    <TextField onChange={(e) => setSkypeId(e.target.value)} className="textField" id="standard-basic" label="Skype ID" variant="standard" />
                                    <TextField onChange={(e) => setLinkedInId(e.target.value)} className="textField" id="standard-basic" label="Linkedin ID" variant="standard" />
                                    <TextField onChange={(e) => setGithubId(e.target.value)} className="textField" id="standard-basic" label="Github ID" variant="standard" />
                                </div>
                                <div className="partitionHeading">Family Details</div>
                                <div className="detailsSection">
                                    <TextField onChange={(e) => setFName(e.target.value)} className="textField" id="standard-basic" label="Father's name" variant="standard" />
                                    <TextField onChange={(e) => setFEmail(e.target.value)} className="textField" id="standard-basic" type="email" label="Father's email" variant="standard" />
                                    <TextField onChange={(e) => setFOccupation(e.target.value)} className="textField" id="standard-basic" label="Father's occupation" variant="standard" />
                                    <TextField onChange={(e) => setFOrganization(e.target.value)} className="textField" id="standard-basic" label="Father's organization" variant="standard" />
                                    <TextField onChange={(e) => setFDesignation(e.target.value)} className="textField" id="standard-basic" label="Father's Designation" variant="standard" />
                                    <TextField onChange={(e) => setMName(e.target.value)} className="textField" id="standard-basic" label="Mother's name" variant="standard" />
                                    <TextField onChange={(e) => setMEmail(e.target.value)} className="textField" id="standard-basic" type="email" label="Mother's email" variant="standard" />
                                    <TextField onChange={(e) => setMOccupation(e.target.value)} className="textField" id="standard-basic" label="Mother's occupation" variant="standard" />
                                    <TextField onChange={(e) => setMOrganization(e.target.value)} className="textField" id="standard-basic" label="Mother's organization" variant="standard" />
                                    <TextField onChange={(e) => setMDesignation(e.target.value)} className="textField" id="standard-basic" label="Mother's Designation" variant="standard" />
                                </div>
                                <div className="partitionHeading">Contact Details</div>
                                <div className="detailsSection">
                                    <TextField onChange={(e) => setMobileNumber(e.target.value)} className="textField" id="standard-basic" type="number" label="Mobile number" variant="standard" />
                                    <TextField onChange={(e) => setAltMobileNumber(e.target.value)} className="textField" id="standard-basic" type="number" label="Alternate Mobile number" variant="standard" />
                                    <TextField onChange={(e) => setEmailAddress(e.target.value)} className="textField" id="standard-basic" type="email" label="Email Address" variant="standard" />
                                    <TextField onChange={(e) => setPersonalEmailAddress(e.target.value)} className="textField" id="standard-basic" type="email" label="Personal Email Address" variant="standard" />
                                    <TextField onChange={(e) => setAltEmailAddress(e.target.value)} className="textField" id="standard-basic" type="email" label="Alternate Email Address" variant="standard" />
                                </div>
                                <div className="partitionHeading">Address Details</div>
                                <div className="partitionHeadingtwo">Current Address</div>
                                <div className="detailsSection">
                                    <TextField onChange={(e) => setCAddressOne(e.target.value)} className="textField" id="standard-basic" label="Addres 1" variant="standard" />
                                    <TextField onChange={(e) => setCAddressTwo(e.target.value)} className="textField" id="standard-basic" label="Address 2" variant="standard" />
                                    <TextField onChange={(e) => setCCity(e.target.value)} className="textField" id="standard-basic" label="City" variant="standard" />
                                    <TextField onChange={(e) => setCState(e.target.value)} className="textField" id="standard-basic" label="State" variant="standard" />
                                    <TextField onChange={(e) => setCPinCode(e.target.value)} className="textField" id="standard-basic" label="Pin code" variant="standard" />
                                </div>
                                <div className="partitionHeadingtwo">Permanent Address</div>
                                <div className="detailsSection">
                                    <TextField onChange={(e) => setPAddressOne(e.target.value)} className="textField" id="standard-basic" label="Address 1" variant="standard" />
                                    <TextField onChange={(e) => setPAddressTwo(e.target.value)} className="textField" id="standard-basic" label="Address 2" variant="standard" />
                                    <TextField onChange={(e) => setPCity(e.target.value)} className="textField" id="standard-basic" label="City" variant="standard" />
                                    <TextField onChange={(e) => setPState(e.target.value)} className="textField" id="standard-basic" label="State" variant="standard" />
                                    <TextField onChange={(e) => setPPinCode(e.target.value)} className="textField" id="standard-basic" label="Pin code" variant="standard" />
                                </div>
                                <Button className='submitButton' type="submit" variant="contained" >Submit Details</Button>
                                {/* <button >Submit</button> */}
                            </form>
                        </section>
                    </div>
                </ul>
            </div>
        </div>)
}

export default AddPersonalDetails

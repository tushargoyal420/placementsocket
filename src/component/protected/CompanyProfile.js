import React, { useEffect, useState } from "react";
import firebase from "firebase";
import Button from '@mui/material/Button';
import addImageIcon from '../../img/addImageIcon.png'
import '../../css/CompanyProfile.css'
import AddCompanySocialMedia from "./Company/AddCompanyDetails/AddCompanySocialMedia";
import AddJobProfiles from "./Company/AddCompanyDetails/AddJobProfiles";
import AddAboutCompany from "./Company/AddCompanyDetails/AddAboutCompany";

import GetCompanySocialMedia from "./Company/GetCompanyDetails/GetCompanySocialMedia";
import GetJobProfiles from "./Company/GetCompanyDetails/GetJobProfiles";
import GetAboutCompany from "./Company/GetCompanyDetails/GetAboutCompany";
import GetCompanyProfile from "./Company/GetCompanyDetails/GetCompanyProfile";



function CompanyProfile() {
    
    const [imagePop, setImagePop] = useState(false);
    const popUpClose = (() => {
        setAboutPop(false)
        setJobPop(false)
        setSocialPop(false)
        setImagePop(false)
    })
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [downloadImage, setDownloadImage] = useState({ preview: "", raw: "" });
    const timeStamp = Date();
    const [aboutPop, setAboutPop] = useState(false);
    const [jobPop, setJobPop] = useState(false);
    const [socialPop, setSocialPop] = useState(false);
    
    function closePopupFunc(){
        setAboutPop(false)
        setJobPop(false)
        setSocialPop(false)
        setImagePop(false)
    } 
    useEffect(() => {
        try {
            const userId = firebase.auth().currentUser.uid;

            firebase.storage().ref('images').child('company/' + userId + "/companyImage").getDownloadURL().then((url) => (
                setDownloadImage(url)
            )).catch((err) => {
                setDownloadImage(null)
            })

        } catch (err) {
            setDownloadImage(null)
        }

    }, [])
    const imagePopUp = (() => {
        setImagePop(true)
    })
    const close = (() => {
        setImagePop(false)
    })

    const selectImage = e => {

        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };

    const uploadImage = (() => {
        try {
            const userId = firebase.auth().currentUser.uid;
            firebase.storage().ref('images').child('company/' + userId + "/companyImage").put(image.raw).then(
                () => {
                    firebase.database().ref("data").child('company/' + userId + '/companyImage').set({
                        'companyImage': 'Uploaded',
                        "timeStamp": timeStamp
                    })
                        .catch((err) => (alert(err)))
                    setImage('')
                    setImagePop(false)

                }).catch((err) => (alert(err)))
        } catch (err) {
            alert(err)
        }
    })
    const clearImage = (() => {
        setImage('')
    })
    const aboutPopUp = (() => {
        setAboutPop(true)
    })
    const jobPopUp = (() => {
        setJobPop(true)
    })
    const socialPopUp = (() => {
        setSocialPop(true)
    })

    const DataToPrint = [
        {
            sectionHeading: 'About',
            pop: aboutPopUp,
            buttonName: 'Add/Edit details',
            getDataPageLink: <GetAboutCompany />
        },

        {
            sectionHeading: 'Job Profiles',
            pop: jobPopUp,
            buttonName: 'Add job',
            getDataPageLink: <GetJobProfiles />
        },

        {
            sectionHeading: 'Social Media',
            pop: socialPopUp,
            buttonName: 'Edit details',
            getDataPageLink: <GetCompanySocialMedia />
        },
    ]

    const allPop = [
        {
            headText: "Add About",
            pop: aboutPop,
            component: <AddAboutCompany closePopup={closePopupFunc} />
        },
        {
            headText: "Add Job profiles",
            pop: jobPop,
            component: <AddJobProfiles closePopup={closePopupFunc} />
        },
        {
            headText: "Add Social media",
            pop: socialPop,
            component: <AddCompanySocialMedia />
        },
    ]
    return (
        <>
            {allPop.map((data, index) => (
                (data.pop) ?
                    (
                        <div key={index} className="forPopUp">
                            <div className="popUp">
                                <div className="topdiv">
                                    <span className="headingText">{data.headText} </span>
                                    <Button className= "closeButton" variant="contained" key={index} onClick={popUpClose}> X </Button>
                                </div>
                                <div className="conentBox" >
                                    {data.component}
                                </div>
                                <div className="submitButtonBox">
                                </div>
                            </div>
                        </div>
                    ) : (<></>)
            ))}


            {(imagePop) ? (
                <div className="forPopUp">
                    <div className="popUp">
                        <div className="closeButtonBox">
                            <Button className="closeButton" variant="contained" onClick={close}> X </Button>
                        </div>
                        <div className="imageBox">
                            <label htmlFor="upload-button">
                                {image.preview ?
                                    <img src={image.preview} alt="imagePreview" style={{ height: '100%' }} />
                                    : (
                                        <img style={{ height: '100%' }} src={addImageIcon} alt="profile" />
                                    )}
                            </label>
                            <input type="file" id="upload-button" style={{ display: 'none' }} onChange={selectImage} />
                        </div>
                        <div className="submitButtonBox">
                            <Button variant="contained" onClick={clearImage}> Clear Image</Button>
                            <Button variant="contained" onClick={uploadImage}> Submit Image</Button>
                        </div>
                    </div>
                </div>
            ) : (
                <p></p>
            )}
            <div className="backgroundPage">
                <div className="centerWholePage">
                    <div className="centerPageHeading">Company <span className="colorChange"> Profile</span> </div>
                    <ul className="headingul">
                        <div className="centerPageContent" style={{ borderRadius: '0px' }}>
                            <section className="CompanyProfileRowSectionOne">
                                <div className="companyProfileImageDiv">
                                    {downloadImage ? (
                                        <div className="companyImage" style={{ backgroundImage: `url(${downloadImage})` }} >
                                        </div>
                                        // <img src={downloadImage} alt="Loading." className="companyImage" style={{width:'100%' }} />
                                    ) : (
                                        <div className="companyImage">
                                            <Button onClick={imagePopUp}>  Add Image </Button>
                                        </div>
                                    )}
                                </div>
                                <div className="CompanyNameDiv">
                                    <GetCompanyProfile />
                                    {/* Spade EMS */}
                                </div>
                            </section>
                        </div>
                    </ul>

                    {DataToPrint.map((data, index) => (
                        <ul className="headingul" key={index}>
                            <div className="centerPageContent" key={index} style={{ borderRadius: '0px' }}>
                                <section className="profileRowSectionDetails" key={index}  >
                                    <div className="detailsHeading" >
                                        <span className="detailsHeadingName" key={index}>
                                            {data.sectionHeading}
                                        </span>
                                        <span className="editButton">
                                            <Button variant="outlined" key={index} onClick={data.pop} > {data.buttonName}</Button>
                                        </span>
                                    </div>
                                    <div className="details" key={index}>{data.getDataPageLink} </div>
                                </section>
                            </div>
                        </ul>
                    ))}

                </div>
            </div >
        </>
    )
}

export default CompanyProfile

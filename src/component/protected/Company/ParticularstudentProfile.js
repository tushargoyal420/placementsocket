import React, { useEffect, useState } from 'react'
import firebase from '../../../firebase/firebase'

function ParticularstudentProfile() {
    const LocalKey = localStorage.getItem('ParticularStudentId')
    const [gettingKey, setgettingKey] = useState(LocalKey)
    const userId = gettingKey.replace(/['"]+/g, '');

    const [personalDetails, setPersonalDetails] = useState([])
    const [profilePic, setProfilePic] = useState([])
    const [graduation, setGraduation] = useState([])
    const [secondary, setSecondary] = useState([])
    const [seniorSecondary, setSeniorSetsecondary] = useState([])
    const [work, setWork] = useState([])
    const [imageUrl, setImageUrl] = useState()
    useEffect(() => {
        firebase.database().ref('data').child('student').child(userId)
            .once('value').then((snapshot) => {
                setPersonalDetails(snapshot.child('personalDetails').val())
                if (snapshot.child('profilePicture').child('profileImage').val() === "Uploaded") {
                    setProfilePic(snapshot.child('profilePicture').val())
                    firebase.storage().ref('images').child('student/' + userId + "/profileImage").getDownloadURL()
                        .then((url) => {
                            setImageUrl(url)
                        }).catch((err) => (
                            setImageUrl(null)
                        ))
                }
                setGraduation(snapshot.child('educationDetails/graduation').val())
                setSecondary(snapshot.child('educationDetails/secondary').val())
                setSeniorSetsecondary(snapshot.child('educationDetails/seniorSecondary').val())
                const worklist = []
                snapshot.child('internshipORworK').forEach((singleWork, index) => {
                    worklist.push(singleWork.val())
                })
                setWork(worklist)

                // console.log(worklist)
            }).catch((err) => {
                alert("Graduation data is not available")
            })
    }, [])
    return (
        <div className="backgroundPage">
            <div className="centerWholePage">
                <div className="centerPageHeading">Student <span className="colorChange"> Profile </span> </div>
                <ul className="headingul">
                    <div className="centerPageContent" style={{ borderRadius: '0px' }}>

                        {(profilePic) ? (
                            <section className="profileRowSectionOne">
                                <div className="profileUserNameDiv">
                                    <div className="userName">{personalDetails.Name}</div>
                                    <ul className="profileUserDetailsList">
                                        <ul className="getDetails">
                                            <li>
                                                <span className="value"> {personalDetails.userType} </span>
                                            </li>
                                            <li>
                                                <span className="value"> {personalDetails.SapId} </span>
                                            </li>
                                            <li>
                                                <span className="value"> {personalDetails.Email_address} </span>
                                            </li>
                                        </ul>
                                    </ul>


                                </div>
                                <div className="profileImageDiv">
                                    {(imageUrl) ? (
                                        <img src={imageUrl} alt="Loading." style={{ height: '100%' }} />
                                    ) : (
                                        <p>Wait</p>
                                    )}
                                </div>
                            </section>
                        ) : (
                            <p> Student have not uploaded image </p>
                        )
                        }

                        {(personalDetails)
                            ? (
                                <section className="profileRowSectionDetails">
                                    <div className="detailsHeading">
                                        <span className="detailsHeadingName">
                                            Personal Details
                                        </span>
                                    </div>
                                    <div className="details" >
                                        <div className="dataBox">
                                            <ul className="getDetails">
                                                <li>
                                                    <span className="key"> Date of Birth : </span>
                                                    <span className="value"> {personalDetails.Date_of_Birth} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Gender : </span>
                                                    <span className="value"> {personalDetails.Gender} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Category : </span>
                                                    <span className="value"> {personalDetails.Category} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Pan Card number : </span>
                                                    <span className="value"> {personalDetails.Pan_card_number} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Aadhar card number : </span>
                                                    <span className="value"> {personalDetails.Aadhar_card_number} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> SapId : </span>
                                                    <span className="value"> {personalDetails.SapId} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Domecile State : </span>
                                                    <span className="value"> {personalDetails.Domecile_State} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Skype Id : </span>
                                                    <span className="value"> {personalDetails.Skype_Id} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> LinkedIn Id : </span>
                                                    <span className="value"> {personalDetails.LinkedIn_Id} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Github Id : </span>
                                                    <span className="value"> {personalDetails.Github_Id} </span>
                                                </li>
                                                <div className="partitionHeading">Family Details:</div>

                                                <li>
                                                    <span className="key"> Father's name : </span>
                                                    <span className="value"> {personalDetails.Fathers_name} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Father's email : </span>
                                                    <span className="value"> {personalDetails.Fathers_email} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Father's occupation : </span>
                                                    <span className="value"> {personalDetails.Fathers_occupation} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Father's organization : </span>
                                                    <span className="value"> {personalDetails.Fathers_organization} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Father's designation : </span>
                                                    <span className="value"> {personalDetails.Fathers_designation} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Mother's name : </span>
                                                    <span className="value"> {personalDetails.Mothers_name} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Mother's email : </span>
                                                    <span className="value"> {personalDetails.Mothers_email} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Mother's occupation : </span>
                                                    <span className="value"> {personalDetails.Mothers_occupation} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Mother's organization : </span>
                                                    <span className="value"> {personalDetails.Mothers_organization} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Mother's designation : </span>
                                                    <span className="value"> {personalDetails.Mothers_designation} </span>
                                                </li>
                                                <div className="partitionHeading">Contact Details:</div>

                                                <li>
                                                    <span className="key"> Mobile number : </span>
                                                    <span className="value"> {personalDetails.Mobile_number} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Alternate mobile number : </span>
                                                    <span className="value"> {personalDetails.Alternate_mobile_number} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Email address : </span>
                                                    <span className="value"> {personalDetails.Email_address} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Personal email address : </span>
                                                    <span className="value"> {personalDetails.Personal_email_address} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Alternate email address : </span>
                                                    <span className="value"> {personalDetails.Alternate_email_address} </span>
                                                </li>

                                                <div className="partitionHeading">Address:</div>
                                                <li>
                                                    <span className="key"> Current address line 1 : </span>
                                                    <span className="value"> {personalDetails.Current_address_line_one} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Current address line 2 : </span>
                                                    <span className="value"> {personalDetails.Current_address_line_two} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Current address City : </span>
                                                    <span className="value"> {personalDetails.Current_address_City} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Current address State : </span>
                                                    <span className="value"> {personalDetails.Current_address_State} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Current address Pin code : </span>
                                                    <span className="value"> {personalDetails.Current_address_Pin_code} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Permanent address line 1 : </span>
                                                    <span className="value"> {personalDetails.Permanent_address_line_one} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Permanent address line 2 : </span>
                                                    <span className="value"> {personalDetails.Permanent_address_line_two} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Permanent address City : </span>
                                                    <span className="value"> {personalDetails.Permanent_address_City} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Permanent State : </span>
                                                    <span className="value"> {personalDetails.Permanent_address_State} </span>
                                                </li>
                                                <li>
                                                    <span className="key"> Permanent PinCode : </span>
                                                    <span className="value"> {personalDetails.Permanent_address_Pin_code} </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>
                            ) : (
                                <p>Failed to load</p>
                            )
                        }

                        {(graduation) ? (
                            <section className="profileRowSectionDetails">
                                <div className="detailsHeading">
                                    <span className="detailsHeadingName">
                                        Graduation Details
                                    </span>
                                </div>
                                <div className="details">
                                    <div className="dataBox">

                                        <ul className="getDetails">
                                            <div className="internshipHeader">
                                                <div className="organizationName">{graduation.College}</div>
                                                <div> <span >( {graduation.Starting_Month} {graduation.Starting_Year} </span>- <span >{graduation.Ending_Month} {graduation.Ending_Year})</span> </div>
                                            </div>
                                            <div className="secondBox">
                                                <div>
                                                    <li>
                                                        <span className="key"> Course: </span>
                                                        <span className="value"> {graduation.Course} </span>
                                                    </li>

                                                    <li>
                                                        <span className="key"> Degree : </span>
                                                        <span >{graduation.Degree} </span>
                                                    </li>
                                                    <li>
                                                        <span className="key"> Stream : </span>
                                                        <span >{graduation.Stream} </span>
                                                    </li>
                                                    <li>
                                                        <span className="key"> Specialization : </span>
                                                        <span >{graduation.Specialization} </span>
                                                    </li>

                                                    <li>
                                                        <span className="key"> Backlogs: </span>
                                                        <span className="value"> {graduation.Backlogs} </span>
                                                    </li>
                                                    <li>
                                                        <span className="key"> Roll No: </span>
                                                        <span className="value"> {graduation.RollNo} </span>
                                                    </li>
                                                </div>
                                                <div className="percentage"> {graduation.Percentage}% </div>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                        ) : (
                            <p>Failed to load</p>
                        )}


                        {(secondary) ? (
                            <section className="profileRowSectionDetails">
                                <div className="detailsHeading">
                                    <span className="detailsHeadingName">
                                        Secondary school Details
                                    </span>
                                </div>
                                <div className="details">
                                    <div className="dataBox">

                                        <ul className="getDetails">
                                            <div className="internshipHeader">
                                                <div className="organizationName">{secondary.School_Name}</div>
                                                <div> <span >({secondary.Starting_Year} </span>- <span >{secondary.Ending_Year})</span> </div>
                                            </div>
                                            <div className="secondBox">
                                                <div>
                                                    <li>
                                                        <span className="key"> Board: </span>
                                                        <span >{secondary.Board} </span>
                                                    </li>
                                                    <li>
                                                        <span className="key"> Type: </span>
                                                        <span className="value"> {secondary.Type} </span>
                                                    </li>
                                                </div>

                                                <div className="percentage"> {secondary.Percentage}% </div>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                        ) : (
                            <p>Failed to load</p>
                        )}

                        {(seniorSecondary) ? (
                            <section className="profileRowSectionDetails">
                                <div className="detailsHeading">
                                    <span className="detailsHeadingName">
                                        Senior Secondary school Details
                                    </span>
                                </div>
                                <div className="details">
                                    <div className="dataBox">

                                        <ul className="getDetails">
                                            <div className="internshipHeader">
                                                <div className="organizationName">{seniorSecondary.School_Name}</div>
                                                <div> <span >({seniorSecondary.Starting_Year} </span>- <span >{seniorSecondary.Ending_Year})</span> </div>
                                            </div>
                                            <div className="secondBox">
                                                <div>
                                                    <li>
                                                        <span className="key"> Board: </span>
                                                        <span >{seniorSecondary.Board} </span>
                                                    </li>
                                                    <li>
                                                        <span className="key"> Type: </span>
                                                        <span className="value"> {seniorSecondary.Type} </span>
                                                    </li>
                                                </div>

                                                <div className="percentage"> {seniorSecondary.Percentage}% </div>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                        ) : (
                            <p>Failed to load</p>
                        )}
                        <section className="profileRowSectionDetails">
                            <div className="detailsHeading">
                                <span className="detailsHeadingName">
                                    Senior Secondary school Details
                                </span>
                            </div>
                            <div className="details">

                                {(!work.length) ? (
                                    <p> Please fill your Details</p>
                                ) : (
                                    <>
                                        {work.map((single, index) => (
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
                                                        <span key={single.index}>{single.Location}</span>
                                                    </li>
                                                </ul>
                                            </div>

                                        ))
                                        }
                                    </>
                                )
                                }
                            </div>
                        </section>

                    </div>
                </ul>

            </div >
        </div >
    )
}

export default ParticularstudentProfile

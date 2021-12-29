import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router';
import NavbarTwo from '../../navbar/NavbarTwo';
import Home from '../../pages/Home';
import About from '../../pages/About';
import Contact from '../../pages/Contact';
import StudentProfile from '../StudentProfile';
import AddPersonalDetails from '../Student/AddStudentDetails/AddPersonalDetails'
import AddGraduationDetails from '../Student/AddStudentDetails/sub_EducationDetails/AddGraduationDetails';
import AddSeniorSecondaryDetails from '../Student/AddStudentDetails/sub_EducationDetails/AddSeniorSecondaryDetails';
import AddSecondaryDetails from '../Student/AddStudentDetails/sub_EducationDetails/AddSecondaryDetails';
import AddInternshipDetails from '../Student/AddStudentDetails/AddInternshipDetails'
import AddTechnicalSkills from '../Student/AddStudentDetails/AddTechnicalSkills';
import firebase from '../../../firebase/firebase';
import CompanyProfile from '../CompanyProfile';
import CollegeProfile from '../CollegeProfile';
import ApplyForCompany from '../ApplyForCompany'
import StudentStatus from '../Student/StudentStatus';
import ApplicationDetails from '../Student/ApplicationDetails';
import CheckJobProfilesStatus from '../Company/CheckJobProfilesStatus';
import ParticularstudentProfile from '../Company/ParticularstudentProfile';
import AllDetails from '../AllDetails';

function ProtectedRoute() {
    const [currentUserType, setCurrentUserType] = useState('')
    useEffect(() => {
        const userId = firebase.auth().currentUser.uid;
        firebase.database().ref('typeList').child(userId).once('value').then((snapshot, index) => {
            var usertype = snapshot.val();
            setCurrentUserType(usertype.type)
        })
    }, [currentUserType]);

    return (
        <div className="protectedRoute">
            <NavbarTwo />
            <Switch>
                <Route exact path="/" component={(() => (
                    <Home type={currentUserType} />
                ))} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/addPersonalDetails" component={AddPersonalDetails} />
                <Route exact path="/addGraduationDetails" component={AddGraduationDetails} />
                <Route exact path="/addSeniorSecondaryDetails" component={AddSeniorSecondaryDetails} />
                <Route exact path="/addSecondaryDetails" component={AddSecondaryDetails} />
                <Route exact path="/addInternshipDetails" component={AddInternshipDetails} />
                <Route exact path="/addTechnicalSkills" component={AddTechnicalSkills} />
                {currentUserType === "student" ? (
                    <>
                        <Route exact path="/profile" component={StudentProfile} />
                        <Route exact path="/apply" component={ApplyForCompany} />
                        <Route exact path="/status" component={StudentStatus} />
                        <Route exact path="/ApplicationDetails" component={ApplicationDetails} />
                    </>
                ) :
                    currentUserType === "company" ?
                        (
                            <>
                                <Route exact path="/profile" component={CompanyProfile} />
                                <Route exact path="/checkStatus" component={CheckJobProfilesStatus} />
                                <Route exact path="/particularstudentProfile" component={ParticularstudentProfile} />
                            </>
                        ) :
                        currentUserType === "college" ? (
                            <Route exact path="/allDetails" component={AllDetails} />
                            ) : (
                            <></>
                        )
                }

            </Switch>
        </div>
    )
}

export default ProtectedRoute

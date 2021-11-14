import React from 'react'
import { Route, Switch } from 'react-router';
import NavbarTwo from '../../navbar/NavbarTwo';
import Home from '../../pages/Home';
import About from '../../pages/About';
import Contact from '../../pages/Contact';
import Profile from '../Profile';
import AddPersonalDetails from '../AddStudentDetails/AddPersonalDetails'
import AddGraduationDetails from '../AddStudentDetails/sub_EducationDetails/AddGraduationDetails';
import AddSeniorSecondaryDetails from '../AddStudentDetails/sub_EducationDetails/AddSeniorSecondaryDetails';
import AddSecondaryDetails from '../AddStudentDetails/sub_EducationDetails/AddSecondaryDetails';
import AddInternshipDetails from '../AddStudentDetails/AddInternshipDetails'
import AddTechnicalSkills from '../AddStudentDetails/AddTechnicalSkills';
import AddProfileImage from '../AddStudentDetails/AddProfileImage';

function ProtectedRoute() {
    return (
        <div className="protectedRoute">
            <NavbarTwo/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/addPersonalDetails" component={AddPersonalDetails} />
                <Route exact path="/addGraduationDetails" component={AddGraduationDetails} />
                <Route exact path="/addSeniorSecondaryDetails" component={AddSeniorSecondaryDetails} />
                <Route exact path="/addSecondaryDetails" component={AddSecondaryDetails} />
                <Route exact path="/addInternshipDetails" component={AddInternshipDetails} />
                <Route exact path="/addTechnicalSkills" component={AddTechnicalSkills} />
                <Route exact path="/addProfileImage" component={AddProfileImage} />
            </Switch>
        </div>
    )
}

export default ProtectedRoute

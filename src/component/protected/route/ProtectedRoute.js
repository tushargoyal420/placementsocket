import React from 'react'
import { Route, Switch } from 'react-router';
import NavbarTwo from '../../navbar/NavbarTwo';
import Home from '../../pages/Home';
import About from '../../pages/About';
import Contact from '../../pages/Contact';
import Profile from '../Profile';
import AddPersonalDetails from '../../small/StudentProfileDetails/AddPersonalDetails'
import AddGraduationDetails from '../../small/StudentProfileDetails/sub_EducationDetails/AddGraduationDetails';
import AddSeniorSecondaryDetails from '../../small/StudentProfileDetails/sub_EducationDetails/AddSeniorSecondaryDetails';
import AddSecondaryDetails from '../../small/StudentProfileDetails/sub_EducationDetails/AddSecondaryDetails';

function ProtectedRoute() {
    return (
        <div>
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
            </Switch>
        </div>
    )
}

export default ProtectedRoute

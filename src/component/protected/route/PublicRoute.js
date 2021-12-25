import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import NavbarOne from '../../navbar/NavbarOne';
import Signup from '../../pages/Signup';
import Signin from '../../pages/Signin';
import Home from '../../pages/Home';
import About from '../../pages/About';
import Contact from '../../pages/Contact';

function PublicRoute() {
    return (
        <div>
            <NavbarOne/>
            <Switch>
                {/* <Route exact path="/" component={Home} /> */}
                <Route exact path="/about" component={About} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/" component={Signup} />
                <Redirect to="/"/>
            </Switch>
        </div>
    )
}

export default PublicRoute

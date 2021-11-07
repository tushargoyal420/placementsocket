import React from 'react';
import NavbarOne from '../component/navbar/NavbarOne';
import { Redirect, Route, Switch } from 'react-router';
import Home from '../component/Home';
import About from '../component/About';
import Contact from '../component/Contact';
import Signup from '../component/Signup';
import Signin from '../component/Signin';

function PublicRoute() {
    return (
        <div>
            <NavbarOne/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={Signup} />
                <Redirect to="/"/>
            </Switch>
        </div>
    )
}

export default PublicRoute

import React from 'react'
import { Route, Switch } from 'react-router';
import NavbarTwo from '../component/navbar/NavbarTwo';
import Home from '../component/Home';
import About from '../component/About';
import Contact from '../component/Contact';
import Profile from '../component/protected/Profile';

function ProtectedRoute() {
    return (
        <div>
            <NavbarTwo/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/profile" component={Profile} />
            </Switch>
        </div>
    )
}

export default ProtectedRoute

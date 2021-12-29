import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from '@mui/material/Button';
import "../../css/Navbar.css"
import logo from '../../img/logo/logo_onlyname.png'
import firebase from '../../firebase/firebase'

function NavbarTwo() {
    const [currentUserType, setCurrentUserType] = useState('')
    useEffect(() => {
        const userId = firebase.auth().currentUser.uid;
        firebase.database().ref('typeList').child(userId).once('value').then((snapshot, index) => {
            var usertype = snapshot.val();
            setCurrentUserType(usertype.type)
        })
    }, [currentUserType]);
    return (
        <nav className="navbar fixed-top navbar-expand-lg fixed navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink exact to='/' className="navbar-brand">

                    <img src={logo} alt="Logo" className="logoImage" />

                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav tocenter">
                        <li className="nav-item">
                            <NavLink exact to='/' className="nav-link" aria-current="page" > Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to='/about' className="nav-link" aria-current="page" > About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to='/contact' className="nav-link" aria-current="page" > Contact </NavLink>
                        </li>

                        {currentUserType === 'student' ? (
                            <>
                                < li className="nav-item">
                                    <NavLink exact to='/status' className="nav-link" aria-current="page" > Status</NavLink>
                                </li>
                                <li className="nav-item right">
                                    <Button component={Link} to="/profile" id='onlyBorderButton' variant="outlined">Profile</Button>
                                </li>

                            </>
                        ) : (currentUserType === 'college') ? (
                            < li className="nav-item">
                            <NavLink exact to='/allDetails' className="nav-link" aria-current="page" > Details</NavLink>
                        </li>
                        ) : (
                            <>
                                <li className="nav-item right">
                                    <Button component={Link} to="/profile" id='onlyBorderButton' variant="outlined">Profile</Button>
                                </li>

                            </>
                        )}
                        <li className="nav-item right">
                            <Button id='withBackgroundButton'
                                onClick={() => firebase.auth().signOut()} variant="contained">Sign out</Button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >

    )
}

export default NavbarTwo

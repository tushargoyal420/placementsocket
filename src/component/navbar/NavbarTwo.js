import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from '@mui/material/Button';
import "../../css/Navbar.css"

function NavbarOne() {

    return (
        <div classsName="n">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink exact to='/' className="navbar-brand"> Placement Socket</NavLink>
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
                            <li className="nav-item right">
                                <Button className='profileButton' component={Link} to="/profile" variant="contained">Profile</Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default NavbarOne

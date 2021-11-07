import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/auth";
import firebase from "../firebase/firebase";


function Dashboard() {
    const { currentUser } = useContext(AuthContext);
    if (!currentUser) {
        return <Redirect to="/signup" />;
    }
    return (
        <div>
            <h1>Profile</h1>
            <p>This is the profile, if you can see this you're logged in.</p>
            <button onClick={() => firebase.auth().signOut()}>Sign out</button>
        </div>
    )
}

export default Dashboard

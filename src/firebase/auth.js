import React, { useEffect, useState } from "react";
import LoadingPage from "../component/small/LoadingPage";
import firebase from "./firebase";
export const AuthContext = React.createContext();

function loadingTimer(setLoading) {
  setTimeout(() => setLoading(false)
    , 2000);
}

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      loadingTimer(setLoading);
    });
  }, []);
  if (loading) {
    // return <p>Loading...</p>;
    return <LoadingPage />;
  }
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
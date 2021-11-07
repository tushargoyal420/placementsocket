import React, { useContext } from "react";
import './App.css';
import { Route, Switch } from 'react-router';
import "./css/GlobalStyle.css"
import { AuthContext } from "./firebase/auth";
import ProtectedRoute from "./route/ProtectedRoute";
import PublicRoute from "./route/PublicRoute";
import Footer from "./component/footer/Footer";

function App(props) {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      {currentUser ? (
        <Switch>
          <Route path="/" component={ProtectedRoute} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" component={PublicRoute} />
        </Switch>
      )}
      <Footer/>
    </div>
  );
}

export default App;
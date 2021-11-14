import React, { useContext } from "react";
import { Route, Switch } from 'react-router';
import "./css/GlobalStyle.css"
import { AuthContext } from "./firebase/auth";
import ProtectedRoute from "./component/protected/route/ProtectedRoute";
import PublicRoute from "./component/protected/route/PublicRoute";
import Footer from "./component/footer/Footer";
import "./css/Responsive.css";

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
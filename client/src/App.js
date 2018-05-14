import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import CreateProfile from "./components/create-profile/CreateProfile";
import { Provider } from "react-redux";
import PrivateRoute from "./components/common/PrivateRoute";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearProfile } from "./actions/profileActions";
import store from "./store";
import "./App.css";

// check token
if (localStorage.getItem("token")) {
  // set auth token header
  setAuthToken(localStorage.getItem("token"));
  const decoded = jwt_decode(localStorage.getItem("token"));
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile
    store.dispatch(clearProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/createprofile"
                  component={CreateProfile}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

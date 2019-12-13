import React, { Component, Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import { render } from "react-dom";
import Login from './views/authentication/Login';
import SignUp from './views/authentication/Signup';
import Profile from './views/Profile';
import EditProfile from './views/EditProfile';
import Navbar from './components/Navbar';
import ProtectedRoute from './services/ProtectedRoute'

// when we want to add this
// import ProtectedRoute from './components/ProtectedRoute';

// import { loadUser as loadUser } from './services/authentication';

import HomeView from "./views/Homeview";
import SearchView from "./views/SearchView";
import ThemeView from "./views/ThemeView";
import { loadUserInformation as loadUserInformationService } from './services/authentication';


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loaded: false
    };
    this.loadUserInformation=this.loadUserInformation.bind(this);
    this.verifyAuthentication=this.verifyAuthentication.bind(this);
  }

  async loadUserInformation() {
    try {
      const user = await loadUserInformationService();
      this.setState({
        user,
        loaded: true
      });
      console.log('I loaded the user information', user);
    } catch (error) {
      console.log('couldnt load user information in App.jsx due to', error);
    }
  }

  async componentDidMount() {
    this.loadUserInformation();
  };

  verifyAuthentication() {
    return this.state.user;
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <Navbar
            user={this.state.user}
            loadUserInformation={this.loadUserInformation}
          />
          <Route path="/signup" render={(props) => <SignUp {...props} loadUserInformation={this.loadUserInformation}/>} />
          <Route path="/login" render={(props) => <Login {...props} loadUserInformation={this.loadUserInformation}/>} />
          <ProtectedRoute
                path="/profile"
                exact
                render={props => <Profile {...props} user={this.state.user} />}
                verify={this.verifyAuthentication}
                redirect="/"
              />
          <Route path="/themes" exact component={ThemeView} />
          <Route path="/" exact component={HomeView} />
          <Redirect to="/" />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;


/*
    <ProtectedRoute
                path="/profile/edit"
                render={props => <EditProfile {...props} user={this.state.user} loadUserInformation={this.loadUserInformation} />}
                verify={this.verifyAuthentication}
                redirect="/"
              />
              */
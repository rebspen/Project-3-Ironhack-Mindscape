import React, { Component, Fragment } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import { render } from "react-dom";
import Login from './views/authentication/Login';
import SignUp from './views/authentication/Signup';
import Profile from './views/Profile';
import EditProfile from './views/EditProfile';
import Navbar from './components/Navbar';
import ProtectedRoute from './services/ProtectedRoute';
import HomeView from "./views/Homeview";
import SearchView from "./views/SearchView";
import ThemeView from "./views/ThemeView";
import { loadUserInformation as loadUserInformationService } from './services/authentication';

import SingleView from "./views/SingleView";
import Bookshelf from './views/Bookshelf';
import ShelfSingleBook from './views/ShelfSingleBook';
import InfoView from "./views/InfoView";
import SingleSearch from "./views/SingleSearch";


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
      return user
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
          {this.state.loaded && 
          <Switch>
          <Route path="/signup" render={(props) => <SignUp {...props}  loadUserInformation={this.loadUserInformation}/>} />
          <Route path="/login" render={(props) => <Login {...props} user={this.state.user} loadUserInformation={this.loadUserInformation}/>} />
          <ProtectedRoute
                path="/profile-edit"
                exact
                render={props => <EditProfile {...props} user={this.state.user} loadUserInformation={this.loadUserInformation} />}
                verify={this.verifyAuthentication}
                redirect="/"
              />
          <ProtectedRoute
                path="/profile/:id"
               // exact
                render={props => <Profile {...props} user={this.state.user} />}
                verify={this.verifyAuthentication}
                redirect="/"
              />
          <ProtectedRoute
                path="/bookshelf"
                exact
                render={props => <Bookshelf {...props} user={this.state.user} />}
                verify={this.verifyAuthentication}
                redirect="/"
              />
          <ProtectedRoute
                path="/shelf/:id"
                exact
                render={props => <ShelfSingleBook {...props} user={this.state.user} />}
                verify={this.verifyAuthentication}
                redirect="/"
              />
          <ProtectedRoute
                path="/single/:title"
                exact
                render={props => <SingleSearch {...props} user={this.state.user} />}
                verify={this.verifyAuthentication}
                redirect="/"
              />
          <Route path="/info" exact component={InfoView} />
          <Route path="/book/:id" render={(props) => <SingleView {...props} user={this.state.user} loadUserInformation={this.loadUserInformation}/>} />
          <Route path="/search/:id" exact component={SearchView} />
          <Route path="/themes" exact component={ThemeView} />
          <Route path="/" exact component={HomeView} />
          </Switch>
          }
        </BrowserRouter>
      </div>
    );
  }
}

export default App;


/*
    <ProtectedRoute
                path="/profile-edit"
                render={props => <EditProfile {...props} user={this.state.user} loadUserInformation={this.loadUserInformation} />}
                verify={this.verifyAuthentication}
                redirect="/"
              />
              */
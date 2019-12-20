import React, { Component, Fragment } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import Login from "./views/authentication/Login";
import SignUp from "./views/authentication/Signup";
import Profile from "./views/Profile";
import EditProfile from "./views/EditProfile";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./services/ProtectedRoute";
import HomeView from "./views/Homeview";
import SearchView from "./views/SearchView";
import ThemeView from "./views/ThemeView";
import UserList from "./views/UserList";
import { loadUserInformation as loadUserInformationService } from "./services/authentication";

import SingleView from "./views/SingleView";
import PodcastView from "./views/PodcastView";
import Bookshelf from "./views/Bookshelf";
import Podshelf from "./views/Podshelf";
import ShelfSingleBook from "./views/ShelfSingleBook";
import ShelfSinglePodcast from "./views/ShelfSinglePodcast";
import InfoView from "./views/InfoView";
import SingleSearch from "./views/SingleSearch";
import NewsFeed from "./views/NewsFeed";


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loaded: false
    };
    this.loadUserInformation = this.loadUserInformation.bind(this);
    this.verifyAuthentication = this.verifyAuthentication.bind(this);
  }

  async loadUserInformation() {
   // console.log("UPDATE USER FOLLOWER");
    try {
      const user = await loadUserInformationService();
      this.setState({
        user,
        loaded: true
      });
      return user;
    } catch (error) {
      console.log("couldnt load user information in App.jsx due to", error);
    }
  }

  async componentDidMount() {
    this.loadUserInformation();
  }

  verifyAuthentication() {
    return this.state.user;
  }

  render() {
    return (
      <div className="App" style = {{width:"100%"}}>
        <BrowserRouter>
          <Navbar
            user={this.state.user}
            loadUserInformation={this.loadUserInformation}
            props={this.props}
          />
          {this.state.loaded && 
          <Switch>
          <Route path="/signup" render={(props) => <SignUp {...props}  loadUserInformation={this.loadUserInformation}/>} />
          <Route path="/login" render={(props) => <Login {...props} user={this.state.user} loadUserInformation={this.loadUserInformation}/>} />
          <Route path="/search/:id" exact component={SearchView} />
          <ProtectedRoute
                path="/profile-edit"
                exact
                render={props => (
                  <EditProfile
                    {...props}
                    user={this.state.user}
                    loadUserInformation={this.loadUserInformation}
                  />
                )}
                verify={this.verifyAuthentication}
                redirect="/"
              />
                <ProtectedRoute
                path="/newsfeed"
                exact
                render={props => (
                  <NewsFeed
                    {...props}
                    user={this.state.user}
                    loadUserInformation={this.loadUserInformation}
                  />
                )}
                verify={this.verifyAuthentication}
                redirect="/"
              />
              <ProtectedRoute
                path="/profile/:id"
                // exact
                render={props => (
                  <Profile
                    {...props}
                    user={this.state.user}
                    loadUserInformation={this.loadUserInformation}
                  />
                )}
                verify={this.verifyAuthentication}
                redirect="/"
              />
              <ProtectedRoute
                path="/user-list"
                exact
                render={props => (
                  <UserList
                    {...props}
                    user={this.state.user}
                    loadUserInformation={this.loadUserInformation}
                  />
                )}
                verify={this.verifyAuthentication}
                redirect="/"
                />
                <Route path="/info" exact component={InfoView} />
                <Route path="/book/:id" render={(props) => <SingleView {...props} user={this.state.user} loadUserInformation={this.loadUserInformation}/>} />
                <Route path="/podcast/:id" render={(props) => <PodcastView {...props} user={this.state.user} loadUserInformation={this.loadUserInformation}/>} />
                <Route path="/themes" exact component={ThemeView} />
                <ProtectedRoute
                path="/bookshelf/:id"
                exact
                render={props => (
                  <Bookshelf {...props} user={this.state.user} />
                )}
                verify={this.verifyAuthentication}
                redirect="/"
                />
                <ProtectedRoute
                path="/podshelf/:id"
                exact
                render={props => (
                  <Podshelf {...props} user={this.state.user} />
                )}
                verify={this.verifyAuthentication}
                redirect="/"
                />
                <Route
                path="/single/:title"
                exact
                render={props => <SingleSearch {...props} user={this.state.user} />}
                redirect="/"
                />
                <ProtectedRoute
                path="/one/:profile/:id"
                exact
                render={props => <ShelfSingleBook {...props} user={this.state.user} />}
                verify={this.verifyAuthentication}
                redirect="/"
                />
                <ProtectedRoute
                path="/alone/:profile/:id"
                exact
                render={props => <ShelfSinglePodcast {...props} user={this.state.user} />}
                verify={this.verifyAuthentication}
                redirect="/"
                />
                <Route path="/" exact component={HomeView} />
                </Switch>
              }
        </BrowserRouter>
      </div>
    );
  }
}

export default App;


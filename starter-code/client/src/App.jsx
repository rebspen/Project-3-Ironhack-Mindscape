import React, { Component, Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { render } from "react-dom";

// when we want to add this
// import ProtectedRoute from './components/ProtectedRoute';

// import { loadUser as loadUser } from './services/authentication';

import HomeView from "./views/Homeview";
import SearchView from "./views/SearchView";
import ThemeView from "./views/ThemeView";
import SingleView from "./views/SingleView";
import InfoView from "./views/InfoView";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loaded: false
    };
  }

  // async componentDidMount() {
  //   try {
  //     const user = await loadUserInformationService();
  //     this.setState({
  //       user,
  //       loaded: true
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route path="/info" exact component={InfoView} />
          <Route path="/book/:id" exact component={SingleView} />
          <Route path="/search/:id" exact component={SearchView} />
          <Route path="/themes" exact component={ThemeView} />
          <Route path="/" exact component={HomeView} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

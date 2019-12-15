import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";


class Bookshelf extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const user = this.props.user;
    console.log(user)
    //We get the user data from App.jsx.

    return(
      <div>
      <h1>Bookshelf</h1>
      </div>
      )
  }
}

export default Bookshelf

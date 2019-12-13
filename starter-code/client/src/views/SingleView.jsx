import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./views.css";


// import { listUser as listUser } from './../services/authentication';

class SingleView extends Component {
  render() {
    const id = this.props.match.params.id
    return (
      <main>
       <h1>{id} book view</h1>
      </main>
    );
  }
}

export default SingleView;

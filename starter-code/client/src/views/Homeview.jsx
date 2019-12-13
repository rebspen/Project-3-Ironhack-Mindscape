import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "./views.css"

// import { listUser as listUser } from './../services/authentication';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  // async componentDidMount() {
  //   try {
  //     const user = await listUser();
  //     this.setState({
  //       user
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  render() {
    return (
      <main className = "App-layers m-3">
      <h1>Mindspan</h1>
      <button type="button" class="btn btn-light m-2"><Link to= "/themes" > Begin a new journey...</Link></button>
      <button type="button" class="btn btn-light m-2"><Link to= "/" >Understand our process</Link></button>
      </main>
    );
  }
}

export default HomeView;
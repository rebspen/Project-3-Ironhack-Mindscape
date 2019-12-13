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
      <main className = "App-layers m-3 text-center w-100">
      <button type="button" className="btn btn-light m-2 w-60 box-shadow" style={{"minHeight":"250px"}}><Link to= "/themes" className='display-4' style={{"color":"#444A6C"}}> Begin a new journey...</Link></button>
      <button type="button" className="btn btn-light m-2 w-60 box-shadow" style={{"minHeight":"250px"}}><Link to= "/info" className='display-4' style={{"color":"#444A6C"}}>Understand our process</Link></button>
      </main>
    );
  }
}

export default HomeView;
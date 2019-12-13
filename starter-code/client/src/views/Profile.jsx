import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";


class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const user = this.props.user;
    //We get the user data from App.jsx.

    return(
       <div class='container m-3 p-3 d-flex flex-column justify-content-center align-items-center box-shadow' style={{"minHeight": '500px'}, {"backgroundColor": 'white'}}>
      {user && 
      <Fragment>
       <h1>Welcome back {user.username} ! </h1> 
       <img src={user.image} alt={user.username}/>
       <Link to='/profile/edit'>Update your Profile</Link>
       <div>Your BookShelf</div>
      <div>Following</div>
      </Fragment>
       }
      </div>
      )
  }
}

export default Profile

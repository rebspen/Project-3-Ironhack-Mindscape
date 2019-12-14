import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";


class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const user = this.props.user;
    //We get the user data from App.jsx.

    const image = user.image;
    const imageURL = {
      firstPart: image.substring(0, image.indexOf('upload/') + 7), //7 is the number of characters in upload/, so it will include it
      middle: 'w_400,h_400,c_crop,g_face,r_max',
      lastPart: image.split('upload').pop()
      // same result than image.replace('http://res.cloudinary.com/dgmvfq29c/image/upload/', '')
    };

    const imageURLTransformed = imageURL.firstPart + imageURL.middle + imageURL.lastPart;

    return(
      <div>
       <div className='container mt-2 p-3 d-flex flex-column justify-content-center align-items-center box-shadow' style={{"minHeight": '500px'}, {"backgroundColor": 'white'}}>
      {user && 
      <Fragment>
       <h1>Welcome back {user.username} ! </h1> 
       <img src={imageURLTransformed} alt={user.username} className='img-fluid'/>
       <Link to='/profile-edit'>Update your Profile</Link>
      </Fragment>
       }
      </div>
      <div className='container mt-2 p-3 d-flex flex-column justify-content-center align-items-center box-shadow' style={{"minHeight": '500px'}, {"backgroundColor": 'white'}}>Your BookShelf</div>
      <div className='container mt-2 p-3 d-flex flex-column justify-content-center align-items-center box-shadow' style={{"minHeight": '500px'}, {"backgroundColor": 'white'}}>Following</div>
      </div>
      )
  }
}

export default Profile

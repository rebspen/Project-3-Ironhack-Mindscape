import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import {loadUserInformationForProfiles as loadUserInformationForProfilesService} from './../services/authentication';
import {FollowUser as FollowUserService} from './../services/social-network';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderUserInfo: false,
      user: null
    }
    this.handleFollowButton = this.handleFollowButton.bind(this);
  }

async componentDidMount() {
const profileId = this.props.match.params.id;
try {
const user = await loadUserInformationForProfilesService(profileId);
this.setState({
  user:user,
  loaderUserInfo: true
});
}
catch(error) {
console.log('Couldnt get the user information to render it in profile due to : ', error);
}
}

async handleFollowButton() {
const profileId = this.props.match.params.id;
const userLoggedIn = this.props.user._id;
try {
  await FollowUserService({userLoggedIn, profileId});
} catch (error) {
  console.log('Not possible to add user to your followers')
}
}

  render() {
    const userloggedin = this.props.user;
    //We get the user data from App.jsx.
    const profileId = this.props.match.params.id;

    //This comparison will check if the user that is checking this profile is the same that is logged in.
    const isThisMyProfile = (profileId === userloggedin._id);

    //the user from this profile
    const user = this.state.user;

    //variables from user that I will render in profile:
    let imageURLTransformed;

    if (user) {
    const image = user.image;
    const imageURL = {
      firstPart: image.substring(0, image.indexOf('upload/') + 7), 
      //7 is the number of characters in upload/, so it will include it
      middle: 'w_400,h_400,c_crop,g_face,r_max',
      lastPart: image.split('upload').pop()
      // same result than image.replace('http://res.cloudinary.com/dgmvfq29c/image/upload/', '')
    };
    imageURLTransformed = imageURL.firstPart + imageURL.middle + imageURL.lastPart;

  };


    return(
      <div>
       <div className='container mt-2 p-3 d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: "#f0f0f2"}}>
      {this.state.loaderUserInfo && 
      <Fragment>
       <h1 style={{color: "#3043C8", textAlign: "center"}}>
      
       {isThisMyProfile && 
       <Fragment>
       Welcome back 
       </Fragment>
       } {user.username} </h1> 
       <img src={imageURLTransformed} alt={user.username} className='img-fluid' style={{width: "20%", border: "2px solid white", borderRadius: "180px" }}/>
      {isThisMyProfile && <Link to='/profile-edit' style={{color: "#444A6C"}}><small>Update your details</small></Link> } 
      <button className="btn w-80 mt-3" style ={{border: "2px solid #E3D353" }} onClick={this.handleFollowButton}>Follow</button>
      <div className='container mt-2 p-3 d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: "#f0f0f2"}}><Link to = "/bookshelf"><img src = "../bookshelf-color.png"/></Link></div>
      <div className='container mt-2 p-3 d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: "#f0f0f2"}}>Following</div>
      {user.followingUsers && user.followingUsers.map(following => <img src={following.image} alt='test' key={following._id} style={{width: "20%"}}/>)}
      </Fragment>
       }
      </div>
      </div>
      )
  }
}

export default Profile

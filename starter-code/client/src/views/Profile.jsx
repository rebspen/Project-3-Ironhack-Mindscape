import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import {loadUserInformationForProfiles as loadUserInformationForProfilesService} from './../services/authentication';
import {FollowUser as FollowUserService} from './../services/social-network';
import FollowedUsersCarousel from '../components/FollowedUsersCarousel';
import {roundPicture as roundPictureService} from './../services/PicturesCloudinary'



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
const loaded = this.state.loaderUserInfo;
try {
const user = await loadUserInformationForProfilesService(profileId);
this.setState({
  user:user,
  loaderUserInfo: !loaded
});
}
catch(error) {
console.log('Couldnt get the user information to render it in profile due to : ', error);
}
}

async componentDidUpdate () {
  if (this.state.user._id !== this.props.match.params.id ) {
  const profileId = this.props.match.params.id;
  try {
  const user = await loadUserInformationForProfilesService(profileId);
  this.setState({
    user:user,
  });
  }
  catch(error) {
  console.log('Couldnt get the user information to render it in profile due to : ', error);
  }}
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
       <img src={roundPictureService(user.image)} alt={user.username} className='img-fluid' style={{width: "20%", border: "2px solid white", borderRadius: "180px" }}/>
      {isThisMyProfile && <Link to='/profile-edit' style={{color: "#444A6C"}}><small>Update your details</small></Link> } 
      {!isThisMyProfile &&  <button className="btn w-80 mt-3" style ={{border: "2px solid #E3D353" }} onClick={this.handleFollowButton}>Follow</button> }
      <div className='container mt-2 p-3 d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: "#f0f0f2"}}><Link to='/bookshelf'><img src = "../bookshelf-color.png"/></Link></div>
      <div className='container mt-2 p-3 d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: "#f0f0f2"}}>Following</div>
      {user.followingUsers && <FollowedUsersCarousel data = {user.followingUsers}/>}
      
      </Fragment>
       }
      </div>
      </div>
      )
  }
}

export default Profile

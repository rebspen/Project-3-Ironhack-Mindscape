import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { loadUserInformationForProfiles as loadUserInformationForProfilesService } from "./../services/authentication";
import { FollowUser as FollowUserService } from "./../services/social-network";
import { UnfollowUser as UnfollowUserService } from "./../services/social-network";
import FollowedUsersCarousel from "../components/FollowedUsersCarousel";
import { roundPicture as roundPictureService } from "./../services/PicturesCloudinary";
import { addFollowingPost  as addFollowingPostService } from "./../services/posts";
import { IoMdContacts} from 'react-icons/io';
import { FaUserFriends} from 'react-icons/fa';
import { IconContext } from "react-icons";
import { MdSettings} from 'react-icons/md';



class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderUserInfo: false,
      user: null
    };
    this.handleFollowButton = this.handleFollowButton.bind(this);
    this.isFollowing = this.isFollowing.bind(this);
    this.handleUnfollowButton = this.handleUnfollowButton.bind(this);
    this.hasLength = this.hasLength.bind(this);
  }

  async componentDidMount() {
    const profileId = this.props.match.params.id;
    const loaded = this.state.loaderUserInfo;
    try {
      const user = await loadUserInformationForProfilesService(profileId);
      this.setState({
        user: user,
        loaderUserInfo: !loaded
      });
    } catch (error) {
      console.log(
        "Couldnt get the user information to render it in profile due to : ",
        error
      );
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    //console.log("PREV STATE", prevState.user, "CURRENT STATE", this.state.user.beingFollowedUsers);
    //console.log("PREV PROPS", prevProps.user.followingUsers, "CURRENT PROPS", this.props.user.followingUsers);

    if (this.state.user._id !== this.props.match.params.id) {
      const profileId = this.props.match.params.id;
      try {
        const user = await loadUserInformationForProfilesService(profileId);
        this.setState({
          user: user
        });
      } catch (error) {
        console.log(
          "Couldnt get the user information to render it in profile due to : ",
          error
        );
      }
    }

    // ------------------------------------------------------
  }

  async handleFollowButton() {
    //console.log('clicked in follow button');
    const profileId = this.props.match.params.id;
    const userLoggedIn = this.props.user._id;
    try {
     // console.log('in try');
      const user = await FollowUserService({ userLoggedIn, profileId });
     // console.log("user follow", user);
      await this.props.loadUserInformation();
      this.setState({
        user: user
      });
      await addFollowingPostService(this.state.user);
    } catch (error) {
      console.log("Not possible to add user to your followers");
    }
  }

  async handleUnfollowButton() {
   // console.log('clicked in unfollow button');

    const profileId = this.props.match.params.id;
    const userLoggedIn = this.props.user._id;

    try {
      const user = await UnfollowUserService({ userLoggedIn, profileId });
     // console.log("user unfollow", user);
      //console.log('props', this.props);
      await this.props.loadUserInformation();
      this.setState({
        user: user
      });
    } catch (error) {
      console.log("Not possible to add user to your followers", error);
    }
  }

  isFollowing() {
    const profileId = this.props.match.params.id;
    const userloggedin = this.props.user;
    if (userloggedin.followingUsers.includes(profileId)) {
      return true;
    } else {
      return false;
    }
  }

  hasLength(array) {
    if (array.length > 0) {
      return true
    } else {
      return false
    }
  }

  render() {
    const userloggedin = this.props.user;
    //We get the user data from App.jsx.
    const profileId = this.props.match.params.id;

    //This comparison will check if the user that is checking this profile is the same that is logged in.
    const isThisMyProfile = profileId === userloggedin._id;

    //the user from this profile
    const user = this.state.user;


    return (
      <div>
        <div
          className="container mt-2 p-3 d-flex flex-column justify-content-center align-items-center"
          style={{ backgroundColor: "#f0f0f2" }}
        >
          {this.state.loaderUserInfo && (
            <Fragment>
              <h1 style={{ color: "#3043C8", textAlign: "center" }}>
                {isThisMyProfile && <Fragment>Welcome back</Fragment>}{" "}
                {user.username}{" "}
              </h1>
              <span className='border p-2 m-1 text-center'> <FaUserFriends/>Followers <br/> {user.beingFollowedUsers.length}</span>

              <img
                src={roundPictureService(user.image)}
                alt={user.username}
                className="img-fluid"
                style={{
                  width: "20%",
                  border: "2px solid white",
                  borderRadius: "180px"
                }}
              />


              {isThisMyProfile && (
                <Link to="/profile-edit" style={{ color: "#444A6C" }}>
                  <small><MdSettings/> Update Profile</small>
                </Link>
              )}

              {!isThisMyProfile && (
                <div>
                  {!this.isFollowing() && (
                    <button
                      className="btn w-80 mt-3"
                      style={{ border: "2px solid #E3D353" }}
                      onClick={this.handleFollowButton}
                    >
                      Follow
                    </button>
                  )}
                  {this.isFollowing() && (
                    <button
                      className="btn w-80 mt-3 ml-2"
                      style={{ border: "2px solid #E3D353" }}
                      onClick={this.handleUnfollowButton}
                    >
                      Unfollow
                    </button>
                  )}
                </div>
              )}

              <div
                className="container mt-2 p-3 d-flex flex-row justify-content-center align-items-center"
                style={{ backgroundColor: "#f0f0f2" }}
              >
                <Link className="mr-3" to={`/bookshelf/${profileId}`}><img src = "../bookshelf-color.png"/></Link>
                <Link className="ml-3" to={`/podshelf/${profileId}`}><img style = {{width: "60%"}} src = "../headphones.png"/></Link>
              </div>

              {!user.followingUsers.length && (
                <div className='text-center'>

             { isThisMyProfile && <div>
              <IconContext.Provider value={{ color: "#E3D353", size:'5em'}}>
              <IoMdContacts /> </IconContext.Provider>
              You are not following any friend's journey.
              <br/>
              <Link to='/user-list'>Click here to find your friends!</Link>
              </div>}

             { !isThisMyProfile && <div>
              <IconContext.Provider value={{ color: "#E3D353", size:'5em' }}>
              <IoMdContacts /> </IconContext.Provider>
               {this.state.user.username} is not following any friends' journey yet.
              </div>
             }
             </div>
              )
             }       

              {this.hasLength(user.followingUsers) && 

                <div
                  className="container mt-2 p-3 d-flex flex-column justify-content-center align-items-center"
                  style={{ backgroundColor: "#f0f0f2" }}
                >
                  <h4>Following</h4>
                    <FollowedUsersCarousel data={user.followingUsers} />
                </div> 

              }
            </Fragment>
          )}
        </div>
        </div>
    );
  }
}

export default Profile;

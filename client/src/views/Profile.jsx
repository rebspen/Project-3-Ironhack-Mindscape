import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { loadUserInformationForProfiles as loadUserInformationForProfilesService } from "./../services/authentication";
import { FollowUser as FollowUserService } from "./../services/social-network";
import { UnfollowUser as UnfollowUserService } from "./../services/social-network";
import FollowedUsersCarousel from "../components/FollowedUsersCarousel";
import { roundPicture as roundPictureService } from "./../services/PicturesCloudinary";
import { addFollowingPost as addFollowingPostService } from "./../services/posts";
import { IoMdContacts } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { IconContext } from "react-icons";
import { MdSettings } from "react-icons/md";

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
      return true;
    } else {
      return false;
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
    // <div>
    // <div className="context" style ={{height: "100%"}}>
      <div>
        <div
          className="container mt-2 p-3 d-flex flex-column justify-content-center align-items-center"
          style={{ backgroundColor: "Transparent" }}
        >
          {this.state.loaderUserInfo && (
            <Fragment>
              <div className="d-flex flex-column align-items-center">
                <h3 className="d-flex mt-4" style={{ color: "#787878", textAlign: "center" }}>
                  {isThisMyProfile && <Fragment>Welcome back</Fragment>}{" "}
                  {user.username}{" "}
                </h3>
                <div
                  className="border py-2 mt-2 pb-2 my-1 mb-3 text-center btn"
                  style={{ backgroundColor: "rgb(255, 255, 255, 0.2)" }}
                >
                  <FaUserFriends />
                  Followers {user.beingFollowedUsers.length}
                </div>
              </div>

              <div className="d-flex flex-column align-items-center">
                <img
                  src={roundPictureService(user.image)}
                  alt={user.username}
                  className="img-fluid"
                  style={{
                    width: "",
                    border: "2px solid white",
                    borderRadius: "180px"
                  }}
                />
                {isThisMyProfile && (
                  <Link to="/profile-edit" style={{ color: "#787878" }}>
                    <small>
                      <MdSettings /> Update Profile
                    </small>
                  </Link>
                )}
              </div>

              <div
                className="container my-2 mt-3 p-3 d-flex flex-row justify-content-center align-items-center"
                style={{ backgroundColor: "Transparent" }}
              >
                <Link className="text-center" to={`/bookshelf/${profileId}`}>
                  <img className="shelf" style={{ width: "55%" }} src="../bookshelf-color.png" />
                </Link>
                <Link className="text-center" to={`/podshelf/${profileId}`}>
                  <img className="shelf" style={{ width: "50%" }} src="../headphones.png" />
                </Link>
                
              </div>

              {!isThisMyProfile && (
                <div>
                  {!this.isFollowing() && (
                    <button
                      className="btn w-80 mt-3 mb-2"
                      style={{ border: "2px solid #E3D353" }}
                      onClick={this.handleFollowButton}
                    >
                      Follow
                    </button>
                  )}
                  {this.isFollowing() && (
                    <button
                      className="btn w-80 mt-3 ml-2 mb-2"
                      style={{ border: "2px solid #E3D353" }}
                      onClick={this.handleUnfollowButton}
                    >
                      Unfollow
                    </button>
                  )}
                </div>
              )}

              {!user.followingUsers.length && (
                <div className="text-center">
                  {isThisMyProfile && (
                    <div>
                      <IconContext.Provider
                        value={{ color: "#E3D353", size: "4em" }}
                      >
                        <IoMdContacts />
                      </IconContext.Provider>
                      <div>
                        You are not following any friend's journey.
                        <br />
                        <Link to="/user-list">
                          Click here to find your friends!
                        </Link>
                      </div>
                    </div>
                  )}

                  {!isThisMyProfile && (
                    <div>
                      <IconContext.Provider
                        value={{ color: "#E3D353", size: "5em" }}
                      >
                        <IoMdContacts />
                      </IconContext.Provider>
                      <div>
                        {this.state.user.username} is not following any friends'
                        journey yet.
                      </div>
                    </div>
                  )}
                </div>
              )}

              {this.hasLength(user.followingUsers) && (
                <div
                  className="container my-3 p-3 d-flex flex-column justify-content-center align-items-center"
                  style={{ backgroundColor: "Transparent", color:"#787878" }}
                >
                  <h4>Following</h4>
                  <FollowedUsersCarousel
                    data={user.followingUsers}
                    user={user}
                  />
                </div>
              )}
            </Fragment>
          )}
        </div>
      </div>
    //   </div>
    //   <div class="area" >
    //   <ul class="circles">
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //         </ul>
    // </div >
    // </div> 
    );
  }
}

export default Profile;

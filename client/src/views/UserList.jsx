import React, { Component } from "react";
import { UserList as UserListService } from "./../services/social-network.jsx";
import { Link } from "react-router-dom";
import { roundPicture as roundPictureService } from "./../services/PicturesCloudinary";
import "./UserList.css";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";
import { MdFace } from "react-icons/md";

//This function will exclude the logged in user's profile in the list of friends.
function isTheSame(user, profile) {
  if (user._id === profile._id) {
    return true;
  } else {
    return false;
  }
}

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      filteredList: []
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  async componentDidMount() {
    try {
      const usersList = await UserListService();
     // console.log('user list in front end', usersList);
     usersList.sort(function(a, b) {
     // console.log('sorting', b.beingFollowedUsers.length);
      return b.beingFollowedUsers.length - a.beingFollowedUsers.length;
    });
      this.setState({
        usersList,
        filteredList: usersList
      });
    } catch (error) {
      console.log("not possible to load list of users in view", error);
    }
  }

  handleSearchChange(event) {
    event.preventDefault();
    let currentUsersList = this.state.usersList;
    let newUsersList = [];

    if (event.target.value !== "") {
      newUsersList = currentUsersList
        .filter(item => {
          const lc = item.username.toLowerCase();
          const filter = event.target.value.toLowerCase();

          return lc.includes(filter);
        })
    } else {
      newUsersList = currentUsersList;
    }

    this.setState({
      filteredList: newUsersList
    });

   // console.log("writing in search");
  }

  render() {
   // console.log("req user", this.props.user._id);
    return (
      <div className='m-2'>
        <div className="input-group md-form form-sm form-2 w-70 mb-2">
          <div className="input-group-prepend w-10">
            <span className="input-group-text lime lighten-2" id="basic-text1">
              <IconContext.Provider
                value={{ style: { width: "3em", color: "#E3D353" } }}
              >
                <FaSearch />
              </IconContext.Provider>
            </span>
          </div>
          <input
            type="search"
            className=" my-0 py-1 form-control w-90"
           
            placeholder="Search by username "
            onChange={this.handleSearchChange}
          />
        </div>

        <div className="table-responsive w-80">
          <table className="table user-list" id="myTable">
            <thead>
              <tr>
                <th className='text-center'>
                   <IconContext.Provider
                value={{ style: { width: "1em", color: "#E3D353" } }}
              >
                <MdFace />
              </IconContext.Provider>
                </th>
                <th className='text-center'>
                  <span>Username</span>
                </th>
                <th className='text-center'>
                  <span>Followers</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.filteredList &&
                this.state.filteredList.map(
                  user =>
                    !isTheSame(this.props.user, user) && (
                      <tr key={user._id} >
                        <td style={{ width: "20%" }} className='text-center'>
                          <img
                            src={roundPictureService(user.image)}
                            alt={user.username}
                            className="img-fluid"
                            style={{ width: "50%" }}
                          />
                        </td>
                        <td style={{ width: "30%" }} className="align-middle text-center">
                          {" "}
                          <Link to={`/profile/${user._id}`} className='text-center text-dark'>
                            {user.username}
                          </Link>
                        </td>
                        <td style={{ width: "30%" }} className="align-middle text-center">
                          {user.beingFollowedUsers.length}
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UserList;

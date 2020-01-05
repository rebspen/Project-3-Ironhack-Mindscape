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
      newUsersList = currentUsersList.filter(item => {
        const lc = item.username.toLowerCase();
        const filter = event.target.value.toLowerCase();

        return lc.includes(filter);
      });
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
    // <div>
    // <div className="context" style ={{height: "100%"}}>
      <div className="mt-1 d-flex flex-column justify-content-center align-items-center" style = {{color:"#787878"}}>
        <div className="input-group md-form form-sm form-2 w-70 mb-2">
          <div className="input-group-prepend w-10 mt-3">
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
            className=" my-0 py-1 form-control w-90 mt-3"
            placeholder="Search..."
            onChange={this.handleSearchChange}
            style={{ background: "Transparent" }}
          />
        </div>

        <div className="table-responsive w-80 d-flex flex-column justify-content-center align-items-left">
          <table
            className="table user-list w-100"
            id="myTable"
            style={{ border: "Transparent" }}
          >
            <thead>
              <tr>
                <th className="text-center">
                  <IconContext.Provider
                    value={{ style: { width: "1em", color: "#E3D353" } }}
                  >
                    <MdFace />
                  </IconContext.Provider>
                </th>
                <th className="text-center">
                  <small>Username</small>
                </th>
                <th className="text-center">
                  <small>Followers</small>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.filteredList &&
                this.state.filteredList.map(
                  user =>
                    !isTheSame(this.props.user, user) && (
                      <tr key={user._id} style={{ border: "Transparent" }}>
                        <td style={{ width: "20%" , border: "Transparent"}} className="text-center">
                          <img
                            src={roundPictureService(user.image)}
                            alt={user.username}
                            className="img-fluid"
                            style={{
                              width: "40px",
                              border: "2px solid white",
                              borderRadius: "180px"
                            }}
                          />
                        </td>
                        <td
                          style={{ width: "30%", border: "Transparent" }}
                          className="align-middle text-center"
                        >
                          <Link
                            to={`/profile/${user._id}`}
                            className="text-center text-dark"
                          >
                            {user.username}
                          </Link>
                        </td>
                        <td
                          style={{ width: "30%", border: "Transparent" }}
                          className="align-middle text-center"
                        >
                          {user.beingFollowedUsers.length}
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </table>
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

export default UserList;

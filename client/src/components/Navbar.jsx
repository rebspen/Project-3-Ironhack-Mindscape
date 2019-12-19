import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { signOut as signOutService } from "./../services/authentication";
import { FaRegNewspaper } from "react-icons/fa";
import { IconContext } from "react-icons";
import { FaUserFriends } from "react-icons/fa";
import { FaPortrait } from "react-icons/fa";
import { FaRegTimesCircle } from "react-icons/fa";
import { Redirect } from "react-router-dom";

import "./style.css"

class Navbar extends Component {
  constructor(props) {
    super(props);
  
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  async handleSignOut() {
    try {
      await signOutService();
      this.props.loadUserInformation();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const user = this.props.user;
    return (
      <div>
        {user && (
          <div className="navbar mr-auto d-flex flex-row justify-content-around ">
          <Fragment>
            <div className="nav-item">
              <Link
                className="nav-link mr-2"
                to={`/newsfeed`}
                style={{ color: "#788FAD" }}
              >
                <IconContext.Provider value={{ color: "rgb(48, 67, 200)" }}>
                  <div>
                    <FaRegNewspaper size={30} />
                  </div>
                </IconContext.Provider>
              </Link>
            </div>
            <div className="nav-item">
              <Link
                className="nav-link mr-2"
                to={`/user-list`}
                style={{ color: "#788FAD" }}
              >
                <IconContext.Provider value={{ color: "rgb(48, 67, 200)" }}>
                  <div>
                    <FaUserFriends size={30} />
                  </div>
                </IconContext.Provider>{" "}
              </Link>
            </div>
            <div>
              <Link to="/" className="" style={{ color: "#E3D353" }}>
                <strong>MindSpace</strong>
              </Link>
            </div>
            <div className="nav-item">
              <Link
                className="nav-link mr-2"
                to={`/profile/${user._id}`}
                style={{ color: "#788FAD" }}
              >
                <IconContext.Provider value={{ color: "rgb(48, 67, 200)" }}>
                  <div>
                    <FaPortrait size={30} />
                  </div>
                </IconContext.Provider>{" "}
              </Link>
            </div>
            <div className="nav-item">
              <button
                className="btn btn-link "
                onClick={this.handleSignOut}
                style={{ boxShadow: "none", color: "#788FAD" }}
              >
                <IconContext.Provider value={{ color: "rgb(48, 67, 200)" }}>
                  <div>
                    <FaRegTimesCircle size={30} />
                  </div>
                </IconContext.Provider>{" "}
              </button>
            </div>
          </Fragment>
          </div>
        )}
        {!user && (
          <Fragment>
            <div className="navbar mr-auto d-flex flex-row justify-content-between">
              <div>
                <Link to="/" className="" style={{ color: "#E3D353" }}>
                  <strong>MindSpace</strong>
                </Link>
              </div>
              <div className="d-flex flex-row">
                <div className="nav-item">
                  <Link
                    className="nav-link mr-2"
                    to="/login"
                    style={{ color: "#788FAD" }}
                  >
                    Sign In
                  </Link>
                </div>
                <div className="nav-item">
                  <Link
                    className="nav-link mr-2"
                    to="/signup"
                    style={{ color: "#788FAD" }}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </Fragment>
        )}
        </div>
    );
  }
}

export default Navbar;

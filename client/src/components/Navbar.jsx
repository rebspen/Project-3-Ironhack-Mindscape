import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { signOut as signOutService } from "./../services/authentication";
import { FaRegNewspaper } from "react-icons/fa";
import { IconContext } from "react-icons";
import { FaUserFriends } from "react-icons/fa";
import { FaPortrait } from "react-icons/fa";
import { FaRegTimesCircle } from "react-icons/fa";
import { Redirect } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";

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
          <div className="navbar mr-auto d-flex flex-row justify-content-around">
            <Fragment>
              <div className="nav-item">
                <Link className="nav-link" to={`/newsfeed`}>
                  <IconContext.Provider value={{ color: "rgb(48, 67, 200)" }}>
                    <div>
                      <FaRegNewspaper size={30} />
                    </div>
                  </IconContext.Provider>
                </Link>
              </div>
              <div className="nav-item">
                <Link className="nav-link" to={`/user-list`}>
                  <IconContext.Provider value={{ color: "rgb(48, 67, 200)" }}>
                    <div>
                      <FaUserFriends size={30} />
                    </div>
                  </IconContext.Provider>{" "}
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/" className="" style={{ color: "#E3D353" }}>
                  <strong>
                    Mind <br /> Space
                  </strong>
                </Link>
              </div>
              <div className="nav-item">
                <Link className="nav-link" to={`/profile/${user._id}`}>
                  <IconContext.Provider value={{ color: "rgb(48, 67, 200)" }}>
                    <div>
                      <FaPortrait size={30} />
                    </div>
                  </IconContext.Provider>{" "}
                </Link>
              </div>
              <div className="nav-item">
                <button className="btn btn-link " onClick={this.handleSignOut}>
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
              <div className="nav-item">
                <Link
                  to="/"
                  className="p-1 text-left"
                  style={{ color: "#E3D353" }}
                >
                  <strong>MindSpace</strong>
                </Link>
              </div>
              <div className="d-flex flex-row justify-content-end">
                <div className="nav-item">
                  <Link
                    to="/login"
                    style={{ color: "rgb(48, 67, 200)" }}
                    className="nav-link"
                  >
                    <IconContext.Provider value={{ color: "rgb(48, 67, 200)" }}>
                      <IoMdLogIn size={30} />
                    </IconContext.Provider>
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

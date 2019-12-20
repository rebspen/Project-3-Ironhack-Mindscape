import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./views.css";
import "./Homeview.css";


class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  render() {
    return (
      <div>
      <div className="context" style ={{height: "100%"}}>
      <main
        className="d-flex flex-column justify-content-center align-items-center my-3 text-center w-100"
        style={{ height: "500px" }}
      >
        <button
          type="button"
          className="btn btn-light m-2 p-3 w-60 "
          style={{
            minHeight: "10%",
            border: "10px double white",
            backgroundColor: "Transparent",
            borderRadius: "90px",
            zIndex: "1000"
          }}
        >
          <Link
            to="/themes"
            className="display-4"
            style={{ color: "rgb(48, 67, 200)", textDecoration: "none" }}
          >
            {" "}
            <h3>Begin a new journey</h3>
          </Link>
        </button>
        <br>
        </br>
        <br>
        </br>
        <button
          type="button"
          className="btn btn-light m-2 w-60"
          style={{
            minHeight: "10%",
            border: "#f0f0f2",
            backgroundColor: "Transparent",
            zIndex: "1000"
          }}
        >
          <Link to="/info" className="display-4" style={{ color: "#444A6C" }}>
            <img
              className="m-0"
              src="../brain.png"
              style={{ width: "0.75em" }}
            />
            <h6 style={{ color: "rgb(48, 67, 200)", textDecoration: "none" }}>What is MindScape?</h6>
          </Link>
        </button>
      </main>
      </div>
      <div class="area" >
      <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
      </div>
    );
  }
}

export default HomeView;

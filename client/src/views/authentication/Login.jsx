import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signIn as signInService } from "./../../services/authentication";
import "./Login.css";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmissionLogIn = this.handleSubmissionLogIn.bind(this);
  }

  componentDidMount() {
    window.scroll(0, 0);
    const $alert = document.getElementById("alert-password");
    $alert.style.visibility = "hidden";
  }

  handleInputChange(event) {
    const nameInput = event.target.name;
    const value = event.target.value;
    this.setState({
      [nameInput]: value
    });
  }

  async handleSubmissionLogIn(event) {
    event.preventDefault();
    try {
      let userId;
      await signInService(this.state)
        .then(result => {
          console.log('logged in');
        })
        .catch(error => {
          const $alert = document.getElementById("alert-password");
          $alert.style.visibility = "visible";
        });
      this.props
        .loadUserInformation()
        .then(result => {
          userId = result._id;
          //After the promise is resolved, the result is the user that it was loaded. This way, after sign in it redirects to his profile.
          this.props.history.push(`/profile/${userId}`);
        })
        .catch(err => {
          console.log("couldnt get user id due to", err);
        });
    } catch (error) {
      console.log(error);
      //create a redirect to error page
    }
  }

  render() {
    return (
      <div
        className="container mt-5 p-3 box-shadow text-center border rounded-lg"
        style={
          ({ minHeight: "500px" }, { backgroundColor: "	rgb(255,255,255, 0.7)" })
        }
      >
        <form
          onSubmit={this.handleSubmissionLogIn}
          className="text-center d-flex flex-column align-items-center w-100"
        >
          <h3 className="text-center mb-3">Welcome</h3>
          <label htmlFor="username">Username</label>{" "}
          <input
            type="text"
            name="username"
            className="w-50 form-control"
            onChange={this.handleInputChange}
            value={this.state.username}
          />
          <br />
          <label htmlFor="password w-50">Password</label>
          <input
            type="password"
            name="password"
            className="w-50 form-control"
            onChange={this.handleInputChange}
            value={this.state.password}
          />
          <div
            id="alert-password"
            className="p-1 text-danger"
            role="alert"
          >
            Wrong Username/Password
          </div>
          <button
            className="btn m-3 text-white p-2"
            style={{
              width: "30%",
              border: "2px solid white",
              borderRadius: "90px",
              backgroundColor: "#E3D353"
            }}
          >
            Sign in
          </button>
          <Link to="/signup">
            <span className="text-dark">
              <small>Create an account</small>{" "}
            </span>
          </Link>
        </form>
      </div>
    );
  }
}
export default Login;

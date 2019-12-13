import React, { Component } from 'react'
import {signUp as signUpService} from './../../services/authentication'



class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmissionEvent = this.handleSubmissionEvent.bind(this);
  }

  //To change state when we write on the sign-up form
  handleInputChange(event) {
    const nameOfState = event.target.name;
    const valueOfInput = event.target.value;
    this.setState({
      [nameOfState]: valueOfInput
    });
  }


  //What happens after we click submit in the sign-up form
  async handleSubmissionEvent(event) {
  event.preventDefault();
  const {username, password, email} = this.state;
  try {
  const user = await signUpService({username, password, email});
  //this.props.changeAuthenticationStatus(user);
  this.props.loadUserInformation(); //this is repeating the step above
  this.props.history.push(`/profile`);
} catch(error) {
  console.log(error);
  //*******Create a redirect here, when the user can't sign up.**********
}
  }

  render() {
    return (
      <div className='container text-center box-shadow p-3'>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmissionEvent} className='d-flex flex-column'>
         <label htmlFor="username">Username</label> <input onChange={this.handleInputChange} type="text" className="form-control" name='username' placeholder='Username' value={this.state.username}/>
          <label htmlFor="password">Password</label> <input onChange={this.handleInputChange} required type="password" className="form-control" name='password' placeholder='Password' value={this.state.password}/>
          <label htmlFor="emal">E-mail</label> <input type="text" name="email" onChange={this.handleInputChange} className="form-control" placeholder='Email' value={this.state.email}/>
          <button className="btn m-3 text-white p-2" style={{"backgroundColor":"#444A6C"}}>Sign up</button>
        </form>
      </div>
    )
  }
}


export default Signup


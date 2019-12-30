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

  componentDidMount() {
    window.scroll(0,0);
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
  let userId;
  const user = await signUpService({username, password, email});
  //this.props.changeAuthenticationStatus(user);
  this.props.loadUserInformation()
  .then(result => {
    userId =  result._id;
    //After the promise is resolved, the result is the user that it was loaded. This way, after sign in it redirects to his profile.
    this.props.history.push(`/profile/${userId}`);
  })
  .catch(err => {
    console.log('couldnt get user id due to', err);
  });
} catch(error) {
  console.log(error);
  //*******Create a redirect here, when the user can't sign up.**********
}
  }

  render() {
    return (
      // <div>
      // <div className="context" style ={{height: "100%"}}>
      <div className='container mt-5 p-3 text-center' style={{"minHeight": '500px'}, {"backgroundColor": 'Transparent'}}>
        <h3>Let's begin your journey</h3>
        <form onSubmit={this.handleSubmissionEvent} className='d-flex flex-column w-100 justify-content-center align-items-center'>
         <label htmlFor="username">Username</label> <input onChange={this.handleInputChange} type="text" className="form-control w-50 mb-1" name='username' placeholder='Username' value={this.state.username}/>
          <label htmlFor="password">Password</label> <input onChange={this.handleInputChange} required type="password" className="mb-1 w-50 form-control" name='password' placeholder='Password' value={this.state.password}/>
          <label htmlFor="emal">E-mail</label> <input type="email" name="email" onChange={this.handleInputChange} className="w-50 form-control" placeholder='Email' value={this.state.email}/>
          <button className="btn m-3 text-white p-2 w-50" style ={{width: '30%', border: "2px solid white", borderRadius: "90px", backgroundColor:"#E3D353" }}>Sign up</button>
        </form>
      </div>
    //   {/* </div>
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
    // </div> */}
     
    )
  }
}


export default Signup


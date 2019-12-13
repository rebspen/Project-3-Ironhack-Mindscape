import React, { Component } from 'react';
import {loadUserPicture as loadUserPictureService} from './../services/authentication';
import {editProfile as editProfileService} from './../services/authentication';


class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user.username,
      email: this.props.user.email
    }
    this.handleFileChange = this.handleFileChange.bind(this);
    this.editSubmission = this.editSubmission.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async handleFileChange(event) {
    event.preventDefault();
    const file = event.target.files[0];
    try {
      await loadUserPictureService(file);
      this.props.loadUserInformation();
    } catch(error) {
     console.log('Not possible to load picture in React Profile View', error);
    }
  };

  async editSubmission(event) {
    event.preventDefault();
    const {username, email} = this.state;
    try {
      await editProfileService({username, email});
      this.props.loadUserInformation();
      this.props.history.push(`/profile`);
    } catch(error) {
      console.log(error);
      //HERE WE CAN REDIRECT FOR AN ERROR PAGE --> NOT POSSIBLE TO SIGN UP
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0)
  };

  handleInputChange(event) {
    const nameOfState = event.target.name;
    const valueOfInput = event.target.value;
    this.setState({
      [nameOfState]: valueOfInput
    });
  };

  render() {
    const user= this.props.user;
    return (
      <div className='container box-shadow p-3'>
      <h1>Update Your Profile</h1>
      <div className=' d-flex justify-content-center align-items-center w-100'>

      <div className='w-50 d-flex flex-column ml-5'>
      <img src={user.image} alt="profile picture" className='w-80 img-fluid' style={{"maxWidth": "80%"}}/>
      <div className='custom-file mt-3 w-50'>
      <label className="custom-file-label" htmlFor="customFileLang">Upload your picture</label>
      <input type="file" className="custom-file-input" id="customFileLang" lang="en" onChange={this.handleFileChange}/>
      </div>
      </div>

      <div className='w-50 mr-5'>
      <form onSubmit={this.editSubmission} className='d-flex flex-column justify-content-center align-items-center'>
        <label htmlFor="username">Username</label><input type="text" name="username" className='form-control' value={this.state.username} onChange={this.handleInputChange} placeholder={`${this.state.username}`}/>
        <label htmlFor="email">Email</label><input type="text" name="email" className='form-control' value={this.state.email} onChange={this.handleInputChange} placeholder={`${this.state.email}`}/>
          <button className="btn m-3 text-white p-2 w-50"  style={{"backgroundColor":"#444A6C"}} >Edit</button>
        </form>
      </div>

      </div>
      </div>
    )
  }
}

export default EditProfile

import React, { Component } from 'react';
import {UserList as UserListService} from './../services/social-network.jsx';
import {Link} from "react-router-dom";
import {roundPicture as roundPictureService} from './../services/PicturesCloudinary';
import './UserList.css';

//This function will exclude the logged in user's profile in the list of friends.
function isTheSame (user, profile) {
  if (user._id === profile._id) {
    return true
  } else {
    return false
  }
};


class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: []
    }
  };

  async componentDidMount() {
    try {
      const usersList = await UserListService()
      this.setState({
        usersList
      });  
    }
    catch (error) {
      console.log('not possible to load list of users in view', error);
    }
  }

  render() {
    console.log('req user', this.props.user._id);
    return (
      <div class="table-responsive mr-5 ml-5 text-center">
      <table class="table user-list" id="myTable">
      <thead>
      <tr>
							<th><span></span></th>
							<th><span>Username</span></th>
							<th><span>Followers</span></th>
      </tr>
      </thead>
      <tbody>
      {this.state.usersList && this.state.usersList.map(user => 
      !isTheSame(this.props.user, user) &&
      <tr key={user._id}>
      <td style={{width: "20%"}} className='align-middle'><img src={roundPictureService(user.image)} alt={user.username} className='img-fluid' style={{width: "50%"}}/></td>
     <td style={{width: "30%"}} className='align-middle'> <Link to={`/profile/${user._id}`}>{user.username}</Link></td>
     <td style={{width: "30%"}} className='align-middle'>{user.beingFollowedUsers.length}</td>
     </tr>)}
      </tbody>
      </table>
      </div>
    )
  }
}


 

export default UserList

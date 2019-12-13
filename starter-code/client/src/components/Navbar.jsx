import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import {signOut as signOutService} from './../services/authentication'


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  async handleSignOut() {
    console.log(this.props)
    try {
      await signOutService();
      this.props.loadUserInformation();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const user=this.props.user;
    return (
      <div className='navbar' style={{"backgroundColor":"#788FAD"}}>
       {user && 
       <Fragment>
       <button className="btn btn-link text-white" onClick={this.handleSignOut} style={{"boxShadow":"none"}}>Sign Out</button>
       <Link className="nav-link text-white" to='/profile'>Your Profile</Link>
       <Link className="nav-link text-white" to='/'>Home</Link>
       </Fragment>
       } 
       {!user &&
       <Fragment>
        <Link className="nav-link text-white" to='/login'>Sign In</Link>
        <Link className="nav-link text-white" to='/signup'>Sign Up</Link>
        <Link className="nav-link text-white" to='/'>Home</Link>
        </Fragment>
       }
      </div>
    )
  }
}

export default Navbar
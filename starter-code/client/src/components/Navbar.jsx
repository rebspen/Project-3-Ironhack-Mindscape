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
      <div className='navbar d-flex justify-content-between' style={{"backgroundColor":"#788FAD"}}>
      <div><Link to='/' className='text-dark'> MindSpan</Link></div>
       {user && 
       <Fragment>
       <div>
       <ul className="navbar-nav mr-auto d-flex flex-row">
       <li className="nav-item"> <button className="btn btn-link text-white" onClick={this.handleSignOut} style={{"boxShadow":"none"}}>Sign Out</button></li>
       <li className="nav-item"><Link className="nav-link text-white mr-2" to='/profile'>Your Profile</Link></li>
       </ul>
       </div>
       </Fragment>
       } 
       {!user &&
       <Fragment>
       <div>
       <ul className="navbar-nav mr-auto d-flex flex-row">
       <li className="nav-item"><Link className="nav-link text-white mr-2" to='/login'>Sign In</Link></li>
       <li className="nav-item"><Link className="nav-link text-white mr-2" to='/signup'>Sign Up</Link></li>
      </ul>
        </div>
        </Fragment>
       }
      </div>
    )
  }
}

export default Navbar
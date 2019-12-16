import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import {signOut as signOutService} from './../services/authentication'


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
    const user=this.props.user;
    return (
      <div className='navbar d-flex justify-content-between'>
      <div><Link to='/' className='' style={{color:"#E3D353"}}> <strong>MindSpan</strong></Link></div>
       {user && 
       <Fragment>
       <div>
       <ul className="navbar-nav mr-auto d-flex flex-row">
       <li className="nav-item"> <button className="btn btn-link " onClick={this.handleSignOut} style={{"boxShadow":"none", color:"#788FAD"}}>Sign Out</button></li>
       <li className="nav-item"><Link className="nav-link mr-2" to={`/profile/${user._id}`} style={{color:"#788FAD"}}>Your Profile</Link></li>
       </ul>
       </div>
       </Fragment>
       } 
       {!user &&
       <Fragment>
       <div>
       <ul className="navbar-nav mr-auto d-flex flex-row">
       <li className="nav-item"><Link className="nav-link mr-2" to='/login' style={{color:"#788FAD"}}>Sign In</Link></li>
       <li className="nav-item"><Link className="nav-link mr-2" to='/signup' style={{color:"#788FAD"}}>Sign Up</Link></li>
      </ul>
        </div>
        </Fragment>
       }
      </div>
    )
  }
}

export default Navbar
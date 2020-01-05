import React, { Component } from 'react';
import { getUsersPodcasts } from './../services/books';
import PodCarousel from '../components/PodCarousel';

import "./views.css";

class Podshelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId : this.props.match.params.id,
      viewerId : this.props.user._id,
      podcasts: null
    }
  }

  async componentDidMount() {
   // console.log("component mounted - I am getting the podcasts..", "podshelf ID", this.state.userId, "viewer Id", this.state.viewerId)
    try {
      const podcasts = await getUsersPodcasts(this.state.userId);
      //console.log("back in podshelf", podcasts)
      this.setState({
        podcasts
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  render() {
   // console.log("props" , this.props.user._id)
    return(
    //   <div>
    // <div className="context" style ={{height: "100%"}}>
      <div className = "d-flex mt-5 flex-column justify-content-center align-items-center" style= {{color: "#787878"}}>
      <h2 className=' mt-2'>Podshelf</h2>
      <h5 className = "mt-4">Saved</h5>
      <div className = "theme" style= {{width: "100%"}} >
      {this.state.podcasts && this.state.podcasts.reverse().map((val) => {
       return  <PodCarousel data = {val} profile = {this.state.userId} />})}
      </div>
      </div>
    //   </div> 
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
    // </div> 
      )
    }
  }
  
  export default Podshelf

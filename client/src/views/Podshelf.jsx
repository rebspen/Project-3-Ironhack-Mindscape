import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
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
    console.log("component mounted - I am getting the podcasts..", "podshelf ID", this.state.userId, "viewer Id", this.state.viewerId)
    try {
      const podcasts = await getUsersPodcasts(this.state.userId);
      console.log("back in podshelf", podcasts)
      this.setState({
        podcasts
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  render() {
    console.log("props" , this.props.user._id)
    return(
      <div className = "d-flex flex-column justify-content-center align-items-center" style= {{color: "#3043C8"}}>
      <h2>Podshelf</h2>
      <h5 className = "mt-4">Saved</h5>
      <div className = "theme" style= {{width: "100%"}} >
      {this.state.podcasts && this.state.podcasts.reverse().map((val) => {
       return  <PodCarousel data = {val} profile = {this.state.userId} />})}
      </div>
      </div>
      )
    }
  }
  
  export default Podshelf

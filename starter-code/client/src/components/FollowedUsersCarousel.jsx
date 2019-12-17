import React, { useEffect, useState, Fragment } from "react";
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {roundPicture as roundPictureService} from './../services/PicturesCloudinary'



function rollUp() {
  window.scrollTo(0, 0);
}

function FollowedUsersCarousel (props) {
  console.log('data in props carousel', props.data);
      return (
        <Carousel className = "m-auto" showStatus= {false} emulateTouch = {true} showIndicators = {false} showThumbs = {false} width = {"100%"} style = {{backgroundColor: "#f0f0f2"}}>
        {props.data.map((val)=> {
            return  <div className = "" style = {{backgroundColor: "#DCE1EB", height : "100%"}}>
                 <img src={roundPictureService(val.image)} style ={{ width: '50%'}} />
                 <p className="legend"><Link to = {`/profile/${val._id}`} onClick={rollUp()}>{val.username}'s profile</Link></p>
              </div>
          })}
          </Carousel>
      );
};

export default FollowedUsersCarousel
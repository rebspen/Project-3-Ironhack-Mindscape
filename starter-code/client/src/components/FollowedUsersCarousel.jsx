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
        <Carousel className = "m-auto" centerMode = {true} emulateTouch = {true} centerSlidePercentage= {"30"} showStatus= {false} emulateTouch = {true} showIndicators = {false} showThumbs = {false} style = {{backgroundColor: "#f0f0f2"}}>
        {props.data.map((val)=> {
            return  <Link to = {`/profile/${val._id}`} onClick={rollUp()}><div style = {{backgroundColor: "#f0f0f2"}}>
                 <img src={roundPictureService(val.image)} style ={{ width: '50%', backgroundColor: "#f0f0f2", borderRadius: "180px"}} />
              </div></Link>
          })}
          </Carousel>
      );
};

export default FollowedUsersCarousel
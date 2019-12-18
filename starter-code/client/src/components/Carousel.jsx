import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

function BookCarousel (props) {
    console.log("CAROUSLE PROPS", props)
      return (
          <Carousel className = "m-auto" showStatus= {false} emulateTouch = {true} showIndicators = {false} centerMode = {true}  centerSlidePercentage= {"70"} showThumbs = {false} style = {{backgroundColor: "#f0f0f2" }}>
          {props.data.map((val)=> {
            return  <Link to = {`/one/${props.profile}/${val._id}`} style = {{backgroundColor: "red"}}><div className = "" style = {{backgroundColor: "#DCE1EB", height : "100%"}}>
                 <img src={val.image} style ={{ width: "60%"}} />
              </div> </Link>
          })}
          </Carousel>
      );
};

export default BookCarousel
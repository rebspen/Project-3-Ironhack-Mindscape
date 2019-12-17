import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

function BookCarousel (props) {
    console.log("CAROUSLE PROPS", props)
      return (
          <Carousel className = "m-auto" showStatus= {false} emulateTouch = {true} showIndicators = {false} showThumbs = {false} width = {"100%"} style = {{backgroundColor: "#f0f0f2", height: "400px"}}>
          {props.data.map((val)=> {
            return  <div className = "" style = {{backgroundColor: "#DCE1EB", height : "100%"}}>
                 <Link to = {`/one/${props.profile}/${val._id}`} ><img src={val.image} style ={{ width: "50%"}} /></Link>
              </div>
          })}
          </Carousel>
      );
};

export default BookCarousel
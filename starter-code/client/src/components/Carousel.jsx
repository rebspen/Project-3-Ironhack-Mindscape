import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

function BookCarousel (props) {
      return (
          <Carousel className = "m-auto" showStatus= {false} emulateTouch = {true} showIndicators = {false} showThumbs = {false} width = {"100%"} style = {{backgroundColor: "#f0f0f2"}}>
          {props.data.map((val)=> {
            return  <div className = "" style = {{backgroundColor: "#DCE1EB", height : "100%"}}>
                 <Link to = {`/shelf/${val._id}`} ><img src={val.image} style ={{ width: "50%"}} /></Link>
              </div>
          })}
          </Carousel>
      );
};

export default BookCarousel
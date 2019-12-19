import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import YouTube from 'react-youtube';
import "./style.css";

function PodCarousel (props) {
  
  const opts = {
    height: '390',
    width: '640',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 0
    }
  };

    console.log("CAROUSLE PROPS", props)
      return (
        <div className = "m-2" style = {{width:"30%"}}>
        <Link to = {`/alone/${props.profile}/${props.data._id}`}>
        <p style = {{textAlign:"center"}}>{props.data.title}</p>
        </Link>
        <YouTube
        videoId={props.data.yUrl.split("/")[4].trim()}
        opts={opts}
        className={"youtube-shelf"}
        />
        </div>
      );
};

export default PodCarousel
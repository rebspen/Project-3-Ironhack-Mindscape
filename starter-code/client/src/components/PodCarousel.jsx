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
        <div className = "d-flex flex-column justify-content-center align-items-center">
        {props.data.map((val)=>{
          return <Link to = {`/alone/${props.profile}/${val._id}`}><div className = "d-flex flex-column justify-content-center align-items-center">
        <h5>{val.title}</h5>
        <YouTube
        videoId={val.yUrl.split("/")[4].trim()}
        opts={opts}
        className={"youtube-shelf"}
        />
        </div></Link>
        })}
        </div>
      );
};

export default PodCarousel
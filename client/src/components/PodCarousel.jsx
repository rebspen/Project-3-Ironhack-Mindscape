import React from 'react';
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
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

  
      return (
        <div className = "m-2 " style = {{width:"30%", border: "7px double white"}}>
        <Link to = {`/alone/${props.profile}/${props.data._id}`}>
        <p style = {{textAlign:"center", color: "#787878"}}>{props.data.title}</p>
        </Link>
        <YouTube
        videoId={props.data.yUrl.split("/")[4].trim()}
        opts={opts}
        className={"youtube-view"}
        />
        </div>
      );
};

export default PodCarousel
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from 'react-loading';
import YouTube from 'react-youtube';
import {addPodcastToPodlist} from './../services/books';
import {addPodcastPost as addPodcastPostService} from './../services/posts'
import { FaSearch } from 'react-icons/fa';
import { IconContext } from "react-icons";

import "./views.css";
import themes from "./themes";

//this shuffle is to make sure their is a new search if they look at themes more than once.


function PodcastView(props) {

  const [result, setResults] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [video, setVideo] = useState("");
  const user = props.user;

  function handleSearchSubmission() {
    const title = props.match.params.id;
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=" +
          title +
          "&k=351127-cheeta-8Z5VDMQU&info=1"
      )
      .then(data => {
        const final = data.data.Similar.Info[0];
        const video = final.yUrl.split("/")[4].trim()
        setVideo(video)
       // console.log("video", video)
        //console.log("final", final)
        setResults(final);
        setLoaded(false);
        
      })
      .catch(err => {});
  }

  useEffect(() => {
    const $alert = document.getElementById("alert")
    $alert.style.visibility = 'hidden'
    return handleSearchSubmission();

  }, []);


  const opts = {
    height: '390',
    width: '640',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 0
    }
  };


  async function addPodcastToUsersProfile(event) {
    event.preventDefault();
    const podObject = result;
    const $alert = document.getElementById("alert")
    //console.log("alert", $alert)
    $alert.style.visibility = 'visible'; 
    //console.log(podObject);
    try {
     // console.log('in the try of adding podcast');
     const podcast = await addPodcastToPodlist(podObject);
      //console.log('in the try of adding podcast step2', podcast);
      await addPodcastPostService({podcast, user});
      //console.log('in the try of adding podcast step3')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="App-layers text-center">
      {loaded && <ReactLoading type={'balls'} color={'#E3D353'} height={100} width={100} />}
      <div className = "d-flex flex-column justify-content-center align-items-center">
        <h2>{result.Name}</h2>
        <br></br>
        <div style = {{width : "50%"}}>
        <YouTube
        videoId={video}
        opts={opts}
        className = "youtube-shelf"
      />
        </div>
        <Link to={`/single/${result.Name}`}>
            <IconContext.Provider value={{ color: "#E3D353" }}>
            <div>
            <FaSearch/>
            </div>
            </IconContext.Provider>
            </Link>
        <br></br>
        <div style = {{width : "70%"}}>
        <p>{result.wTeaser}</p>
        </div>
      </div>
      {user && <button className="btn m-1 mt-2 p-2" style={{"backgroundColor":"#f0f0f2", border: "2px solid #E3D353", color:"#E3D353"}} onClick={addPodcastToUsersProfile}>Add to your podlist!</button> }
      {!user && <span className='mt-5 text-right d-flex'><Link to='/login'>Log in</Link> or <Link to='/signup'>Sign Up</Link> to continue your journey!</span>}

      <div id="alert" className="alert alert-success mt-0" role="alert">
    Saved!
    </div>

    </main>
  );

}

export default PodcastView;

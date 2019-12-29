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
  let [shortDescription, setShortDes]= useState(true);
  let [longDescription, setLongDes]= useState(false);

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
    window.scrollTo(0, 0);
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

  async function readMore(event){
    event.preventDefault();
    console.log('clicked on read more');
    setShortDes(false);
    setLongDes(true);
  }

  async function readLess(event){
    event.preventDefault();
    console.log('clicked on read less');
    setShortDes(true);
    setLongDes(false);
  }

  return (
    // <div>
    // <div className="context" style ={{height: "100%"}}>
    <main className="App-layers text-center" style ={{color: "#787878"}}>
      {loaded && <ReactLoading type={'balls'} color={'#E3D353'} height={100} width={100} />}
      <div className = "d-flex flex-column justify-content-center align-items-center">
        <h2 className="mt-3">{result.Name}</h2>
        <br></br>
        <div>
        <YouTube
        videoId={video}
        opts={opts}
        className = "youtube-shelf"
      />
        </div>
        <Link to={`/single/${result.Name}`}>
            <IconContext.Provider value={{ color: "rgb(48, 67, 200)" }}>
            <div>
            <FaSearch/>
            </div>
            </IconContext.Provider>
            </Link>
        <br></br>
        <div style = {{width : "70%"}}>
        {result.wTeaser && shortDescription && (<p>{(result.wTeaser).substring(0, 250) + "..."} <button onClick={readMore} style={{"backgroundColor":"Transparent", border: "none"}}> <span style={{"color":"#E3D353"}}>read more</span></button></p>)}
        {result.wTeaser && longDescription && (<p>{result.wTeaser} <button onClick={readLess} style={{"backgroundColor":"Transparent", border: "none"}}><span style={{"color":"#E3D353"}}>read less</span></button></p>)}
        </div>
      </div>
      {user && <button className="btn m-1 mt-2 p-2" style={{"backgroundColor":"#E3D353", border: "2px solid white", color:"white"}} onClick={addPodcastToUsersProfile}>Add to your podlist!</button> }
      {!user && <span className='mt-5 text-right d-flex'><Link to='/login'>Log in</Link> or <Link to='/signup'>Sign Up</Link> to continue your journey!</span>}

      <div id="alert" className="alert alert-success mt-0" role="alert">
    Saved!
    </div>

    </main>
    // </div> 
    //   <div class="area" >
    //   <ul class="circles">
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //         </ul>
    // </div >
    // </div> 
  );

}

export default PodcastView;

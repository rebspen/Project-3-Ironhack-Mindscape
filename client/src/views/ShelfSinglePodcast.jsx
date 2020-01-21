import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { getUsersPodcasts } from "./../services/books";
import { addPodcastToViewerShelf } from "./../services/books";
import { removePodcast } from "./../services/books";
import { FaSearch } from 'react-icons/fa';
import { IconContext } from "react-icons";
import YouTube from 'react-youtube';
import {addPodcastPost as addPodcastPostService} from './../services/posts'


import "./views.css";

class ShelfSingleBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      podcast: null,
      id: this.props.match.params.id,
      profile: this.props.match.params.profile,
      viewerId: this.props.user._id,
      longDes: false,
      shortDes: true
    };
    this.addPodcastToViewersProfile = this.addPodcastToViewersProfile.bind(this);
    this.removeThisPodcast = this.removeThisPodcast.bind(this);
    this.readLess = this.readLess.bind(this);
    this.readMore = this.readMore.bind(this);
  }

  async componentDidMount() {
    //console.log("component mounted - I am getting the book..");
    const $alert = document.getElementById("alert");
    $alert.style.visibility = "hidden";
    try {
      const podcasts = await getUsersPodcasts(this.state.profile);
      let podcast = [];
      for (let i = 0; i < podcasts.length; i++) {
        if (podcasts[i]._id === this.state.id) {
          podcast = podcasts[i];
        }
      }
      this.setState({
        podcast
      });
    } catch (error) {
      console.log(error);
    }
  }

  async addPodcastToViewersProfile(event) {
    event.preventDefault();
    const podObject = this.state.podcast;
    const $alert = document.getElementById("alert");
    const user = this.props.user;
    $alert.style.visibility = "visible";
    try {
     // console.log('in the try of add podcast');
      const podcast = await addPodcastToViewerShelf(podObject);
      await addPodcastPostService({podcast, user});
     // console.log('step2. in the try of add podcast');
    } catch (error) {
      console.log(error);
    }
  }

  async removeThisPodcast(event) {
    event.preventDefault();
    const podId = this.state.podcast._id;
    try {
    await removePodcast(podId);
    window.scroll(0,0);
    this.props.history.push(`/podshelf/${this.state.profile}`);
      
    } catch (error) {
      console.log(error);
    }
  }

  async readMore(event){
    event.preventDefault();
    this.setState({
      longDes: true,
      shortDes: false
    });
  }

  async readLess(event){
    event.preventDefault();
    this.setState({
      longDes: false,
      shortDes: true
    });
  }

  render() {
    const isThisMyProfile = this.state.profile === this.state.viewerId;
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };
// console.log('heyyy');
    return (
    //   <div>
    // <div className="context" style ={{height: "100%"}}>
      <main
        className="p-3 App-layers"
        style={{ backgroundColor: "Transparent", color: "#787878" }}
      >
        {this.state.podcast && (
          <Fragment>
            <div className = "d-flex flex-column justify-content-center align-items-center">
            <h2 className="mt-4">{this.state.podcast.title}</h2>
            <br></br>
            <div className = "youdiv">
            <YouTube
            videoId={this.state.podcast.yUrl.split("/")[4].trim()}
            opts={opts}
            className ="youtube-shelf"
            />
            </div>
            <Link to={`/single/${this.state.podcast.title}`}>
            <IconContext.Provider value={{ color: "rgb(48, 67, 200)" }}>
            <div className ="mt-2">
            <FaSearch />
            </div>
            </IconContext.Provider>
            </Link>
            {this.state.shortDes && (<p className="m-3" style = {{textAlign: "center"}}>{(this.state.podcast.description).substring(0, 250) + "..."} <button onClick={this.readMore} style={{"backgroundColor":"Transparent", border: "none"}}> <span style={{"color":"#E3D353"}}>read more</span></button></p>)}
            {this.state.longDes && (<p className="m-3" style = {{textAlign: "center"}}>{this.state.podcast.description} <button onClick={this.readLess} style={{"backgroundColor":"Transparent", border: "none"}}> <span style={{"color":"#E3D353"}}>read less</span></button></p>)}
            {isThisMyProfile && (
                <button
                  className="btn m-1 mt-2 p-2"
                  style={{
                    backgroundColor: "#E3D353",
                    border: "2px solid white",
                    color: "white"
                  }}
                  onClick={this.removeThisPodcast}
                >
                  Remove
                </button>
            )}
            </div>

            {!isThisMyProfile && (
              <button
                className="btn m-1 mt-2 p-2"
                style={{
                  backgroundColor: "#f0f0f2",
                  border: "2px solid #E3D353",
                  color: "#E3D353"
                }}
                onClick={this.addPodcastToViewersProfile}
              >
                Add to your podshelf!
              </button>
            )}
          </Fragment>
        )}

        <div id="alert" className="alert alert-success mt-0" role="alert">
          Saved!
        </div>
      </main>
    //   </div>
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
}

export default ShelfSingleBook;

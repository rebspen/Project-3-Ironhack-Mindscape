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
      viewerId: this.props.user._id
    };
    this.addPodcastToViewersProfile = this.addPodcastToViewersProfile.bind(this);
    this.removeThisPodcast = this.removeThisPodcast.bind(this);
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

  render() {
    const isThisMyProfile = this.state.profile === this.state.viewerId;
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };
console.log('heyyy');
    return (
      <main
        className="p-3 container d-flex flex-column justify-content-center align-items-center"
        style={{ backgroundColor: "#f0f0f2", color: "#788FAD" }}
      >
        {this.state.podcast && (
          <Fragment>
            <h2>{this.state.podcast.title}</h2>
            <br></br>
            <div className = "d-flex flex-column justify-content-center align-items-center">
            <div style = {{width:"50%"}}>
            <YouTube
            videoId={this.state.podcast.yUrl.split("/")[4].trim()}
            opts={opts}
            className ="youtube-shelf"
            />
            </div>
            <Link to={`/single/${this.state.podcast.title}`}>
            <IconContext.Provider value={{ color: "#E3D353" }}>
            <div>
            <FaSearch />
            </div>
            </IconContext.Provider>
            </Link>
            <p style = {{textAlign: "center"}}>{this.state.podcast.description}</p>
            {isThisMyProfile && (
                <button
                  className="btn m-1 mt-2 p-2"
                  style={{
                    backgroundColor: "#f0f0f2",
                    border: "2px solid #E3D353",
                    color: "#E3D353"
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
    );
  }
}

export default ShelfSingleBook;

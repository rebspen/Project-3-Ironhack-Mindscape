import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getPosts as getPostsService } from "./../services/posts";
import { roundPicture as roundPictureService } from "./../services/PicturesCloudinary";
import ReactLoading from "react-loading";
import { IoMdContacts } from "react-icons/io";
import { IconContext } from "react-icons";
import { FaBookOpen} from "react-icons/fa";
import { FaHeadphones} from "react-icons/fa";




//--------- conditional function to use in the render() of the class class -------//
function checkPostIsFollow(post) {
  if (post.type === "follow") {
    return true;
  } else {
    return false;
  }
}

function checkPostIsPodcast(post) {
  if (post.type === "podcast") {
    return true;
  } else {
    return false;
  }
}

function checkPostIsBook(post) {
  if (post.type === "book") {
    return true;
  } else {
    return false;
  }
}
//--------------- CLASS --------------//

class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      limit: 4,
      notloaded: true
    };
    this.onLoadMore = this.onLoadMore.bind(this);
    this.scrollUp = this.scrollUp.bind(this);
    this.hasLength = this.hasLength.bind(this);
  }

  async componentDidMount() {
    const userLoggedIn = this.props.user;
    try {
      const posts = await getPostsService(userLoggedIn);
      //console.log('I got the posts in the view', posts)
      this.setState({
        posts: posts,
        notloaded: false
      });
    } catch (error) {
      // console.log("We didnt get the posts", error);
      throw error;
    }
  }

  onLoadMore() {
    this.setState({
      limit: this.state.limit + 4
    });
  }

  scrollUp() {
    window.scroll(0, 0);
  }

  hasLength(array) {
    if (array.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
    //   <div>
    // <div className="context" style ={{height: "100%"}}>
      <div className="mt-3 text-center m-3">
        <h3 className="mt-5 mb-3" style ={{color: "#787878"}}>Your News' Feed</h3>

        {this.state.posts && !this.hasLength(this.state.posts) && (
          <div className="m-3 mt-3" >
            <IconContext.Provider value={{ color: "#E3D353", size: "2em" }}>
              <IoMdContacts />
            </IconContext.Provider>
            There is no news from your friends journey.
            <br />
            <Link to="/user-list">Click here to find more friends!</Link>
          </div>
        )}

        {this.state.notloaded && (
          <div className='d-flex flex-row justify-content-center'>
          <ReactLoading
            type={"balls"}
            color={"#E3D353"}
            height={100}
            width={100}
          />
          </div>
        )}

        {this.state.posts &&
          this.state.posts.slice(0, this.state.limit).map(post =>
            checkPostIsBook(post) ? (
              <div
                className="d-flex card flex-row align-items-center justify-content-between m-2"
                key={post.id}
                style={{backgroundColor:"Transparent", border: "7px double #bfbfbf", borderRadius: "12px" }}
              >
                <div className=" p-2" style={{ width: "25%", color: "black" }}>
                  <Link to={`profile/${post.user._id}`} >
                    <img
                      src={roundPictureService(post.user.image)}
                      alt={post.user.username}
                      style={{ width: "40px", borderRadius:"180px" }}
                    />
                    <br />
                    {post.user.username}
                  </Link>
                </div>
                <div className="p-2" style={{ width: "50%", color:"black"  }}>
                  {post.content}
                  <div className="small text-right">
                  <br/>
                    On {post.time.substr(0, 10)} at {post.time.substr(11, 5)}.
                  </div>
                </div>
                <div
                  className="mr-2 ml-2 p-2 text-center"
                  style={{ width: "25%", color:"black"  }}
                >
                  <Link to={`/book/${post.title}`} >  <IconContext.Provider value={{ color: "#E3D353", size: "3em" }}>
              <FaBookOpen />
            </IconContext.Provider></Link>
                </div>
              </div>
            ) : checkPostIsFollow(post) ? (
              <div
                className="d-flex card flex-row align-items-center justify-content-between p-2 m-2"
                key={post.id}
                style={{backgroundColor:"Transparent", border: "7px double  #bfbfbf", borderRadius: "12px"}}
              >
                <div className="ml-2 p-2" style={{ width: "25%" }}>
                  <Link to={`profile/${post.user._id}`} >
                    <img
                      src={roundPictureService(post.user.image)}
                      alt={post.user.username}
                      style={{ width: "40px", borderRadius:"180px" }}
                    />
                    <br />
                    {post.user.username}
                  </Link>
                </div>
                <div className="p-2" style={{ width: "50%" }}>
                  {post.content}
                  <div className="small text-right">
                  <br/>
                    On {post.time.substr(0, 10)} at {post.time.substr(11, 5)}.
                  </div>
                </div>
                <div className="mr-2 p-2 text-center" style={{ width: "25%" }}>
                  <Link to={`profile/${post.followingUser._id}`}>
                    <img
                      src={roundPictureService(post.followingUser.image)}
                      alt={post.followingUser.username}
                      style={{ width: "40px", borderRadius:"180px" }}
                    />
                    <br />
                    {post.followingUser.username}
                  </Link>
                </div>
              </div>
            ) : checkPostIsPodcast(post) ? (
              <div
                className="d-flex card flex-row align-items-center justify-content-between p-2 m-2"
                key={post.id}
                style={{backgroundColor:"Transparent", border: "7px double #bfbfbf", borderRadius: "12px"}}
              >
                <div className="ml-2 p-2" style={{ width: "25%" }}>
                  <Link to={`profile/${post.user._id}`}>
                    <img
                      src={roundPictureService(post.user.image)}
                      alt={post.user.username}
                      style={{ width: "40px", borderRadius:"180px" }}
                    />
                    <br />
                    {post.user.username}
                  </Link>
                </div>
                <div className="p-2" style={{ width: "50%" }}>
                  {post.content}
                  <div className="small text-right">
                  <br/>
                    On {post.time.substr(0, 10)} at {post.time.substr(11, 5)}.
                  </div>
                </div>
                <div
                  className="mr-2 ml-2 p-2 text-center"
                  style={{ width: "25%" }}
                >
                  <Link to={`/podcast/${post.title}`} > <IconContext.Provider value={{ color: "#E3D353", size: "3em" }}>
              <FaHeadphones />
            </IconContext.Provider></Link>
                </div>
              </div>
            ) : (
              <div></div>
            )
          )}
        {this.state.posts && this.hasLength(this.state.posts) && (
          <div>
            <button
              onClick={this.onLoadMore}
              className="btn w-80 mt-3 ml-2"
              style={{ border: "2px solid #E3D353" }}
            >
              Load More
            </button>
            <button
              onClick={this.scrollUp}
              className="btn w-80 mt-3 ml-2"
              style={{ border: "2px solid #E3D353" }}
            >
              Go Up
            </button>
          </div>
        )}
      </div>
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

export default NewsFeed;

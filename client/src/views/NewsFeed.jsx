import React, { Component, Fragment } from "react";
import {Link } from "react-router-dom";
import {getPosts as getPostsService} from "./../services/posts";
import {roundPicture as roundPictureService} from './../services/PicturesCloudinary';
import ReactLoading from 'react-loading';


//--------- conditional function to use in the render() of the class class -------//
function checkPostIsFollow (post) {
if (post.type === 'follow') {
  return true
} else {
  return false
}
}
//--------------- CLASS --------------//

class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      limit: 5,
      notloaded: true
    };
    this.onLoadMore = this.onLoadMore.bind(this);
    this.scrollUp = this.scrollUp.bind(this);

  }
  
  async componentDidMount() {
    const userLoggedIn = this.props.user;
    try {
      const posts = await getPostsService(userLoggedIn);
      //console.log('I got the posts in the view', posts)
      this.setState({
        posts:posts,
        notloaded: false
      });
    } catch (error) {
      console.log('We didnt get the posts', error)
      throw error
    }
  }

  onLoadMore() {
    this.setState({
        limit: this.state.limit + 5
    });
}

scrollUp() {
  window.scroll(0,0)
}

  render() {
    return  (
    <div className='m-3 text-center'>
      <h1>Check your friends' Journey</h1>
      {this.state.notloaded && <ReactLoading type={'balls'} color={'#E3D353'} height={100} width={100} />}
      {this.state.posts && this.state.posts.slice(0,this.state.limit).map(post => 
      !checkPostIsFollow(post) && (
      <div className='d-flex card flex-row align-items-center justify-content-between p-2 m-2' key={post.id}>
      <div className='ml-2 p-2' style={{'width':'25%'}}><Link to={`profile/${post.user._id}`}>
      <img src={roundPictureService(post.user.image)} alt={post.user.username} style={{'width':'40px'}}/>
      <br/>
      {post.user.username}
      </Link>
      </div>
      <div className='p-2' style={{'width':'50%'}}>{post.content}
      <div className='small text-right'>On  {post.time.substr(0, 10)} at {post.time.substr(11, 5)}.</div>
      </div>
      <div className='mr-2 ml-2 p-2 text-center' style={{'width':'25%'}}><Link to={`/book/${post.title}`}>Check Book</Link></div>
      </div>) || checkPostIsFollow(post) && (

        <div className='d-flex card flex-row align-items-center justify-content-between p-2 m-2' key={post.id}>
        <div className='ml-2 p-2' style={{'width':'25%'}}><Link to={`profile/${post.user._id}`}>
      <img src={roundPictureService(post.user.image)} alt={post.user.username} style={{'width':'40px'}}/>
      <br/>
      {post.user.username}
      </Link>
      </div>
      <div className='p-2' style={{'width':'50%'}}>{post.content}
      <div className='small text-right'>On  {post.time.substr(0, 10)} at {post.time.substr(11, 5)}.</div>
      </div>
      <div className='mr-2 p-2 text-center' style={{'width':'25%'}}><Link to={`profile/${post.followingUser._id}`}>
      <img src={roundPictureService(post.followingUser.image)} alt={post.followingUser.username} style={{'width':'40px'}}/>
      <br/>
      {post.followingUser.username}
      </Link>
      </div>
      </div>
      )
      )}
      <button onClick={this.onLoadMore} className="btn m-3 text-white p-2 w-20" style={{"backgroundColor":"#444A6C"}}>Load More</button>
      <button onClick={this.scrollUp} className="btn m-3 text-white p-2 w-20" style={{"backgroundColor":"#444A6C"}}>Go Up</button>
      </div>
    )
  }
}

export default NewsFeed;

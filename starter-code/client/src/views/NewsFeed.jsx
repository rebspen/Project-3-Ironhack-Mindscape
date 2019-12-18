import React, { Component, Fragment } from "react";
import {Link, Redirect } from "react-router-dom";
import { FaDivide } from "react-icons/fa";
import {getPosts as getPostsService} from "./../services/posts";
import {roundPicture as roundPictureService} from './../services/PicturesCloudinary'

class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null
    };
  }
  
  async componentDidMount() {
    try {
      const posts = await getPostsService();
      console.log('I got the posts in the view', posts)
      this.setState({
        posts:posts
      });
    } catch (error) {
      console.log('We didnt get the posts', error)
      throw error
    }
  }

  render() {
    return  (
    <div className='m-3'>
      <h1>News Feed</h1>
      {this.state.posts && this.state.posts.map(post => <div className='d-flex card flex-row align-items-center justify-content-between p-2 m-2'>
      <div className='ml-2'><img src={roundPictureService(post.user.image)} alt={post.user.username} style={{'width':'40px'}}/>
      <br/>
      {post.user.username}
      </div>
      <div>{post.content}</div>
      <div className='mr-2'><Link to='/'>Check Book</Link></div>
      </div>)}
      </div>
    )
  }
}

export default NewsFeed;

import React, {Component} from "react";
import { Link } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import {roundPicture as roundPictureService} from './../services/PicturesCloudinary'



function rollUp() {
  window.scrollTo(0, 0);
}

class FollowedUsersCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: []
    };
  }

  componentDidMount() {
    const defaultPicture = {
      _id: this.props.user._id,
      image: "https://res.cloudinary.com/dgmvfq29c/image/upload/v1576778920/project-3-ironhack/mindmap_vtg9zk.png",
    };

    const test = this.props.data.push(defaultPicture);

    if (this.props.data.length <= 1) {
      this.setState({
        array: test
      });
    } else {
      this.setState({
        array: this.props.data
      });
    }
  }
  
  render() {
    //console.log(this.state.array);
    const usersArray = this.state.array;
      return (
        <Carousel className = "m-auto" centerMode = {true} emulateTouch = {true} centerSlidePercentage= {30} showStatus= {false} emulateTouch = {true} showIndicators = {false} showThumbs = {false} style = {{backgroundColor: "Transparent"}}>
        {usersArray && usersArray.map((val)=> {
            return  <Link to = {`/profile/${val._id}`} onClick={rollUp()}><div style = {{backgroundColor: "#c4cdd4", height:'100%'}} key={Math.random()}>
                 <img src={roundPictureService(val.image)} style ={{ width: '70%', backgroundColor: "#c4cdd4", borderRadius: "180px"}} />
              </div></Link>
          })}
          </Carousel>
      );
    }
};

export default FollowedUsersCarousel
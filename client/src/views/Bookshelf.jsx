import React, { Component } from 'react';
import { getUsersBooks as getUsersBooks } from './../services/books';
import BookCarousel from '../components/Carousel';
import { FaBookOpen} from "react-icons/fa";
import { IconContext } from "react-icons";

class Bookshelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId : this.props.match.params.id,
      viewerId : this.props.user._id,
      books: null
    }
  }

  async componentDidMount() {
    //console.log("component mounted - I am getting the books..", "bookshelf ID", this.state.userId, "viewer Id", this.state.viewerId)
    try {
      const books = await getUsersBooks(this.state.userId);
      //console.log("back in bookshelf", books)
      this.setState({
        books
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  render() {
    //console.log("props" , this.props.user._id)

    let saved = []
    let reading = []
    let finished = []

    if(this.state.books){
      saved = this.state.books.filter((val) => {if(val.status === "Saved"){ return val}})
      reading =  this.state.books.filter((val) => {if(val.status === "Reading"){ return val}})
      finished = this.state.books.filter((val) => {if(val.status === "Finished"){ return val}});
    }

   // console.log("C SPlIT", saved,reading,finished)
    return(
      <div className = "App-layers" style= {{color: "#3043C8"}}>
      <h2 className='text-dark my-4'>
      <IconContext.Provider value={{ color: "#E3D353"}}>
      <FaBookOpen/>
      </IconContext.Provider>
      <span className='pl-3'>Bookshelf</span></h2>
      <h5 className = "mt-4 text-dark">Saved</h5>
      <div className='text-center' style= {{width: "40%"}} >
      {this.state.books && <BookCarousel data = {saved.reverse()} profile = {this.state.userId} />}
      </div>
      <h5 className = "mt-4 text-dark">Reading</h5>
      <div style= {{width: "40%"}}>
      {this.state.books && <BookCarousel data = {reading.reverse()} profile = {this.state.userId} />}
      </div>
      <h5 className = "mt-4 text-dark">Finished</h5>
      <div style= {{width: "40%"}}>
      {this.state.books && <BookCarousel data = {finished.reverse()} profile = {this.state.userId} />}
      </div>
      </div>
      )
    }
  }
  
  export default Bookshelf

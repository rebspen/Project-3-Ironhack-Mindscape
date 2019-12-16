import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { getUsersBooks as getUsersBooks } from './../services/books';
import BookCarousel from '../components/Carousel';

class Bookshelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null
    }
  }

  async componentDidMount() {
    console.log("component mounted - I am getting the books..")
    try {
      const books = await getUsersBooks();
      console.log("back in bookshelf", books)
      this.setState({
        books
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  render() {
    let saved = []
    let reading = []
    let finished = []

    if(this.state.books){
      saved = this.state.books.filter((val) => {if(val.status === "Saved"){ return val}})
      reading =  this.state.books.filter((val) => {if(val.status === "Reading"){ return val}})
      finished = this.state.books.filter((val) => {if(val.status === "Finished"){ return val}});
    }

    if(saved.length < 2){
      saved.push({ image : "../mindmap.png", _id: 0 })
    }
    if(reading.length < 2){
      reading.push({ image : "../mindmap.png", _id: 0 })
    }

    if(finished.length < 2){
      finished.push({ image : "../mindmap.png", _id: 0 })
    }

    console.log("C SPlIT", saved,reading,finished)
    return(
      <div className = "App-layers" style= {{color: "#788FAD"}}>
      <h2>Bookshelf</h2>
      <h5 className = "mt-4">Saved</h5>
      {this.state.books && <BookCarousel data = {saved}/>}
      <h5 className = "mt-4">Reading</h5>
      {this.state.books && <BookCarousel data = {reading}/>}
      <h5 className = "mt-4">Finished</h5>
      {this.state.books && <BookCarousel data = {finished}/>}
      </div>
      )
    }
  }
  
  export default Bookshelf

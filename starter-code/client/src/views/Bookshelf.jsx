import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { getUsersBooks as getUsersBooks } from './../services/books';

class Bookshelf extends Component {
  constructor(props) {
    super(props);
    this.setState = {
      user: this.props.user,
      books: null
    }
  }

  async componentDidMount() {
    try {
      const books = await getUsersBooks(this.state.user);
      this.setState({
        books: books
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  render() {
    //We get the user data from App.jsx.
    
    return(
      <div>
      <h1>Bookshelf</h1>
      <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
      <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
      <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
      <div class="carousel-item active">
      <img src="..." class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
      <h5>First Book</h5>
      <p>Author</p>
      </div>
      </div>
      <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
      <h5>Second Book</h5>
      <p>Author</p>
      </div>
      </div>
      <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
      <h5>Third Book</h5>
      <p>Author</p>
      </div>
      </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
      </a>
      </div>
      </div>
      )
    }
  }
  
  export default Bookshelf

import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { getUsersBooks } from "./../services/books";
import { changeBookStatus } from "./../services/books";
import { addBookToViewerShelf } from "./../services/books";
import { removeBook } from "./../services/books";
import { FaSearch } from 'react-icons/fa';
import { IconContext } from "react-icons";
import {addPostReading as addPostReadingService} from './../services/posts';
import {addPostRemoved as addPostRemovedService} from './../services/posts'


class ShelfSingleBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null,
      id: this.props.match.params.id,
      profile: this.props.match.params.profile,
      viewerId: this.props.user._id
    };
    this.handleSubmission = this.handleSubmission.bind(this);
    this.addBookToViewersProfile = this.addBookToViewersProfile.bind(this);
    this.removeThisBook = this.removeThisBook.bind(this);
  }

  async componentDidMount() {
    //console.log("component mounted - I am getting the book..");
    const $alert = document.getElementById("alert");
    $alert.style.visibility = "hidden";
    try {
      const books = await getUsersBooks(this.state.profile);
      let book = [];
      for (let i = 0; i < books.length; i++) {
        if (books[i]._id === this.state.id) {
          book = books[i];
        }
      }
      this.setState({
        book
      });
    } catch (error) {
      console.log(error);
    }
  }

  async handleSubmission(event) {
    event.preventDefault();
   // console.log("I am at handle submission form", this.state.id);
    try {
      window.scroll(0,0);
      await changeBookStatus(this.state.id)
        .then(this.props.history.push(`/bookshelf/${this.state.profile}`))
        .then(addPostReadingService(this.state.book))
        .catch(err => {
          console.log("couldnt change book status due to", err);
        });
    } catch (error) {
      console.log(error);
      //create a redirect to error page
    }
  }

  async addBookToViewersProfile(event) {
    event.preventDefault();
    const bookObject = this.state.book;
    const $alert = document.getElementById("alert");
    //console.log("alert", $alert);
    $alert.style.visibility = "visible";
    //console.log(bookObject);
    try {
      const book = await addBookToViewerShelf(bookObject);
    } catch (error) {
      console.log(error);
    }
  }

  async removeThisBook(event) {
    event.preventDefault();
    const bookId = this.state.book._id;
    try {
      const book = await removeBook(bookId)
        .then(this.props.history.push(`/bookshelf/${this.state.profile}`))
        .then(addPostRemovedService(this.state.book))
        .catch(err => {
          console.log("couldnt remove book due to", err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const isThisMyProfile = this.state.profile === this.state.viewerId;

    return (
      <div>
    <div className="context" style ={{height: "100%"}}>
      <main
        className=" mt-3 p-3 container d-flex flex-column justify-content-center align-items-center"
        style={{ backgroundColor: "Transparent", color: "#787878", textAlign:"center" }}
      >
        {this.state.book && (
          <Fragment>
            <h2>{this.state.book.title}</h2>
            <br></br>
            <img src={this.state.book.image} alt="book cover" />
            <p className=" mt-1 mb-0 ">{this.state.book.author}</p>
            <Link to={`/single/${this.state.book.title}`}>
            <IconContext.Provider value={{ color: "rgb(48, 67, 200)" }}>
            <div>
            <FaSearch/>
            </div>
            </IconContext.Provider>
            </Link>
            <p className="m-3">{this.state.book.description}</p>
            {isThisMyProfile && (
              <div className = "App-layers">
                {this.state.book.status === "Saved" ? (
                  <button
                    onClick={this.handleSubmission}
                    className="btn w-80 mt-3"
                    style={{ backgroundColor: "#E3D353", border: "2px solid white", color: "white" }}
                  >
                    Change to Reading
                  </button>
                ) : null}
                {this.state.book.status === "Reading" ? (
                  <button
                    onClick={this.handleSubmission}
                    className="btn w-80 mt-3"
                    style={{ backgroundColor: "#E3D353", border: "2px solid white", color: "white" }}
                  >
                    Mark as Finished
                  </button>
                ) : null}

                <button
                  className="btn m-1 mt-2 p-2"
                  style={{
                    backgroundColor: "#E3D353",
                    border: "2px solid white",
                    color: "white"
                  }}
                  onClick={this.removeThisBook}
                >
                  Remove
                </button>
              </div>
            )}

            {!isThisMyProfile && (
              <button
                className="btn m-1 mt-2 p-2"
                style={{
                  backgroundColor: "#f0f0f2",
                  border: "2px solid #E3D353",
                  color: "#E3D353"
                }}
                onClick={this.addBookToViewersProfile}
              >
                Add to your bookshelf!
              </button>
            )}
          </Fragment>
        )}

        <div id="alert" className="alert alert-success mt-0" role="alert">
          Saved!
        </div>
      </main>
      </div>
      <div class="area" >
      <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
    </div> 
    );
  }
}

export default ShelfSingleBook;

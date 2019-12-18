import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { getUsersBooks } from "./../services/books";
import { changeBookStatus } from "./../services/books";
import { addBookToViewerShelf } from "./../services/books";
import { removeBook } from "./../services/books";
import { magnifier } from "./magnifier.png";
import { FaSearch } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { AiOutlineDelete } from 'react-icons/fa'
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
    console.log("I am at handle submission form", this.state.id);
    try {
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
      <main
        className="p-3 container d-flex flex-column justify-content-center align-items-center"
        style={{ backgroundColor: "#f0f0f2", color: "#788FAD" }}
      >
        {this.state.book && (
          <Fragment>
            <h2>{this.state.book.title}</h2>
            <img src={this.state.book.image} alt="book cover" />
            <p>{this.state.book.author}</p>
            <Link to={`/single/${this.state.book.title}`}>
            <IconContext.Provider value={{ color: "#E3D353" }}>
            <div>
            <FaSearch/>
            </div>
            </IconContext.Provider>
            </Link>
            <p>{this.state.book.description}</p>
            {isThisMyProfile && (
              <div className = "App-layers">
                {this.state.book.status === "Saved" ? (
                  <button
                    onClick={this.handleSubmission}
                    className="btn w-80 mt-3"
                    style={{ border: "2px solid #E3D353", color: "#E3D353" }}
                  >
                    Change to Reading
                  </button>
                ) : null}
                {this.state.book.status === "Reading" ? (
                  <button
                    onClick={this.handleSubmission}
                    className="btn w-80 mt-3"
                    style={{ border: "2px solid #E3D353", color: "#E3D353" }}
                  >
                    Mark as Finished
                  </button>
                ) : null}

                <button
                  className="btn m-1 mt-2 p-2"
                  style={{
                    backgroundColor: "#f0f0f2",
                    border: "2px solid #E3D353",
                    color: "#E3D353"
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
    );
  }
}

export default ShelfSingleBook;

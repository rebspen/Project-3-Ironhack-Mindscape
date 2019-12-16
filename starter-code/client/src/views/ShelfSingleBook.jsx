import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { getUsersBooks } from "./../services/books";
import { changeBookStatus } from "./../services/books";

class ShelfSingleBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null,
      id: props.match.params.id
    };
    this.handleSubmission = this.handleSubmission.bind(this);
  }

  async componentDidMount() {
    console.log("component mounted - I am getting the book..");
    try {
      const books = await getUsersBooks();
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
        .then(this.props.history.push(`/bookshelf`))
        .catch(err => {
          console.log("couldnt change book status due to", err);
        });
    } catch (error) {
      console.log(error);
      //create a redirect to error page
    }
  }

  render() {
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
            <Link to = {`/single/${this.state.book.title}`}> <img src="../magnifier.png" alt= "search" style={{ width:"1em" }}/></Link>
            <p>{this.state.book.description}</p>
            <div>
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

            </div>
          </Fragment>
        )}
      </main>
    );
  }
}

export default ShelfSingleBook;

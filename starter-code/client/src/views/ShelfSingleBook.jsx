import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { getUsersBooks as getUsersBooks } from './../services/books';

class ShelfSingleBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null,
      id : props.match.params.id
    }
  }

  async componentDidMount() {
    console.log("component mounted - I am getting the books..")
    try {
      const books = await getUsersBooks();
      console.log("back in bookshelf", books, typeof parseInt(this.state.id));
      let book = []
      for(let i=0; i< books.length; i++){
        console.log(typeof books[i]._id)
        if(books[i]._id === this.state.id){
          book = books[i]
        }
      }
      console.log("BOOOOOOK", this.state.id, book )
      this.setState({
        book
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  render() {

    return(
      <main className='p-3 container d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: "#f0f0f2", color: "#788FAD"}}>
       {this.state.book && 
       <Fragment>
       <h2>{this.state.book.title}</h2>
       <img src={this.state.book.image} alt="book cover"/>
       <p>{this.state.book.author}</p>
       <p>{this.state.book.description}</p>
       <div>
       {this.state.book.status === 'Saved'? <button className="btn w-80 mt-3" style ={{border: "2px solid #E3D353", color: "#E3D353"}}>Change to Reading</button> : null }
       {this.state.book.status === 'Reading'? <button className="btn w-80 mt-3" style ={{border: "2px solid #E3D353", color: "#E3D353" }}>Mark as Finished</button> : null }
       </div>
       </Fragment>
       }
      </main>
    )
  }
}
  
  export default ShelfSingleBook;

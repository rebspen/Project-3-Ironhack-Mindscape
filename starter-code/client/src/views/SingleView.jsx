import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import {createBook as addBookToShelf} from './../services/books'
import axios from 'axios';

import "./views.css";


const googleKey = 'AIzaSyB-EK_PvmiBu1I5dfiocm49AvrnBJWphWM';
//Please, put this key in .env.

function SingleView (props) {

    //Getting book name from url
    const id = props.match.params.id;
    
    //Getting the user, check if he is signed in;
    const user=props.user;

    //Setting states
    let [book, setBook] = useState("");
    const [result, setResults] = useState({});
    let [loaded, setLoad] = useState('');
  
    //Getting book details from Google Books API
    function handleBookSearch () {
      axios.get("https://www.googleapis.com/books/v1/volumes?q=intitle:" + book + "&key=" + googleKey + "&maxResults=40")
      .then(data => {
        const result = data.data.items[0];
        setResults(result);
        setLoad(true);
      })
      .catch(err => {
        console.log('Couldnt reach API', err);
      });
    }
  
    //Calls the axios function to get the API after this page was mounted
    useEffect(() => {
      setBook(book = id);
      window.scrollTo(0, 0);
      //to scroll to the top of the page after loading the info.
      return handleBookSearch()
    },[]);

    //Add the book to the users' profile and book model
    // function addBookToUsersProfile() {
    //   const bookObject = result;
    //   console.log("button clicked",bookObject);
    //   try {
    //     const book = addBookToShelf(bookObject);
    //     this.props.history.push(`/profile`);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
      
      async function addBookToUsersProfile(event) {
        event.preventDefault();
        const bookObject = result;
        console.log(bookObject);
        try {
          const book = await addBookToShelf(bookObject)
        } catch (error) {
          console.log(error);
        }
      }
      
      

    return (
      <main className='p-3 container d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: "#f0f0f2"}}>
       <h2 style= {{color: "#788FAD"}}>{id}</h2>
       {loaded && 
       <Fragment>
       <img src={result.volumeInfo.imageLinks.thumbnail} alt="test"/>
       <ul className='text-left App-layers' style= {{color: "#788FAD"}}>
       <li key='2'><div >Author: {result.volumeInfo.authors.map(author => author + ',')}</div></li>
          {result.volumeInfo.averageRating && <li key='4'><div >Rating: {result.volumeInfo.averageRating}/5</div></li>}
          {result.volumeInfo.description && <li key='3'><div style= {{textAlign: "center"}} >Description: {(result.volumeInfo.description).substring(0, 250) + "..."}</div></li>}
          {result.saleInfo.buyLink && <li key='5'><div><a href = {result.saleInfo.buyLink} style= {{color:"#E3D353"}} >Read more</a> </div></li> }
       
          {user && <button className="btn m-3 mt-5 p-2" style={{"backgroundColor":"#f0f0f2", border: "2px solid #E3D353", color:"#E3D353"}} onClick={addBookToUsersProfile}>Add to your book shelf!</button> }
          {!user && <span className='mt-5 text-right d-flex'><Link to='/login'>Log in</Link> or <Link to='/signup'>Sign Up</Link> to continue your journey!</span>}
       </ul>
       </Fragment>
       }
      </main>
    );
}

export default SingleView;

// Book parameters in Google Books API: https://developers.google.com/books/docs/v1/reference/volumes
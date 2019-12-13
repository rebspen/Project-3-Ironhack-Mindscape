import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import "./views.css";


const googleKey = 'AIzaSyB-EK_PvmiBu1I5dfiocm49AvrnBJWphWM';
//Please, put this key in .env.

function SingleView (props) {

    //Getting book name from url
    const id = props.match.params.id;

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
      return handleBookSearch()
    },[]);

    //Adds the book to the users' profile
    function addBookToUsersProfile() {
      const bookObject = result;
      console.log(bookObject);
    }

    return (
      <main className='p-3 container d-flex flex-column box-shadow justify-content-center align-items-center' style={{"backgroundColor":"white"}}>
       <h1> {id} </h1>
       {loaded && 
       <Fragment>
       <img src={result.volumeInfo.imageLinks.thumbnail} alt="test"/>
       <ul className='text-left'>
       <li key='1'><div>Title: {result.volumeInfo.title} </div></li>
       <li key='2'><div>Author: {result.volumeInfo.authors.map(author => author + ',')}</div></li>
      {result.volumeInfo.description && <li key='3'><div>Description: {result.volumeInfo.description}</div></li>}
      {result.volumeInfo.averageRating && <li key='4'><div>Rate: {result.volumeInfo.averageRating}</div></li>}
      {result.saleInfo.buyLink && <li key='5'><div>Sales Link: {result.saleInfo.buyLink}</div></li> }
       <button className="btn m-3 text-white p-2" style={{"backgroundColor":"#444A6C"}} onClick={addBookToUsersProfile}>Add to your book shelf!</button>
       </ul>
       </Fragment>
       }
      </main>
    );
}

export default SingleView;

// Book parameters in Google Books API: https://developers.google.com/books/docs/v1/reference/volumes
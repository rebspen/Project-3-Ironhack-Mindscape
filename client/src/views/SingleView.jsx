import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import {createBook as addBookToShelf} from './../services/books'
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { IconContext } from "react-icons";
import ReactLoading from 'react-loading';
import {addPost as addPostService} from './../services/posts'


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
  const [loadedPicture, setLoaded] = useState(true);

  
  //Getting book details from Google Books API
  function handleBookSearch () {
    axios.get("https://www.googleapis.com/books/v1/volumes?q=intitle:" + book + "&key=" + googleKey + "&maxResults=40")
    .then(data => {
      const result = data.data.items[0];
      setResults(result);
      setLoad(true);
      setLoaded(false);
    })
    .catch(err => {
      console.log('Couldnt reach API', err);
    });
  }
  
  //Calls the axios function to get the API after this page was mounted
  useEffect(() => {
    const $alert = document.getElementById("alert")
    $alert.style.visibility = 'hidden'
    setBook(book = id);
    window.scrollTo(0, 0);
    //to scroll to the top of the page after loading the info.
    return handleBookSearch()
  },[]);

  
  async function addBookToUsersProfile(event) {
    event.preventDefault();
   // console.log('clicked in add book');
    const bookObject = result;
    const $alert = document.getElementById("alert")
    //console.log("alert", $alert)
    $alert.style.visibility = 'visible'; 
    //console.log(bookObject);
    try {
      const book = await addBookToShelf(bookObject);
      //console.log('book added', book);
      await addPostService(bookObject);
    } catch (error) {
      console.log(error);
    }
  }
  
  
  
  return (
    <main className='p-3 container d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: "#f0f0f2"}}>
    <h2 style= {{color: "#788FAD", textAlign: "center"}}>{id}</h2>
    {loadedPicture && <ReactLoading type={'balls'} color={'#E3D353'} height={100} width={100} />}
    {loaded && 
      <Fragment>
      <img src={result.volumeInfo.imageLinks.thumbnail} alt="test"/>
      <div className='text-left App-layers p-auto mb-0' style= {{color: "#788FAD"}}>
      <div >Author: {result.volumeInfo.authors.map(author => author + ',')}</div>
      <Link to={`/single/${id}`}>
      <IconContext.Provider value={{ style: { width: "5em", color: "#E3D353" } }}>
      <div>
      <FaSearch/>
      </div>
      </IconContext.Provider>
      </Link>
      {result.volumeInfo.averageRating && <div >Rating: {result.volumeInfo.averageRating}/5</div>}
      {result.volumeInfo.description &&<div style= {{textAlign: "center"}} >Description: {(result.volumeInfo.description).substring(0, 250) + "..."}</div>}
      {result.saleInfo.buyLink && <div><a href = {result.saleInfo.buyLink} style= {{color:"#E3D353"}} >Read more</a> </div>}
      {user && <button className="btn m-1 mt-2 p-2" style={{"backgroundColor":"#f0f0f2", border: "2px solid #E3D353", color:"#E3D353"}} onClick={addBookToUsersProfile}>Add to your bookshelf!</button> }
      {!user && <span className='mt-5 text-right d-flex'><Link to='/login'>Log in</Link> or <Link to='/signup'>Sign Up</Link> to continue your journey!</span>}
      </div>
      </Fragment>
    }
    <div id="alert" className="alert alert-success mt-0" role="alert">
    Saved!
    </div>
    
    </main>
    );
  }
  
  export default SingleView;

// Book parameters in Google Books API: https://developers.google.com/books/docs/v1/reference/volumes
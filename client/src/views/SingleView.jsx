import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import {createBook as addBookToShelf} from './../services/books'
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { IconContext } from "react-icons";
import ReactLoading from 'react-loading';
import {addPost as addPostService} from './../services/posts'
import {googleApiKey as googleKey} from './../App';


import "./views.css";


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
  let [shortDescription, setShortDes]= useState(true);
  let [longDescription, setLongDes]= useState(false);

  
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

  async function readMore(event){
    event.preventDefault();
   // console.log('clicked on read more');
    setShortDes(false);
    setLongDes(true);
  }

  async function readLess(event){
    event.preventDefault();
   // console.log('clicked on read less');
    setShortDes(true);
    setLongDes(false);
  }
  
  
  
  return (
    // <div>
    // <div className="context" style ={{height: "100%"}}>
    <main className='p-3 mt-3 container d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: "Transparent"}}>
    <h2 style= {{color: "#787878", textAlign: "center"}}>{id}</h2>
    <br></br>
    {loadedPicture && <ReactLoading type={'balls'} color={'#E3D353'} height={100} width={100} />}
    {loaded && 
      <Fragment>
      <img style={{border: "7px double white"}} src={result.volumeInfo.imageLinks.thumbnail} alt="test"/>
      <div className='text-left App-layers p-auto mb-0' style= {{color: "#787878"}}>
      <div >Author: {result.volumeInfo.authors.map(author => author + ',')}</div>
      <Link to={`/single/${id}`}>
      <IconContext.Provider value={{ style: { width: "5em", color: "rgb(48, 67, 200)" } }}>
      <div>
      <FaSearch/>
      </div>
      </IconContext.Provider>
      </Link>
      {result.volumeInfo.averageRating && <div >Rating: {result.volumeInfo.averageRating}/5</div>}
      {result.volumeInfo.description && shortDescription && <div style= {{textAlign: "center"}} >Description: {(result.volumeInfo.description).substring(0, 250) + "..."} <button onClick={readMore} style={{"backgroundColor":"Transparent", border: "none"}}> <span style={{"color":"#E3D353"}}>read more</span></button></div>}
      {result.volumeInfo.description && longDescription && <div style= {{textAlign: "center"}} >Description: {result.volumeInfo.description} <button onClick={readLess} style={{"backgroundColor":"Transparent", border: "none"}}><span style={{"color":"#E3D353"}}>read less</span></button></div>}
      {result.saleInfo.buyLink && <div><a href = {result.saleInfo.buyLink} style= {{color:"rgb(48, 67, 200)"}} >See more on Google books</a> </div>}
      {user && <button className="btn m-1 mt-2 p-2" style={{"backgroundColor":"#E3D353", border: "2px solid white", color:"white"}} onClick={addBookToUsersProfile}>Add to your bookshelf!</button> }
      {!user &&
       <div className='mt-1  d-flex flex-column align-items-center'><Link to='/login'>Log in</Link><span className='pr-1 pl-1'>or </span> <Link to='/signup'>Sign Up</Link> <span className='pl-1'>to continue your journey!</span></div>}
      </div>
      </Fragment>
    }
    <div id="alert" className="alert alert-success mt-0" role="alert">
    Saved!
    </div>
    </main>
    // </div>
    //   <div class="area" >
    //   <ul class="circles">
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //         </ul>
    // </div >
    // </div>
    );
  }
  
  export default SingleView;

// Book parameters in Google Books API: https://developers.google.com/books/docs/v1/reference/volumes
// <div className= "m-3"><a href = "https://book-celler.herokuapp.com/" style= {{color:"rgb(48, 67, 200)"}} >Buy second hand on The Book Cellar</a> </div>

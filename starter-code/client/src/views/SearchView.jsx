import { Link } from 'react-router-dom';
import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { networkInterfaces } from 'os';
import { runInNewContext } from 'vm';

import "./views.css"

const themes = [
  {
    id: 0,
    name: "I am woman",
    imageURL: "./6.png",
    titles: [
      "women who run with the wolves",
      "men explain things to me",
    ]
  },
  {
    id: 1,
    name: "Utopia",
    imageURL: "./9.png",
    titles: [
      "The handmaids tale",
      "1985",
    ]
  }
];


function SearchView (props) {
  
  const [result, setResults] = useState([]);
  
  function handleSearchSubmission () {
    const id = props.match.params.id
    const book1 = themes[id].titles[0]
    const book2 = themes[id].titles[1]
    const book3 = themes[id].titles[2]
    console.log(book1,book2,book3)
    axios.get("https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q="+ book1 + "," + book2 + "&k=351127-cheeta-8Z5VDMQU&type=books")
    .then(data => {
      const final = data.data.Similar.Results
      final.unshift(data.data.Similar.Info[0])
      final.unshift(data.data.Similar.Info[1])
      console.log(final)
      setResults(final);
    })
    .catch(err => {
      console.log('Couldnt reach API', err);
    });
  }
  
  useEffect(() => {
    return handleSearchSubmission()
  },[]);
  
  // console.log(id)
  
  return (
    <main className = "App-layers">
    <h1>Search Results</h1>
    <div>
    {result.map((val)=>{ return <Link to={`/book/${val.Name}`}><div class="card"> <div class="card-body p-1"><h6 className ="m-0">{val.Name}</h6><p className ="mt-1 mb-0">{val.Type}</p></div></div> </Link>})}
    </div>
    </main>
    );
    
  }

export default SearchView;
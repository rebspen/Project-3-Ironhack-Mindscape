import { Link } from 'react-router-dom';
import React, { useState } from 'react';
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
      "a room of ones own"
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

  function handleSearchSubmission (event) {
    event.preventDefault();
    const id = props.match.params.id
    const book1 = themes[id].titles[0]
    const book2 = themes[id].titles[1]
    const book3 = themes[id].titles[2]
    axios.get("https://tastedive.com/api/similar?q=" + book1 + "&k=351127-mindspan-KW9IZ29K&type=books")
    .then(data => {
      console.log(data)
      setResults(data);
    })
    .catch(err => {
      console.log('Couldnt reach API', err);
    });
  }

  // componentDidMount(){
  //   handleSearchSubmission()
  // }

  // console.log(id)
  
    return (
      <main className = "App-layers">
      <h1>Search Results</h1>
      <div>
      </div>
      </main>
    );
  
}

export default SearchView;
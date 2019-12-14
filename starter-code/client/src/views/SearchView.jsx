import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { networkInterfaces } from "os";
import { runInNewContext } from "vm";

import "./views.css";
import themes from "./themes";

//this shuffle is to make sure their is a new search if they look at themes more than once.

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function SearchView(props) {
  const id = Number(props.match.params.id);
  const [result, setResults] = useState([]);
  const [image, setImage] = useState([]);

  function handleSearchSubmission() {
    const id = props.match.params.id;
    const category = themes.filter((val) => { if(val.id === parseInt(id)) {return val}})
    const titles = category[0].titles
    const image = category[0].imageURL
    setImage(image)
    console.log("themes", themes)
    console.log("titles", titles)
    const bookArr = shuffle(titles);
    const book1 = bookArr[0];
    const book2 = bookArr[1];
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=" +
          book1 +
          "," +
          book2 +
          "&k=351127-cheeta-8Z5VDMQU&type=books"
      )
      .then(data => {
        const final = data.data.Similar.Results;
        final.unshift(data.data.Similar.Info[0]);
        final.unshift(data.data.Similar.Info[1]);
        setResults(final);
      })
      .catch(err => {});
  }

  useEffect(() => {
    return handleSearchSubmission();
  }, []);

  return (
    <main className="App-layers">
      <img src = {image}/>
      <div>
        {result.map(val => {
          return (
            <Link to={`/book/${val.Name}`}>
              <div class="card">
                {" "}
                <div class="card-body p-1">
                  <h6 className="m-0">{val.Name}</h6>
                  <p className="mt-1 mb-0">{val.Type}</p>
                </div>
              </div>{" "}
            </Link>
          );
        })}
      </div>
    </main>
  );
}

export default SearchView;

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { networkInterfaces } from "os";
import { runInNewContext } from "vm";
import ReactLoading from 'react-loading';


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
  const [loaded, setLoaded] = useState(true);

  function handleSearchSubmission() {
    const id = props.match.params.id;
    const category = themes.filter((val) => { if(val.id === parseInt(id)) {return val}})
    const titles = category[0].titles
    const image = category[0].imageURL
    const podcast = category[0].podcasts[0]
    const podcast2 = category[0].podcasts[1]
    setImage(image)
    const bookArr = shuffle(titles);
    const book1 = bookArr[0];
    const book2 = bookArr[1];
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=" +
          book1 +
          "," +
          book2 +
          "," +
          podcast +
          "," +
          podcast2 +
          "&k=351127-cheeta-8Z5VDMQU"
      )
      .then(data => {
        const final = data.data.Similar.Results;
        final.unshift(data.data.Similar.Info[2]);
        final.unshift(data.data.Similar.Info[0]);
        final.unshift(data.data.Similar.Info[3]);
        final.unshift(data.data.Similar.Info[1]);
        const filtered = final.filter((val,index) => { if(val.Type === "book" || val.Type === "podcast"){ return val}})
        console.log("filtered", filtered)
        setResults(filtered);
        setLoaded(false);
      })
      .catch(err => {});
  }

  useEffect(() => {
    return handleSearchSubmission();
  }, []);

  return (
    <main className="App-layers text-center">
      <img style={{width:"30%"}}  src = {image} />
      {loaded && <ReactLoading type={'balls'} color={'#E3D353'} height={100} width={100} />}
      <div>
        {result.map(val => {
          return (
            <Link to={`/${val.Type}/${val.Name}`}>
              <div class="card mb-2" style={{border: "#f0f0f2", backgroundColor: "#f0f0f2"}}>
                {" "}
                <div class="card-body p-1">
                  <h6 className="m-0" style={{color: "#788FAD"}}>{val.Name}</h6>
                  <p className="mt-1 mb-0" style={{color: "#444A6C"}}>{val.Type}</p>
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

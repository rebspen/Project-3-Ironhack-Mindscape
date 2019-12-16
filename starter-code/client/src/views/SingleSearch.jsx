import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { networkInterfaces } from "os";
import { runInNewContext } from "vm";

import "./views.css";
import themes from "./themes";

function SingleSearch(props) {
  
  const [result, setResults] = useState([]);
  const [image, setImage] = useState([]);

  function handleSearchSubmission() {
    const title = props.match.params.title;
    console.log("Title", title)
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=" +
        title
        +
        "&k=351127-cheeta-8Z5VDMQU&type=books"
      )
      .then(data => {
        setResults(data.data.Similar.Results);
        console.log(result)
      })
      .catch(err => {});
  }

  useEffect(() => {
    return handleSearchSubmission();
  }, []);

  return (
    <main className="App-layers text-center">
    <h2 style={{color: "#788FAD"}} >Book Search : {props.match.params.title}</h2>
    <br></br>
      <div>
        {result.map(val => {
          return (
            <Link to={`/book/${val.Name}`}>
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

export default SingleSearch;

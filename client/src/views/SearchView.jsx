import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from 'react-loading';
import { FaPodcast } from 'react-icons/fa';
import { FaBookOpen } from 'react-icons/fa';
import { IconContext } from "react-icons";


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
    console.log("i am at the handle submission")
    const id = props.match.params.id
    const category = themes.filter((val) => { if(val.id === parseInt(id)) {return val}})
    console.log("cat", category)
    const titles = category[0].titles
    const image = category[0].imageURL
    const podcasts = category[0].podcasts
    console.log("pod", category[0].podcasts)
    const podcastArr = shuffle(podcasts)
    console.log("pod2", podcastArr)
    setImage(image)
    const bookArr = shuffle(titles);
    const podcast = podcastArr[0]
    console.log("pod3", podcast)
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
          "&k=351127-cheeta-8Z5VDMQU"
      )
      .then(data => {
        console.log("response", data.data.Similar.Results)
        const final = data.data.Similar.Results;
        final.unshift(data.data.Similar.Info[2]);
        final.unshift(data.data.Similar.Info[0]);
        final.unshift(data.data.Similar.Info[1]);
        const filteredpercentage = final.filter((val,index) => { if(!val.Name.includes("%")){ return val}})
        console.log("%", filteredpercentage)
        const filtered = filteredpercentage.filter((val,index) => { if(val.Type === "book" || val.Type === "podcast"){ return val}})
        console.log("filtered", filtered)
        setResults(filtered);
        setLoaded(false);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    return handleSearchSubmission();
  }, []);
  
  return (
    <div>
     <div className="context" style ={{height: "100%"}}>
    <main className="App-layers text-center">
    <img className = "theme-img" style={{width:"30%", border: "3px solid white", borderRadius: "12px"}}  src = {image} />
    {loaded && <ReactLoading type={'balls'} color={'#E3D353'} height={100} width={100} />}
    <br></br>
    <div>
    {result.slice(0,12).map(val => {
      return (
        <Link to={`/${val.Type}/${val.Name}`} key={Math.random()}>
        <div className="card mb-2" style={{border: "#f0f0f2", backgroundColor: "Transparent"}}>
        {" "}
        <div className="card-body p-1 d-flex flex-row">
        <IconContext.Provider className=" m-0" value={{ style: { width: "5em", color: "#E3D353" } }}>
        {val.Type === "podcast" &&  <div>
        <FaPodcast/>
        </div>}
        {val.Type === "book" && <div>
        <FaBookOpen/>
        </div>}
        </IconContext.Provider>
        <h6 className="m-0" style={{color: "#787878"}}>{val.Name}</h6>
        </div>
        </div>{" "}
        <br></br>
        </Link>
        );
      })}
      </div>
      </main>
      </div>
      <div class="area" >
      <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
    </div>
      );
    }

export default SearchView;

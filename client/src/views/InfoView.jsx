import React from "react";
import { Link } from "react-router-dom";

import "./views.css";

// import { listUser as listUser } from './../services/authentication';

function InfoView () {
 
    return (
    <div className= "App-layers p-3 container">
    <h1 style= {{textAlign: "center", color: "#788FAD"}} >Our concept explained...</h1>
    <br></br>
    <h5 style= {{textAlign: "center", color: "#788FAD"}} >We are bored of echo-chamber recommendation tools, so we decided to break the trend.</h5>
    <br></br>
    <h5 style= {{textAlign: "center", color: "#788FAD"}} >Mindscape is designed to help you discover ideas, and encourage interdisciplinary thinking.</h5>
    <br></br>
    <h5 style= {{textAlign: "center", color: "#788FAD"}} >We use leading cultural experts to curate thought provoking themes. So just kick back, pick a theme that catches your eye and start your adventure...</h5>
    <br></br>
    <button type="button" className="btn m-3 text-white p-2 text-right" style={{ border: "2px solid #788FAD", backgroundColor: "#f0f0f2"}} ><Link to= "/themes" className='' style={{"color":"#788FAD"}}> Begin a new journey...</Link></button>
    </div>
    )
  
}

export default InfoView;

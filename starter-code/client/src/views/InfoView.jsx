import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./views.css";

// import { listUser as listUser } from './../services/authentication';

function InfoView () {
 
    return (
    <div ClassName= "App-layers">
    <h1>Our concept explained...</h1>
    <br></br>
    <h5>We are bored of echo-chamber recommendation tools, so we decided to break the trend.</h5>
    <br></br>
    <h5>Mindscape is designed to help you discover ideas, and encourage interdisciplinary thinking.</h5>
    <br></br>
    <h5>We use leading cultural experts to curate thought provoking themes. So just kick back, pick a theme that catches your eye and start your adventure...</h5>
    <br></br>
    <button type="button" class="btn btn-light"><Link to= "/themes" > Begin a new journey...</Link></button>
    </div>
    )
  
}

export default InfoView;

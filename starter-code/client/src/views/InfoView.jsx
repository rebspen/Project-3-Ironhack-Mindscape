import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./views.css";

// import { listUser as listUser } from './../services/authentication';

function InfoView () {
 
    return (
    <div className= "container p-3">
    <h1>Our concept explained...</h1>
    <br></br>
    <h5>We are bored of echo-chamber recommendation tools, so we decided to break the trend.</h5>
    <br></br>
    <h5>Mindscape is designed to help you discover ideas, and encourage interdisciplinary thinking.</h5>
    <br></br>
    <h5>We use leading cultural experts to curate thought provoking themes. So just kick back, pick a theme that catches your eye and start your adventure...</h5>
    <br></br>
    <button type="button" className="btn m-3 text-white p-2 text-right" style={{"backgroundColor":"#444A6C"}}><Link to= "/themes" className='text-white'> Begin a new journey...</Link></button>
    </div>
    )
  
}

export default InfoView;

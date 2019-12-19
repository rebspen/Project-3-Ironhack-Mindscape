import React from "react";
import { Link } from "react-router-dom";

import "./views.css";

// import { listUser as listUser } from './../services/authentication';

function InfoView () {
 
    return (
        <div>
        <div className="context" style ={{height: "100%"}}>
    <div className= "container p-4 App-layers">
    <h2 style= {{textAlign: "center", color:"black"}} >Our concept explained...</h2>
    <br></br>
    <h5 style= {{textAlign: "center", color:"black"}} >Bored of echo-chamber recommendation tools?</h5>
    <br></br>
    <h5 style= {{textAlign: "center", color:"black"}} >Mindscape is designed to help you discover new ideas, and encourage interdisciplinary thinking.</h5>
    <br></br>
    <h5 style= {{textAlign: "center", color:"black"}} >We use leading cultural experts to curate thought provoking themes. So just pick a one that catches your eye and start your adventure...</h5>
    <br></br>
    <button
          type="button"
          className="btn btn-light m-2 p-3 w-60 "
          style={{
            minHeight: "10%",
            border: "10px double white",
            backgroundColor: "Transparent",
            borderRadius: "90px",
            zIndex: "1000"
          }}
        >
          <Link
            to="/themes"
            className="display-4"
            style={{ color: "rgb(48, 67, 200)", textDecoration: "none" }}
          >
            {" "}
            <h5>Begin a new journey</h5>
          </Link>
          </button>
    </div>
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
    )
  
}

export default InfoView;

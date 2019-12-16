import React, { Component } from "react";
import { Link } from "react-router-dom";
import themes from "./themes"
import "./views.css";

// to shuffle the themes each time
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
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

const luckyNum = Math.floor(Math.random()* themes.length)

// import { listUser as listUser } from './../services/authentication';

class ThemeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themes: shuffle(themes)
    };
    console.log(this.state)
  }


  render() {
    return (
      <main className="App-layers justify-content-center align-items-center">
        <h1 className='' style= {{color: "#3043C8"}}>Themes</h1>
        <p className='m-1' style= {{textAlign: "center", color: "#3043C8"}}>Choose a theme and begin your literary Journey...</p>
        <button className="btn w-80 mt-3" style ={{border: "2px solid #E3D353" }} ><Link to={`/search/${this.state.themes[luckyNum].id}`}  className='lucky'>I feel lucky...</Link></button>
        <div className = "theme mt-3">
          {this.state.themes.map((val)=>{
            return <Link to={`/search/${val.id}`} key={Math.random()} style={{"width":"30%"}} ><img src= {val.imageURL} style={{"width":"90%"}}/></Link>
          })}
        </div>   
      </main>
    );
  }
}

export default ThemeView;

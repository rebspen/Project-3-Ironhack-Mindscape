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
      <main className="App-layers">
        <h1>Themes</h1>
        <p>choose one and begin your literary jorney...</p>
        <button><Link to={`/search/${this.state.themes[luckyNum].id}`}>I feel lucky...</Link></button>
        <br></br>
        <div ClassName = "theme">
          {this.state.themes.map((val)=>{
            return <Link to={`/search/${val.id}`}><img src= {val.imageURL}/></Link>
          })}
        </div>   
      </main>
    );
  }
}

export default ThemeView;

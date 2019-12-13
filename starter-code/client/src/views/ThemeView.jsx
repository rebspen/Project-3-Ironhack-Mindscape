import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./views.css";

const themes = [
  {
    id: 0,
    name: "I am woman",
    imageURL: "./6.png",
    titles: [
      "women who run with the wolves",
      "men explain things to me",
      "a room of ones own"
    ]
  },
  {
    id: 1,
    name: "Utopia",
    imageURL: "./9.png",
    titles: [
      "The handmaids tale",
      "1985",
    ]
  }
];

const luckyNum = Math.floor(Math.random()* themes.length)

// import { listUser as listUser } from './../services/authentication';

class ThemeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      themeNumber: null
    };
  }

  // async componentDidMount() {
  //   try {
  //     const user = await listUser();
  //     this.setState({
  //       user
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async handleSubmission(event) {
    event.preventDefault();
    // const note = this.state.note;
    console.log(event.target);
    console.log("here");
    // try {
    //   const noteDocument = await createNoteService(note);
    //   const id = noteDocument._id;
    //   this.props.history.push(`/${id}`);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  render() {
    return (
      <main className="App-layers">
        <h1>Themes</h1>
        <p>choose one and begin your literary jorney...</p>
        <button><Link to={`/search/${themes[luckyNum].id}`}>I feel lucky...</Link></button>
        <br></br>
        <div ClassName = "theme">
          {themes.map((val)=>{
            return <Link to={`/search/${val.id}`}><img src= {val.imageURL}/></Link>
          })}
        </div>   
      </main>
    );
  }
}

export default ThemeView;

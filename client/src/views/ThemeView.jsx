import React, { Component } from "react";
import { Link } from "react-router-dom";
import themes from "./themes";
import ReactLoading from 'react-loading';
import "./views.css";
import Img from 'react-image';


class ThemeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themes: [],
      loadedPicture: true,
    };
   // console.log(this.state)
  }

  componentDidMount() {
    const array = themes;
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
    this.setState({
      themes: array,
      loadedPicture:false
    });
  }


  render() {
    const luckyNum = Math.floor(Math.random()* this.state.themes.length);
    return (
      <main className="App-layers justify-content-center align-items-center">
        <h1 className='mt-3' style= {{color: "#787878"}}>Themes</h1>
        <p className='m-1' style= {{textAlign: "center", color: "#787878"}}>Choose a theme and begin your Journey...</p>
        {this.state.loadedPicture && <ReactLoading type={'balls'} color={'#E3D353'} height={100} width={100} />}
       {this.state.themes.length && 
       <div className='text-center'>
       <button className="btn w-80 mt-3 text-center" style ={{border: "2px solid white", borderRadius: "90px", backgroundColor:"#E3D353" }} ><Link to={`/search/${this.state.themes[luckyNum].id}`} className='lucky' style = {{color:"white"}}>I feel lucky...</Link></button>
        <div className = "theme mt-3">
          {this.state.themes.map((val)=>{
            return <Link className = "themeWidth" to={`/search/${val.id}`} key={Math.random()} >
              <Img src= {val.imageURL} 
              className = "theme-img" 
              loader= {<ReactLoading type={'spin'} color={'#E3D353'} height={100} width={100} className='loading-animation-style' />
}/>        
            </Link>
          })}
          </div>
        </div> } 
        <br></br>
      </main>
    );
  }
}

export default ThemeView;


//            <img className = "theme-img" src= {val.imageURL} style={{"width":"90%", border: "2px solid white", maxWidth: "200px"}}/>

/*        import ReactImageAppear from 'react-image-appear';

              <ReactImageAppear
              src= {val.imageURL}
              className = "theme-img"
              placeholder="https://res.cloudinary.com/dgmvfq29c/image/upload/v1578266268/project-3-ironhack/background_pnvd6e.png"
              placeholderStyle={{ width:"90%", maxWidth: "200px", borderRadius:"12px", margin:"0.5em"}}
              animation="zoomIn"
              animationDuration="1s"
              showLoader={false} />  */
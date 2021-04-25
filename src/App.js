import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import logo from './logo.svg';
// import useSound from 'use-sound'
// import punch from "/sounds/punch01.mp3"
// import ReactAudioPlayer from 'react-audio-player';
import Home from "./appComponents/Home";
import Jokes from "./appComponents/Jokes";
import Navigation from "./appComponents/Navigation";
import ChuckOGraphy from "./appComponents/ChuckOGraphy";
import Chuquiz from "./appComponents/Chuquiz";
import Favourites from "./appComponents/Favourites";

import {
  Switch,
  BrowserRouter as Router,
  Route,


} from 'react-router-dom'


const App = () => {

  return (
    

    <div className="App">

      <Router>
        <>
        
          <Navigation />
          
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/jokes" component={Jokes}/>
            <Route path="/chuckography" component={ChuckOGraphy}/>
            <Route path="/quiz" component={Chuquiz}/>
            <Route path="/favourites" component={Favourites}/>
          </Switch>

        </>
      </Router>
      
    </div>
  );
}

export default App;

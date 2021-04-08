import React from "react";
import logo from './logo.svg';

import Home from "./appComponents/Home";
import Navigation from "./appComponents/Navigation";

import {
  Switch,
  HashRouter as Router,
  Route,


} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Router>
        <>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home}/>
          </Switch>
        </>
      </Router>
    </div>
  );
}

export default App;

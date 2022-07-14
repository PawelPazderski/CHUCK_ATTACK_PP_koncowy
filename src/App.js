import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./appComponents/Home";
import Jokes from "./appComponents/Jokes";
import Navigation from "./appComponents/Navigation";
import ChuckOGraphy from "./appComponents/ChuckOGraphy";
import Chuquiz from "./appComponents/Chuquiz";
import Favourites from "./appComponents/Favourites";
import Swal from 'sweetalert2/src/sweetalert2.js'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'


const App = () => {

  return (
    

    <div className="App">

      <Router>
        <>
          <Navigation />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/jokes" element={<Jokes />}/>
            <Route path="/chuckography" element={<ChuckOGraphy />}/>
            <Route path="/quiz" element={<Chuquiz />}/>
            <Route path="/favourites" element={<Favourites />}/>
          </Routes>
        </>
      </Router>
      
    </div>
  );
}

export default App;

import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Discover from './Components/Pages/Discover';
import Navbar from './Components/Navbar';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar/>
        <Route exact path="/" component={Discover}/>
      </div>
    </Router>
  )
}

export default App;

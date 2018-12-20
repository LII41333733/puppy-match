import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import About from './Components/Pages/About';
import Discover from './Components/Pages/Discover';
import Search from './Components/Pages/Search';
import Navbar from './Components/Navbar';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar/>
        <Route exact path="/" component={About}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/discover" component={Discover}/>
        <Route exact path="/search" component={Search}/>
      </div>
    </Router>
  )
}

export default App;

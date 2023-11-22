import React, { Component, useState } from "react";
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import NavBar from "./Navigation/Navbar.js";
import updateKeyword from "./Navigation/Navbar.js";
import SearchBar from "./Navigation/SearchBar.js"
import "./index.css";
import Home from './pages';
import PastEvents from './pages/pastEvents';
import Contact from './pages/contact';
import FutureEvents from './pages/futureEvents';
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path='/' exact element={<Home />} />
        <Route path='/pastEvents' element={<PastEvents />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/futureEvents' element={<FutureEvents />} />
      </Routes>
    </Router>
    );
}

export default App;


  ///<div className="header">
 //   <div class="content">
   //   <NavBar />
   // </div>
    //  <SearchBar/>
    //</div>

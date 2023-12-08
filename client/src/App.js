// import './App.css'
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import UnauthHome from "./components/UnauthHome"
import Admin from "./components/Admin"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Dcma from "./components/Dcma"
import AuthLists from "./components/AuthLists"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<UnauthHome/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/dcma" element={<Dcma/>}/>
          <Route path="/authLists" element={<AuthLists/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
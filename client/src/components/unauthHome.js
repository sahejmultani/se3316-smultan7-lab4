//working unauth.js

import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import '../styling/UnauthHome.css';

function UnauthHome() {
  const [nameSearch, setNameSearch] = useState('');
  const [powerSearch, setPowerSearch] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/unauth/search?name=${nameSearch}&powers=${powerSearch}`);
        setSearchResults(response.data.results);
      } catch (error) {
        console.error("Search failed:", error.message);
      }
    };

    fetchSearchResults();
  }, [nameSearch, powerSearch]);

//add function so if all fields empty list clears



  return (
    <div className="inital">
      <div className="unAuthHomepage">
        <h1>Superhero App</h1>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <div className="about-app">
          <h3>About the App</h3>
          <p>Welcome to my superhero app! Here you are able to search through all of your favourite superheroes
            and check out all of their information. See one that you like? Signup and login to save them to your personal lists
            and leave reviews for others!</p>
        </div>
      </div>

      <form className="search">
        <input
          type="text"
          placeholder="Search by Name"
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
        />

        <input
          type="text"
          placeholder="Search by Power"
          value={powerSearch}
          onChange={(e) => setPowerSearch(e.target.value)}
        />
      </form>

      <div className="searchResults">
        <h2>Search Results:</h2>
        {searchResults.map((result) => (
          <div key={result.id}>
            <p>{result.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UnauthHome;

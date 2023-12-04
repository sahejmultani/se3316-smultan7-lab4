//homepage for initial startup and to login/register

//try to get rid of axios at the end

/* WHAT THIS NEEDS
JWT TOKENSSS

email verfication for new account
what the site is about and login button
interface to search superheros (original result must just be heroname and publisher and then expand button to show eevyrthing)
each search result needs a link to duckduckgo search
keywords are softmatched

https://duckduckgo.com/{whatever the hero name is}
*/


import React, { useEffect, useState } from "react"
import {Link} from 'react-router-dom';
import '../styling/UnauthHome.css'
import axios from "axios";

/*
function UnauthHome (){

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() =>{
        const fetchSearchResults = async() =>{
            try {
                const response = await axios.get(`http://localhost:8000/unauth/searchByName?name=${searchTerm}`);
                setSearchResults(response)
            } catch (error) {
                console.error("Search failed:", error.message);
            }
        }
    });



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
                <input type="text" placeholder="Search by Name" />
                <button type="submit">Search</button>





                <input type="text" placeholder="Search by Race" />
                <button type="submit">Search</button>
                <input type="text" placeholder="Search by Power" />
                <button type="submit">Search</button>
                <input type="text" placeholder="Search by Publisher" />
                <button type="submit">Search</button>
            </form>

            <div className="searchResults">

            </div>
        
        </div>
    )
}

export default UnauthHome */


//WHEN DYNAMICALLY TYPING, ALL SEARCH BARS ARE POPULATED

function UnauthHome() {
  const [searchTerm, setSearchTerm] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Define a separate function for making the search request
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/unauth/searchByName?name=${searchTerm}`);
        setSearchResults(response.data.results);
      } catch (error) {
        console.error("Search failed:", error.message);
        // Handle the error, e.g., display an error message to the user
      }
    };

    // Call the search function when the searchTerm changes
    if (searchTerm.trim() !== '') {
      fetchSearchResults();
    } else {
      // Clear results if the search term is empty
      setSearchResults([]);
    }
  }, [searchTerm]);

  
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <input
          type="text"
          placeholder="Search by power"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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

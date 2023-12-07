//add input sanitation


import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import '../styling/UnauthHome.css';

function UnauthHome() {
  const [nameSearch, setNameSearch] = useState('');
  const [powerSearch, setPowerSearch] = useState('');
  const [raceSearch, setRaceSearch] = useState('');
  const [publisherSearch, setPublisherSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [expandedResults, setExpandedResults] = useState([]);

  useEffect(() => {

    if (!nameSearch && !powerSearch && !raceSearch && !publisherSearch) {
        // If all fields are empty, clear the results
        setSearchResults([]);
        return;
      }

    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/unauth/search?name=${nameSearch}&powers=${powerSearch}&race=${raceSearch}&publisher=${publisherSearch}`
        );
        setSearchResults(response.data.results);
        // Reset expanded results when performing a new search
        setExpandedResults([]);
      } catch (error) {
        console.error("Search failed:", error.message);
      }
    };

    fetchSearchResults();
  }, [nameSearch, powerSearch, raceSearch, publisherSearch]);

  // Function to toggle expanded state for a result
  const toggleExpanded = (id) => {
    setExpandedResults((prevExpanded) => {
      if (prevExpanded.includes(id)) {
        return prevExpanded.filter((expandedId) => expandedId !== id);
      } else {
        return [...prevExpanded, id];
      }
    });
  };

  const searchOnDDG = (query) => {
    const duckDuckGoUrl = `https://duckduckgo.com/?q=${query}`;
    window.open(duckDuckGoUrl, '_blank');
  };

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

      <div className="public-lists">Checkout some lists</div> 


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
  <input
    type="text"
    placeholder="Search by Race"
    value={raceSearch}
    onChange={(e) => setRaceSearch(e.target.value)}
  />
  <input
    type="text"
    placeholder="Search by Publisher"
    value={publisherSearch}
    onChange={(e) => setPublisherSearch(e.target.value)}
  />
      </form>

      <div className="searchResults">
  {searchResults.length === 0 ? (
    <p>{(nameSearch || powerSearch || raceSearch || publisherSearch) ? 'No results found.' : null}</p>
  ) : (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          {/* Add more header columns as needed */}
        </tr>
      </thead>
      <tbody>
        {searchResults.map((result) => (
          <React.Fragment key={result.id}>
            <tr>
              <td onClick={() => toggleExpanded(result.id)}>
                {result.name + ', Publisher: ' + result.Publisher}
                <button className="ddg-search" onClick={() => searchOnDDG(`${result.name} ${result.Publisher}`)}>Search on DDG</button>

              </td>
              {/* Additional header columns as needed */}
            </tr>
            {/* Expanded information */}
            {expandedResults.includes(result.id) && (
              <tr>
                <td colSpan="100%" className="expandedInfo">
                  <p>Gender: {result.Gender}</p>
                  <p>Eye Colour: {result['Eye color']}</p>
                  <p>Race: {result.Race}</p>
                  <p>Hair Colour: {result['Hair color']}</p>
                  <p>Height: {result.Height}</p>
                  <p>Publisher: {result.Publisher}</p>
                  <p>Skin Colour: {result['Skin color']}</p>
                  <p>Alignment: {result.Alignment}</p>
                  <p>Weight: {result.Weight}</p>
                  <p>Powers: {result.powers.join(', ')}</p>
                 
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )}
</div>
    </div>
  );
}

export default UnauthHome;

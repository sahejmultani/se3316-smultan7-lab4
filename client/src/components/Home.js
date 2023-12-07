//authorized user home page

/* WHAT THIS NEEDS (SAME AS UNAUTHHOME BUT ALSO NEEDS):
allow user to create up to 20 named lists
show full info of lists
ability to edit the lists
delete a list
add a review to a list (others list)
LOGOUT BUTTON

----------ADMIN
special user for admin access
ability to grant admin privilege to one or more users
ability to mark a review as hidden
ability to mark a user as deactivated

---------SEPERATE DOC?
Administrator functionality related to copyright enforcement:
*/

import '../styling/Home.css'
import React, { useEffect, useState } from "react";
import {useLocation, useNavigate, Link} from 'react-router-dom';
import axios from "axios";
 

//                              IF USER DOES /HOME FOR URL, IT SHOULD TELL THEM TO SIGN IN FIRST



function Home() {
    const [nameSearch, setNameSearch] = useState('');
    const [powerSearch, setPowerSearch] = useState('');
    const [raceSearch, setRaceSearch] = useState('');
    const [publisherSearch, setPublisherSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [expandedResults, setExpandedResults] = useState([]);

   
    const location=useLocation()

    useEffect(() => {
  
      if (!nameSearch && !powerSearch && !raceSearch && !publisherSearch) {
          // If all fields are empty, clear the results
          setSearchResults([]);
          return;
        }

        
  
      const fetchSearchResults = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/authorized/search?name=${nameSearch}&powers=${powerSearch}&race=${raceSearch}&publisher=${publisherSearch}`
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


/* 
list functions
*/

const [lists, setLists] = useState([]);
  const [listName, setListName] = useState("");

   // Load lists from localStorage when the component mounts
   useEffect(() => {
    const storedLists = localStorage.getItem("userLists");
    if (storedLists) {
      setLists(JSON.parse(storedLists));
    }
  }, []);

  // Save lists to localStorage whenever lists change
  useEffect(() => {
    localStorage.setItem("userLists", JSON.stringify(lists));
  }, [lists]);

  // Function to handle list creation
  const createList = (e) => {
    e.preventDefault();
    if (listName.trim() === "") {
      alert("Please enter a valid list name.");
      return;
    }

    // Create a new list object
    const newList = {
      id: lists.length + 1, // You might want to use a better ID generation method
      name: listName,
      superheroes: [],
    };

    // Update the lists state with the new list
    setLists((prevLists) => [...prevLists, newList]);

    // Clear the listName state for the next list
    setListName("");
  };


  

    return (
      <div className="authHomeInital">
        <div className="AuthorizedHomepage">
        <h1>Welcome to your dashboard {location.state?.id || 'User'}!</h1>

          <button className='logoutButton'>LOGOUT</button>

          <div className="authAbout">
            <h3>You are now signed in and are able to create and view many lists of superheroes! Start typing to search</h3>
          </div>
          
          <div className='create-lists'>
        <h3>Lists</h3>
        <form>
          {/* Input for entering list name */}
          <input
            type="text"
            placeholder="Enter List Name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          {/* Button to create a new list */}
          <button className='listBtn' onClick={createList}>Create List</button>
        </form>
      </div>
            <br/>
            <br/>
            {/* Display the user's lists */}
      <div className='view-lists'>
        <h3>Your Lists</h3>
        <ul>
          {lists.map((list) => (
            <li key={list.id}>{list.name}</li>
          ))}
        </ul>
      </div>


      </div>
  
        <form className="authSearch">
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
  
        <div className="authSearchResults">
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


export default Home
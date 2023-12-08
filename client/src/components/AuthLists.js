// AuthLists.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AuthLists() {
  const [userID, setUserID] = useState('userId123'); // Replace with actual user ID retrieval logic
  const [listName, setListName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [superheroName, setSuperheroName] = useState('');
  const [createdListId, setCreatedListId] = useState(null);
  const [userLists, setUserLists] = useState([]);

  useEffect(() => {
    const fetchUserLists = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user-lists/${userID}`);
        setUserLists(response.data.lists);
      } catch (error) {
        console.error('Fetching user lists failed:', error.message);
      }
    };

    fetchUserLists();
  }, [userID]); // Dependency on userID to re-fetch lists when it changes

  const createList = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/create-list', {
        userID: userID,
        listName: listName.trim(),
        isPrivate: isPrivate,
      });

      if (response.data.success) {
        console.log('List created successfully');
        setCreatedListId(response.data.listId);
        // Update the user lists after creating the new list
        setUserLists((prevLists) => [...prevLists, { listId: response.data.listId, listName, private: isPrivate }]);
      } else {
        console.error('List creation failed:', response.data.message);
      }
    } catch (error) {
      console.error('List creation failed:', error.message);
    }
  };

  const addSuperhero = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/add-superhero/${createdListId}`, {
        superheroName: superheroName.trim(),
      });

      if (response.data.success) {
        console.log('Superhero added successfully');
      } else {
        console.error('Adding superhero failed:', response.data.message);
      }
    } catch (error) {
      console.error('Adding superhero failed:', error.message);
    }
  };

  return (
    <div className="authlists">
      <h1>Auth Lists</h1>

      <label>List Name:</label>
      <input
        type="text"
        placeholder="Enter List Name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />

      <label>Private:</label>
      <input
        type="checkbox"
        checked={isPrivate}
        onChange={(e) => setIsPrivate(e.target.checked)}
      />

      <button onClick={createList}>Create List</button>

      {createdListId && (
        <>
          <label>Superhero Name:</label>
          <input
            type="text"
            placeholder="Enter Superhero Name"
            value={superheroName}
            onChange={(e) => setSuperheroName(e.target.value)}
          />
          <button onClick={addSuperhero}>Add Superhero</button>
        </>
      )}

      <div>
        <h2>User Lists</h2>
        <ul>
          {userLists.map((list) => (
            <li key={list.listId}>{list.listName} - Private: {list.private ? 'Yes' : 'No'}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AuthLists;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users from the backend when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/all-users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Fetching users failed:', error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="admin">
      <h1>Admin</h1>
      <Link to="/">unauth homepage</Link>

      <div>
        <h2>All Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <strong>Name:</strong> {user.name}, <strong>Email:</strong> {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Admin;

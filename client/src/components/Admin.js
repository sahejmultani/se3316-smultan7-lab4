import React, { useState, useEffect } from 'react';
// admin.js
import { Link } from 'react-router-dom';
import axios from 'axios';

function Admin() {
  // Fetch all users from the backend
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/admin/all-users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Fetching users failed:', error.message);
      }
    };

    fetchUsers();
  }, []);

  // Deactivate user account
  const deactivateAccount = async (userId) => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/deactivate-account/${userId}`);
      if (response.data.success) {
    
        console.log('Account deactivated successfully');
        // Remove the deactivated user from the local state
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      } else {
        console.error('Deactivating account failed:', response.data.message);
      }
    } catch (error) {
      console.error('Deactivating account failed:', error.message);
    }
  };

  return (
    <div className="admin">
      <h1>Admin</h1>
      <Link to="/">Unauth homepage</Link>

      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} ({user.email}) - Deactivated: {user.deactivated ? 'Yes' : 'No'}
            <button onClick={() => deactivateAccount(user._id)}>Deactivate Account</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;

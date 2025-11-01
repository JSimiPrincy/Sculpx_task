// src/pages/UserListPage.jsx
import React, { useEffect, useState } from 'react';
import userService from '../services/userService';
import './UserListPage.scss';
import { ROLES } from '../utils/constants';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getAllUsers();
        setUsers(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(userId);
        setUsers(users.filter(user => user._id !== userId));
      } catch (err) {
        setError(err);
      }
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="user-list-page">
      <h1 className="page-title">User Management</h1>
      <p className="page-message">Manage all registered users in the system.</p>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="user-list-table-container">
          <table className="user-list-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td><span className={`user-role user-role-${user.role}`}>{user.role}</span></td>
                  <td>
                    {/* Add edit functionality here */}
                    <button className="btn btn-danger btn-small" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserListPage;
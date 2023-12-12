import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('jwt_token');
        const response = 
          await axios.get('http://localhost:5100/users/',
           {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
          ); 
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setStatus(`Error: ${error.message}`)
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (username, newRole) => {
    try {
      const token = localStorage.getItem('jwt_token');
      const updatedUsers = users.map((user) => {
        if (user.username === username) {
          return { ...user, role: newRole };
        }
        return user;
      });

      setUsers(updatedUsers);

      await axios.put(`http://localhost:5100/users/${username}`, 
      {
        username: username,
        role: newRole,
        approvedByAdmin: users.find((user) => user.username === username).approvedByAdmin
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      },
);
    } catch (error) {
      setStatus(`Error: ${error.message}`)
      console.error('Error updating user role:', error);
    }
  };

  const handleCheckboxChange = async (username) => {
    try {
      const token = localStorage.getItem('jwt_token');
      const updatedUsers = users.map((user) => {
        if (user.username === username) {
          return { ...user, approvedByAdmin: !user.approvedByAdmin };
        }
        return user;
      });

      setUsers(updatedUsers);

      await axios.put(`http://localhost:5100/users/${username}`,
          {
              username: username,
              role: users.find((user) => user.username === username).role,
              approvedByAdmin: !users.find((user) => user.username === username).approvedByAdmin
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
      );
    } catch (error) {
      setStatus(`Error: ${error.message}`)
      console.error('Error updating user approval status:', error);
    }
  };

  return (
    <div>
      <h5>{status}</h5>
    <div className="container mt-4">
      
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2 className="text-center mb-4">Users</h2>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th className="col">Username</th>
                  <th className="col-md-5">Role</th>
                  <th className="col-md-2">Approved by Admin</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.username}>
                    <td className="col">{user.username}</td>
                    <td className="col-md-5">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.username, e.target.value)}
                        className="form-control custom-select"
                        style={{ textTransform: 'lowercase' }} 
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td className="col-md-2">
                      <input
                        type="checkbox"
                        checked={user.approvedByAdmin}
                        onChange={() => handleCheckboxChange(user.username)}
                        className="form-check-input"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Users;

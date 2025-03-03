import React, { useEffect, useState } from "react";
import axios from "axios";

const UserFilter = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
  
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://s76-ani-nick-1.onrender.com/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <select
      className="p-2 border rounded"
      onChange={(e) => onUserSelect(e.target.value)}
    >
      <option value="">Select a user</option>
      {users.map((user) => (
        <option key={user} value={user}>
          {user}
        </option>
      ))}
    </select>
  );
};

export default UserFilter;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GridComponent = () => {
  const [nicknames, setNicknames] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [visibleItems, setVisibleItems] = useState(6);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchNicknames = async () => {
      try {
        let response;
        if (selectedUser) {
          response = await axios.get(`https://s76-ani-nick-1.onrender.com/api/nicknames/user/${selectedUser}`);
        } else {
          response = await axios.get("https://s76-ani-nick-1.onrender.com/api/nicknames");
        }
        setNicknames(response.data);
      } catch (error) {
        console.error("Error fetching nicknames:", error);
      }
    };

    fetchNicknames();
  }, [selectedUser]);

  const handleEdit = (id) => {
    navigate(`/create/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this nickname?")) return;
    try {
      await axios.delete(`https://s76-ani-nick-1.onrender.com/api/nicknames/${id}`);
      setNicknames((prevNicknames) => prevNicknames.filter((nickname) => nickname._id !== id));
    } catch (err) {
      console.error("Error deleting nickname:", err);
      alert("Failed to delete nickname.");
    }
  };

  return (
    <div>
     
      <div className="p-6">
        <label className="text-white">Filter by User:</label>
        <select
          className="ml-2 px-4 py-2 bg-black text-white rounded-md"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">All Users</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

  
      <div className="grid z-10 grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {nicknames.slice(0, visibleItems).map((item) => (
          <div key={item._id} className="bg-black/60 py-10 z-10 rounded-2xl text-white text-center shadow-lg p-6 hover:scale-105 hover:shadow-2xl transition duration-300">
            <h2 className="text-2xl font-bold text-[#FF7B00] mb-2">{item.nickname}</h2>
            <hr className="border-[#FF7B00]" />
            <p className="py-3"><span className="font-bold">Character: </span>{item.character}</p>
            <p className="py-3"><span className="font-bold">Anime: </span>{item.anime}</p>
            <p className="py-3">{item.description}</p>

            <button className="w-full text-white px-4 py-2 rounded-md bg-neutral-900/60 cursor-pointer hover:bg-neutral-700 transition duration-300" onClick={() => handleEdit(item._id)}>Edit</button>
            <button onClick={() => handleDelete(item._id)} className="w-full text-white px-4 py-2 cursor-pointer rounded-md bg-red-600/60 hover:bg-red-400 transition duration-300 mt-2">Delete</button>
          </div>
        ))}
      </div>

      
      {visibleItems < nicknames.length && (
        <div className="text-center mt-6">
          <button onClick={() => setVisibleItems(visibleItems + 6)} className="bg-[#FF7B00] hover:scale-110 cursor-pointer mb-10 text-white px-4 py-2 rounded-md hover:bg-black transition-colors">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default GridComponent;

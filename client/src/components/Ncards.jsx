import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GridComponent = () => {
  const [nicknames, setNicknames] = useState([]);
  const [filteredNicknames, setFilteredNicknames] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [visibleItems, setVisibleItems] = useState(6);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Use the production URL
  const API_BASE_URL = "https://s76-ani-nick-1.onrender.com";

  // Get logged-in username
  const loggedInUser = JSON.parse(localStorage.getItem("user"))?.username;

  // Fetch nicknames
  useEffect(() => {
    const fetchNicknames = async () => {
      setLoading(true);
      try {
        let response;
        if (selectedUser) {
          response = await axios.get(`${API_BASE_URL}/api/nicknames/user/${selectedUser}`);
        } else {
          response = await axios.get(`${API_BASE_URL}/api/nicknames`);
        }
        setNicknames(response.data);
        setFilteredNicknames(response.data);
      } catch (error) {
        console.error("Error fetching nicknames:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNicknames();
  }, [selectedUser]);

  // Filter nicknames based on selected user
  useEffect(() => {
    if (selectedUser) {
      setFilteredNicknames(nicknames.filter((n) => {
        if (typeof n.created_by === "object" && n.created_by !== null) {
          return n.created_by._id === selectedUser;
        }
        return n.created_by === selectedUser;
      }));
    } else {
      setFilteredNicknames(nicknames);
    }
  }, [selectedUser, nicknames]);

  // Get unique users who created nicknames
  const uniqueUsers = React.useMemo(() => {
    const userMap = {};
    nicknames.forEach(n => {
      if (n.created_by && typeof n.created_by === "object") {
        userMap[n.created_by._id] = n.created_by.username;
      }
    });
    // Return array of { _id, username }
    return Object.entries(userMap).map(([id, username]) => ({ _id: id, username }));
  }, [nicknames]);

  const handleEdit = (id) => {
    navigate(`/create/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this nickname?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/nicknames/${id}`);
      setNicknames((prevNicknames) => 
        prevNicknames.filter((nickname) => (nickname._id || nickname.id) !== id)
      );
    } catch (err) {
      console.error("Error deleting nickname:", err);
      alert("Failed to delete nickname.");
    }
  };

  const getCreatorUsername = (item) => {
    if (item.created_by && typeof item.created_by === "object") {
      return item.created_by.username || "Unknown user";
    }
    return "Unknown user";
  };

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <div>
      {/* Filter Dropdown */}
      <div className="p-6">
        <label className="text-white">Filter by User:</label>
        <select
          className="ml-2 px-4 py-2 bg-black text-white rounded-md"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value || "")}
        >
          <option value="">All Users</option>
          {uniqueUsers.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading && <p className="text-center text-white">Loading...</p>}

      {/* Grid */}
      {!loading && (
        <div className="grid z-10 grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {filteredNicknames.slice(0, visibleItems).map((item) => {
            const creatorUsername = getCreatorUsername(item);
            const isOwner = creatorUsername === loggedInUser;
            return (
              <div key={item._id || item.id} className="bg-black/60 py-10 z-10 rounded-2xl text-white text-center shadow-lg p-6 hover:scale-105 hover:shadow-2xl transition duration-300">
                <h2 className="text-2xl font-bold text-[#FF7B00] mb-2">{item.nickname}</h2>
                <hr className="border-[#FF7B00]" />
                <p className="py-3"><span className="font-bold">Character: </span>{item.character}</p>
                <p className="py-3"><span className="font-bold">Anime: </span>{item.anime}</p>
                <p className="py-3">{item.description}</p>
                <p className="py-2 text-sm italic text-gray-300">
                  <span className="font-bold">Created by: </span>{creatorUsername}
                  <span className="ml-2">| {formatDate(item.createdAt)}</span>
                </p>
                {isOwner && (
                  <>
                    <button className="w-full text-white px-4 py-2 rounded-md bg-neutral-900/60 cursor-pointer hover:bg-neutral-700 transition duration-300" onClick={() => handleEdit(item._id || item.id)}>Edit</button>
                    <button onClick={() => handleDelete(item._id || item.id)} className="w-full text-white px-4 py-2 cursor-pointer rounded-md bg-red-600/60 hover:bg-red-400 transition duration-300 mt-2">Delete</button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Load More Button */}
      {!loading && visibleItems < filteredNicknames.length && (
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

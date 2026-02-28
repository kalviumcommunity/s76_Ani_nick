import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/client";

const GridComponent = () => {
  const [nicknames, setNicknames] = useState([]);
  const [filteredNicknames, setFilteredNicknames] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [visibleItems, setVisibleItems] = useState(6);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Fetch nicknames
  useEffect(() => {
    const fetchNicknames = async () => {
      setLoading(true);
      try {
        const response = selectedUserId
          ? await api.get(`/nicknames/user/${selectedUserId}`)
          : await api.get('/nicknames');
        setNicknames(response.data);
        setFilteredNicknames(response.data);
      } catch (error) {
        console.error('Error fetching nicknames:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNicknames();
  }, [selectedUserId]);

  // Build unique user list from created_by / created_by_name fields
  const uniqueUsers = React.useMemo(() => {
    const userMap = {};
    nicknames.forEach((n) => {
      if (n.created_by && !userMap[n.created_by]) {
        userMap[n.created_by] = n.created_by_name || 'Unknown';
      }
    });
    return Object.entries(userMap).map(([uid, name]) => ({ uid, name }));
  }, [nicknames]);

  const handleEdit = (id) => navigate(`/create/${id}`);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this nickname?')) return;
    try {
      await api.delete(`/nicknames/${id}`);
      setNicknames((prev) => prev.filter((n) => (n._id || n.id) !== id));
    } catch (err) {
      console.error('Error deleting nickname:', err);
      alert(err.response?.data?.message || 'Failed to delete nickname.');
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleString();
  };

  return (
    <div>
      {/* Filter Dropdown */}
      <div className="p-6">
        <label className="text-white">Filter by User:</label>
        <select
          className="ml-2 px-4 py-2 bg-black text-white rounded-md"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value || '')}
        >
          <option value="">All Users</option>
          {uniqueUsers.map((user) => (
            <option key={user.uid} value={user.uid}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-center text-white">Loading...</p>}

      {!loading && (
        <div className="grid z-10 grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {filteredNicknames.slice(0, visibleItems).map((item) => {
            // Ownership: compare Firebase UIDs
            const isOwner = currentUser && item.created_by === currentUser.uid;
            return (
              <div
                key={item._id || item.id}
                className="bg-black/60 py-10 z-10 rounded-2xl text-white text-center shadow-lg p-6 hover:scale-105 hover:shadow-2xl transition duration-300"
              >
                <h2 className="text-2xl font-bold text-[#FF7B00] mb-2">{item.nickname}</h2>
                <hr className="border-[#FF7B00]" />
                <p className="py-3"><span className="font-bold">Character: </span>{item.character}</p>
                <p className="py-3"><span className="font-bold">Anime: </span>{item.anime}</p>
                <p className="py-3">{item.description}</p>
                <p className="py-2 text-sm italic text-gray-300">
                  <span className="font-bold">Created by: </span>{item.created_by_name || 'Unknown'}
                  <span className="ml-2">| {formatDate(item.createdAt)}</span>
                </p>
                {isOwner && (
                  <>
                    <button
                      className="w-full text-white px-4 py-2 rounded-md bg-neutral-900/60 cursor-pointer hover:bg-neutral-700 transition duration-300"
                      onClick={() => handleEdit(item._id || item.id)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id || item.id)}
                      className="w-full text-white px-4 py-2 cursor-pointer rounded-md bg-red-600/60 hover:bg-red-400 transition duration-300 mt-2"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!loading && visibleItems < filteredNicknames.length && (
        <div className="text-center mt-6">
          <button
            onClick={() => setVisibleItems(visibleItems + 6)}
            className="bg-[#FF7B00] hover:scale-110 cursor-pointer mb-10 text-white px-4 py-2 rounded-md hover:bg-black transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default GridComponent;

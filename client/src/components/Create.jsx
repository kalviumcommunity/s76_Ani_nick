import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export const Createc = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    nickname: "",
    character: "",
    anime: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isEdit) {
      axios.get(`http://localhost:5000/api/nicknames/${id}`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((err) => console.error("Error fetching nickname:", err));
    }
  }, [id, isEdit]);

  // Force refresh if coming from edit mode
  useEffect(() => {
    if (location.state?.refresh) {
      window.location.reload();
    }
  }, [location]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/nicknames/${id}`, formData);
        alert("Nickname updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/nicknames", formData);
        setMessage("Nickname added successfully!");
        setFormData({ nickname: "", character: "", anime: "", description: "" });
      }
      navigate("/explore", { state: { refresh: true } }); // ✅ Navigate after success
    } catch (error) {
      setMessage("Error adding/updating nickname!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-6 bg-black/40 rounded-lg z-10 text-white">
      <h2 className="text-xl font-bold mb-4 text-[#FF7B00]">
        {isEdit ? "Edit Nickname" : "Add a Nickname"}
      </h2>

      {message && <p className="text-green-500">{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} placeholder="Enter Nickname" className="p-2 rounded bg-gray-800 text-white" required />
        <input type="text" name="character" value={formData.character} onChange={handleChange} placeholder="Enter Character Name" className="p-2 rounded bg-gray-800 text-white" required />
        <input type="text" name="anime" value={formData.anime} onChange={handleChange} placeholder="Enter Anime Name" className="p-2 rounded bg-gray-800 text-white" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter Description" className="p-2 rounded bg-gray-800 text-white" required />
        
        <button type="submit" className="bg-[#FF7B00] hover:bg-[#d66a00] text-white font-bold py-2 rounded">
          {isEdit ? "Save Changes" : "Create"}
        </button>
      </form>
    </div>
  );
};
